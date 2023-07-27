import React from 'react';
import {UserWatchingAnime} from "@/utils/AnimeApi";
import Image from 'next/image'
import Link from "next/link";
import styles from './styles.module.css'
interface WatchingHistoryItemProps {
    el : UserWatchingAnime
}
const WatchingHistoryItem:React.FC<WatchingHistoryItemProps> = ({el}) => {
    return (
        <Link href={`/anime/${el.animeId}`} className="flex gap-4 px-3 py-3 bg-white/20 border-2 border-[#43aa52] rounded-3xl w-[350px] xl:w-[420px] lg:w-[420px] sm:w-[420px] md:w-[420px] ">
            <Image width={100} height={100}  className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] rounded-full border border-[#43aa52]" src={`https://shikimori.me/${el.posterUrl}`} alt={"Watching History Anime Poster"}/>
            <div className="w-full flex flex-col gap-2 py-2">
                <p
                    className={`max-w-[200px] xl:max-w-[250px] lg:max-w-[250px] md:max-w-[250px] sm:max-w-[250px] text-white text-2xl overflow-x-hidden  break-keep truncate ${styles.title}`}>
                    {el.title}
                </p>
                <p>
                    {
                        el.kind == "tv"
                            ? `Всего серий: ${el.episodesTotal}`
                            :  "Фильм"
                    }
                </p>
                <p>
                    {
                        el.kind === "tv"
                            ? `Текущая серия: ${el.currentEpisode}`
                            : "Прогресс просмотра"
                    }
                    <div
                        className={`max-w-[250px] h-[5px] relative bg-green-700 mt-1 rounded-full ${styles.progress}` }>
                        <div style={{width:`${Math.round((el.secondsWatched!/el.secondsTotal!)*250)}px`}} className={`absolute top-0  rounded-full left-0 z-10 h-[5px] bg-amber-50`}>
                        </div>
                    </div>
                </p>

            </div>
        </Link>
    );
};

export default WatchingHistoryItem;