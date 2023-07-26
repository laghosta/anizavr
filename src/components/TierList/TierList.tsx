import React, {useEffect} from 'react';
import TierListItem from "@/components/TierList/TierListItem";
import {useUser} from "@/hooks/useUser";
import {TierlistAnime} from "@/utils/AnimeApi";

interface TierListProps{
    anime:TierlistAnime[] | undefined
}
const TierList:React.FC<TierListProps> = ({anime}) => {
    let items = anime ? anime.map((el, id) =>
        {
           return <TierListItem element={el} index={id+1} isFirst={id===0}  isLast={id=== anime.length-1}/>
        }
    )
    :<h4 className="text-center text-3xl font-semibold">Ваш Тир-Лист пустой...</h4>

    return (
        <div className="mt-5 w-full">
            <h4 className="text-3xl font-bold">
                Тир-Лист аниме
            </h4>
            <div className="mt-5 ">
                <ul className="flex flex-col gap-3">
                    {items}
                </ul>
            </div>

        </div>
    );
};

export default TierList;