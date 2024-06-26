import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import DirectMessageCard from "@/components/DirectMessageCard";
import {fetchChatList, fetchDMList} from "@/apis/DM/DMAPI";
import {MommyLetterWS} from "@/apis/ws/MommyLetterWS";
import {getProfileAPI} from "@/apis/profile/ProfileAPI";

interface DMResProps {
    "chatGroupId": number,
    "chatRoomName": string,
    "createdDate": string
}

interface OpponentResProps {
    "userId": number,
    "nickname": string,
    "intro": string,
    "backgroundPhoto": string,
    "profilePhoto": string,
    "follower": number,
    "following": number,
    "createdDate": string,
    "content": string,
    "chatGroupId": number
}

const DirectMessageList = () => {
    const user = MommyLetterWS.getInstance().getUserInfo();
    const [dmList, setDmList] = useState<DMResProps[]>([])
    const [opponents, setOpponents] = useState<OpponentResProps[]>([])

    useEffect(() => {
        fetchDMList(Number(user["userId"])).then((response) => {
            setDmList(response);
        })
    }, [])

    useEffect(() => {
        const fetchOpponentsData = async () => {
            const opponentsData: OpponentResProps[] = [];
            for (const dm of dmList) {
                const chatGroupName = dm.chatRoomName.split("_")
                const opponentId = chatGroupName[2] == user["userId"] ? Number(chatGroupName[1]) : Number(chatGroupName[2]);
                const profileRes = await getProfileAPI(opponentId);
                const chatListRes = await fetchChatList(Number(user["userId"]), opponentId);

                if (chatListRes[0]) {
                    const chatListResEntity = {
                        content: chatListRes[0].content, createdDate: chatListRes[0].createdDate
                    };
                    const response: OpponentResProps = {
                        ...profileRes, ...chatListResEntity, chatGroupId: dm.chatGroupId
                    };
                    opponentsData.push(response);
                }
            }
            setOpponents(opponentsData);
        };
        fetchOpponentsData();
    }, [dmList]);

    return (<div className="flex flex-col justify-center items-center w-[100%]">
        {opponents && opponents.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).map((opponent, index) => (
            <Link key={index} className="w-[100%] hover:bg-gray-100" to={`${opponent.chatGroupId}`}>
                <DirectMessageCard profileUrl={`${opponent.profilePhoto  ? "/profileimages/"+opponent.profilePhoto.substring(88,) : "/assets/images/default_image.png"}`} nickname={opponent.nickname}
                                   content={opponent.content}
                                   date={new Date(opponent.createdDate).getTime().toString()}
                                   chatGroupId={opponent.chatGroupId}/>
            </Link>))}
    </div>);
};

export default DirectMessageList;
