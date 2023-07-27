'use client'
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {customFetch} from "@/utils/fetch";
import {useUser} from "@/hooks/useUser";

interface AddToTierlistButtonProps{
    animeId : number
}
const AddToTierlistButton:React.FC<AddToTierlistButtonProps> = ({animeId}) => {
    const [added, setAdded] = useState<true|false>(false)
    const {user} = useUser()
    useEffect(() => {
        if(user){
            user.tierlist?.forEach((el) => Number(animeId) === el.animeId ? setAdded(true) : null)
        }
    }, [user])
    const addToToTierlist = async() => {
        setAdded(true)
        const res = await customFetch(`api/users/addToTierlist/${animeId}`, "POST")
        const errorCode = res.status === 200 ? false : res.status
        if(!errorCode){
        }
    }
    const removeFromTierlist = async() => {
        setAdded(false)
        const res = await customFetch(`api/users/removeFromTierlist/${animeId}`, "DELETE")
        const errorCode = res.status === 200 ? false : res.status
        if(!errorCode){
        }
    }
    return (
        <Button onClick={added ? removeFromTierlist : addToToTierlist} className="bg-transparent flex items-center px-2 text-[#43aa52] transition-all border-[#43aa52] hover:bg-[#43aa52]/30 hover:text-[#43aa52] hover:scale-[105%] active:scale-[98%]" variant="outline">
            {!added ? "Добавить в Тир-Лист" : "Убрать из Тир-Листа" }
            {
                added ?   <div className="w-[30px] h-[30px]">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 50 50"  width="30px" height="30px">
                        <polyline style={{fill:"none", stroke:"#43aa52", strokeWidth:3, strokeLinecap:"round", strokeMiterlimit:10}} points={"16,34 25,25 34,16"}/>
                        <polyline style={{fill:"none", stroke:"#43aa52", strokeWidth:3, strokeLinecap:"round", strokeMiterlimit:10}} points="16,16 25,25 34,34"/>
                    </svg>
                </div>
                    :
                    <div className="w-[20px] h-[20px] ml-2" style={{
                        strokeWidth: 10}}>
                        <svg fill="#43aa52" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"  >
                            <path d="M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z" fillRule="evenodd"/>
                        </svg>
                    </div>

            }


        </Button>
    );
};

export default AddToTierlistButton;