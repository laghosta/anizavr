'use client'
import React, {useEffect, useState} from 'react';
import Loader from "@/components/Loader/Loader";
import {useLoading} from "@/hooks/useLoading";

interface AnimePageLayoutProps{
    children:React.ReactNode
    params:{
        animeId:number
    }
}
const AnimePageLayout:React.FC<AnimePageLayoutProps> = ({children, params}) => {
    const {loading, setIsNotLoading} = useLoading()
    useEffect(() => {
        children ? setIsNotLoading() : null
    }, [])
    return (
        <div className="h-full max-w-[960px] mx-auto">
            {
                loading ? <Loader/> : children
            }
        </div>
    );
};

export default AnimePageLayout;