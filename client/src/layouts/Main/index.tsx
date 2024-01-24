import React from 'react';
import {MainLayout,BodySection,NaviSection} from './styles';
import {Routes, Route} from 'react-router-dom';
import UserProfile from "@/pages/Profile/UserProfile";
import Feed from "@/pages/Feed/Feed";
import {Header,Write, Navigation} from "@/components/Menu";
import ConsultApplicant from "@/pages/Doctor/Applicant/ConsultApplicant";
import './index.css';
import DiaryMomPage from "@/pages/Diary/DiaryMom/page";
import DiaryBabyPage from "@/pages/Diary/DiaryBaby/page";
import WritePage from "@/pages/Diary/DiaryWrite/page";



function Main() {
    const currentPath = window.location.pathname;

    // 만약 현재 경로에 write가 포함되어 있다면 Header숨김
    const isWriteEndpoint = currentPath.includes('write');
    return (
        <MainLayout>
            <BodySection className="scrollBar">
                {!isWriteEndpoint && <Header />}
                {(isWriteEndpoint && currentPath.includes('mom')) && <Write title={"산모일기"}/>}
                {(isWriteEndpoint && currentPath.includes('baby')) && <Write title={"육아일기"}/>}
                {(isWriteEndpoint && currentPath.includes('board')) && <Write title={"피드"}/>}
                <Routes>
                    <Route path={"/"} element={<Feed/>}/>
                    <Route path={"/profile"} element={<UserProfile/>}/>
                    <Route path={"/diary/:diaryType"} element={<DiaryMomPage/>}/>
                    <Route path="/diary/:diaryType/write" element={<WritePage/>} />
                    <Route path={"/consult"} element={<ConsultApplicant/>}/>
                </Routes>
            </BodySection>
            <NaviSection>
                <Navigation/>
            </NaviSection>
        </MainLayout>
    );
}

export default Main;
