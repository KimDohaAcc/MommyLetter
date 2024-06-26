import styled from "tailwind-styled-components";
import { Link } from 'react-router-dom';
export const ProfileImg = styled.img`
    w-[150px] h-[150px] 
    mt-[7%]
    mb-[6%]
    rounded-full
`

export const Input = styled.input`
    bg-white
    shadow-custom-inner
    border-b-2
    p-3
    rounded-2xl
    pl-[4%]
`

export const Title = styled.div`
    text-[#533C00]
    mb-[4%]
`

export const EditButton = styled.button`
    btn
    hover:bg-MenuColor
    hover:text-white
    w-[40%] 
    h-[10px] 
    bg-yellow-300
    shadow-custom-outer
    rounded-xl
`

export const CheckButton = styled.div`
    btn
    text-white
    hover:bg-user
    hover:text-MenuColor
    border-MenuColor
    w-[20%]
    h-[10px]
    mt-[4%]
    bg-MenuColor
    shadow-custom-outer
    rounded-full
    text-[90%]
    
`

export const Submit = styled.button`
    btn
    hover:bg-user
    hover:text-MenuColor
    w-[27%]
    h-[40px]
    mr-[7%]
    bg-yellow-800
    border-yellow-800
    shadow-custom-outer
    rounded-full
    text-[white]
`

export const StyleLink = styled(Link)`
    text-blue-700
`

export const Wrapper = styled.div`
    mb-[2%]
`

export const Wrapper2 = styled.div`
    flex flex-col
    mb-[4%]
    ml-[4%]
    mr-[4%]
`

export const Wrapper3 = styled.div`
    mt-[14%]
    flex 
    justify-center
`
export const ButtonWrapper = styled.div`
    flex flex-row 
    justify-around
    mb-[4%]
`
export const ProfileWrapper = styled.div`
    flex 
    justify-center
`

export const Layout = styled.div`
`

export const Container = styled.div`
    mb-[5%]
`

export const SubContainer = styled.div`
    mt-[13%]
    ml-[7%]
`

export const BackgroundContainer = styled.div`
    w-full 
    h-full 
    bg-cover 
    bg-center
`