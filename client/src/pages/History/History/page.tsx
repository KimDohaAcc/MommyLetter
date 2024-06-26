import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchHistoryDetail} from "@/apis/history/HistoryAPI";
import {HistoryDetailProps} from "@/pages/type/types";
import DoctorListCard from "@/components/DoctorListCard";
import {readDoctorDetailuser} from "@/apis/profile/ProfileAPI";


const HistoryPage = () => {
    const param = useParams()
    const [historyDetail, setHistoryDetail] = useState<HistoryDetailProps>()
    const [consultDate, setConsultDate] = useState<Date>()
    const [doctorId, setDoctorId] = useState()
    useEffect(() => {
        fetchHistoryDetail(Number(param.id)).then((response) => {
            setHistoryDetail(response);
            setConsultDate(new Date(response.reserveDate));

        })

    }, [])

    const goDoctorProfile = () => {

    }
    const isTwoletter = (num: number) => {
        if (num.toString().length > 1) return num;
        return `0${num.toString()}`;

    }
    return (<div className="flex flex-col h-[100%] w-[100%]">
        <div className="h-[30%]" onClick={goDoctorProfile}>
            {historyDetail && <DoctorListCard date={historyDetail.reserveDate}
                                              img={`${historyDetail.profilePhoto ? "/profileimages/" + historyDetail.profilePhoto.substring(88,) : "/assets/images/default_image_doctor.png"}`}
                                              name={historyDetail.doctorName} department={historyDetail.department}/>}
        </div>
        {historyDetail && <div
            className="flex flex-col w-[100%] h-[100%] p-3 rounded-tl-[20px] rounded-tr-[20px] bg-[#fffaf2]"
            style={{boxShadow: "0px -4px 4px 0 rgba(0,0,0,0.25)"}}
        >
            <div className="h-[20%]">
                <span className="font-bold mt-5 mb-3 text-pointColor">환자명</span>
                <p>{historyDetail.userName}</p>
            </div>
            <div className="h-[20%]">
                <span className="h-[20%] mb-3 font-bold text-pointColor">상담 시간</span>

                <p>{consultDate && `${isTwoletter(consultDate.getMonth() + 1)}월 ${isTwoletter(consultDate.getDate())}일 ${isTwoletter(consultDate.getHours())} :${isTwoletter(consultDate.getMinutes())}`}</p>
            </div>
            <span className="font-bold text-pointColor">처방전</span>


            <img src="/assets/images/prescription.png"/>
            <p className="text-blue-600">다운로드</p>

        </div>}

    </div>);
};

export default HistoryPage;