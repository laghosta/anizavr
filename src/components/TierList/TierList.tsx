import React, { useEffect } from "react";
import TierListItem from "@/components/TierList/TierListItem";
import { TierlistAnime } from "@/utils/AnimeApi";

interface TierListProps {
    anime: TierlistAnime[] | undefined;
}
const TierList: React.FC<TierListProps> = ({ anime }) => {
    let items = anime?.length ? (
        anime.map((el, id) => {
            return (
                <TierListItem
                    key={id}
                    element={el}
                    index={id + 1}
                    isFirst={id === 0}
                    isLast={id === anime.length - 1}
                />
            );
        })
    ) : (
        <div className="w-full flex items-center">
            <h4 className="text-3xl">Ваш Тир-Лист пустой...</h4>
            <img
                className="w-[200px] h-[300px]"
                src="/images/1.png"
                alt="tierlist empty"
            />
        </div>
    );

    return (
        <div className="mt-5 mb-5 w-full ">
            <h4 className="text-3xl font-bold border-b-2 border-[#53aa42] py-2 w-fit">
                Тир-Лист аниме
            </h4>
            <div className="mt-5">
                <ul className="flex flex-col gap-3">{items}</ul>
            </div>
        </div>
    );
};

export default TierList;
