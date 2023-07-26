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
        <Button onClick={added ? removeFromTierlist : addToToTierlist} className="bg-transparent text-[#43aa52] transition-all border-[#43aa52] hover:bg-[#43aa52]/30 hover:text-white hover:scale-[105%] active:scale-[98%]" variant="outline">{!added ? "Добавить в Тир-Лист" : "Убрать из Тир-Листа" }</Button>
    );
};

export default AddToTierlistButton;