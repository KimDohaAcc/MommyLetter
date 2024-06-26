import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {DoctorRes, ReservationReq} from "@/apis/type/types";
import {createReservation} from "@/apis/consult/ConsultAPI";
import {ToastContainer} from 'react-toastify';
import {Toast} from "@/components/Toast/Toast";
import {fetchDMList, startDM} from "@/apis/DM/DMAPI";
import {useParams} from "react-router-dom";
import {readDoctorDetail} from "@/apis/profile/ProfileAPI";
import * as Stomp from "@stomp/stompjs";

interface CalendarProps {
    doctorId: number;
    userId: number;
}

interface DMProps {
    userId: number;
    chatGroupId: number;
}

const CalendarComponent = ({doctorId, userId}: CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [selectedTime, setSelectedTime] = useState<string>();
    const [combinedDateTime, setCombinedDateTime] = useState<Date | null>(null);
    const [doctorUserId, setDoctorUserId] = useState<number>()
    const [doctor, setDoctor] = useState<DoctorRes>();
    const [myDMList, setMyDMList] = useState<DMProps[]>([])
    const param = useParams()["id"];
    let [client, setClient] = useState<Stomp.Client>();
    const [chatGroupId, setChatGroupId] = useState<number>()
    useEffect(() => {
        readDoctorDetail(Number(param)).then((response) => {
            setDoctorUserId(response.userId);
            setDoctor(response);
        })
    }, [param]);
    useEffect(() => {
        if (!doctorUserId) return;
        fetchDMList(doctorUserId).then((response) => {
            response.map((dm: any) => {
                const dmList: DMProps[] = response.map((dm: any) => ({
                    chatGroupId: Number(dm.chatGroupId),
                    userId: doctorUserId == Number(dm.chatRoomName.split("_")[2]) ? Number(dm.chatRoomName.split("_")[1]) : Number(dm.chatRoomName.split("_")[2])
                }));
                setMyDMList(dmList);
            });
        })
    }, [doctorUserId]);
    const handleDateChange = (selectedDate: any) => {
        setDate(selectedDate);
        setSelectedTime("");
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {

        if (!userId || !doctorId) return;
        if (!selectedTime) return Toast.error("시간을 선택하세요")
        if (!date) return Toast.error("날짜를 선택하세요");
        const [hour, minute] = selectedTime.split(":");
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(parseInt(hour, 10));
        selectedDateTime.setMinutes(parseInt(minute, 10));
        setCombinedDateTime(selectedDateTime);
        if (!combinedDateTime) return;
        if (combinedDateTime < new Date()) return Toast.error("과거의 날짜는 선택 할 수 없음");
        const data: ReservationReq = {
            doctorId: doctorId, reserveDate: combinedDateTime.toISOString(), userId: userId
        }
        createReservation(data)
        Toast.success("진료 예약 성공!");
        goDm(userId);
        console.log(chatGroupId);
        if(!chatGroupId) return;
        connect(chatGroupId);
        console.log(chatGroupId);
        client?.publish({
            destination: "/pub/message",
            body: JSON.stringify({
                senderId:Number(doctorUserId),
                receiverId:userId,
                content:`안녕하세욜`,
                chatGroupId:chatGroupId,
            }),
        });

        client?.deactivate();
        setSelectedTime("");
        setDate(new Date());

    }
    const goDm =  (otherUserId: number) => {
        if (!doctorUserId) return;
        const isUsed = myDMList.find((tempUser: DMProps) => tempUser.userId === otherUserId)
        if (isUsed) setChatGroupId(isUsed.chatGroupId)
        else {
            startDM(doctorUserId, otherUserId)
                .then(response => {
                    setMyDMList(prevState => [...prevState, response, otherUserId])
                    setChatGroupId(response);
                });
        }

    };

    const connect = (roomNumber: number) => {
        const clientdata = new Stomp.Client({
            brokerURL: "ws://i10a509.p.ssafy.io:8081/ws", connectHeaders: {}
            // MommyLetterWS.getInstance().header
            , debug: function (str) {
                console.log(str);

            }, reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000, heartbeatOutgoing: 4000,
        });
        console.log(roomNumber);

        clientdata.onConnect = function () {
            clientdata.subscribe("/sub/enter/" + roomNumber, callback);
            clientdata.subscribe("/sub/dm/" + roomNumber, callback);
        };

        clientdata.activate(); // 클라이언트 활성화
        setClient(clientdata); // 클라이언트 갱신

    }
    const callback = function (message: any) {
        console.log(message.body);
    };

    return (<div>
        <ToastContainer/>
        <div className={`
        }flex ${showCalendar ? 'visible' : 'hidden'}`}>
            <div>
                <Calendar onChange={handleDateChange} value={date}/>
            </div>
            <div className="flex h-[100%] justify-center items-center flex-wrap">
                {[...Array(16)].map((_, index) => {
                    const hour = Math.floor(index / 2) + 9;
                    const minute = index % 2 === 0 ? '00' : '30';
                    const time = `${hour < 10 ? '0' : ''}${hour}:${minute}`;
                    return (<div
                        key={index}
                        className={` border-2 rounded-xl p-2 px-5 m-1 bg-white ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-white-500'}`}
                        onClick={() => handleTimeClick(time)}
                    >
                        {time}
                    </div>);
                })}


            </div>

        </div>
        <div className="flex justify-end mr-5">
            <button className="btn btn-primary" onClick={handleConfirm}>확인</button>

        </div>
        <div className="flex flex-col justify-center items-center w-[100%]">
            <p className="font-bold">{date.getMonth() + 1}월 {date.getDate()}일 {selectedTime}시</p>
        </div>
    </div>);
}


export default CalendarComponent;
