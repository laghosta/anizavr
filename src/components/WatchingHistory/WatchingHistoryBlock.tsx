"use client";
import React, { useEffect, useMemo, useState } from "react";
import WatchingHistoryItem from "@/components/WatchingHistory/WatchingHistoryItem";
import { Link } from "@/utils/Link";
import { customFetch } from "@/utils/fetch";
import { UserWatchingAnime } from "@/utils/AnimeApi";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";
import { redirect, useParams } from "next/navigation";

interface WatchingHistoryBlock {
    watchingHistory: UserWatchingAnime[];
}
const WatchingHistoryBlock: React.FC<WatchingHistoryBlock> = ({
    watchingHistory,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(watchingHistory);
    let data = watchingHistory.length ? (
        watchingHistory?.map((el: UserWatchingAnime, id: number) => {
            return (
                <li key={id}>
                    <WatchingHistoryItem el={el} />
                </li>
            );
        })
    ) : (
        <div className="flex items-center">
            <h4 className="text-3xl">
                Ты до сих пор не посмотрел никакого аниме, а зря...
            </h4>
            <img
                src="/images/2.png"
                alt="История просмотров пуста"
                className="w-[200px] h-[200px]"
            />
        </div>
    );
    let shortenData;

    const setSortedData = useMemo(() => {
        let arr = [...watchingHistory];
        arr = arr.slice(0, 4);
        return watchingHistory.length ? (
            arr.map((el: UserWatchingAnime, id: number) => {
                return (
                    <li key={id}>
                        <WatchingHistoryItem el={el} />
                    </li>
                );
            })
        ) : (
            <div className="flex items-center ">
                <h4 className="text-3xl ">
                    Ты до сих пор не посмотрел никакого аниме, а зря...
                </h4>
                <img
                    src="/images/2.png"
                    alt="История просмотров пуста"
                    className="w-[200px] h-[200px]"
                />
            </div>
        );
    }, [watchingHistory]);
    return (
        <div
            className={cn(
                `${
                    !isOpen
                        ? "xl:max-h-[450px] lg:max-h-[450px]  md:max-h-[750px] sm:max-h-[750px] max-h-[750px] "
                        : "overflow-y-visible"
                } `
            )}
        >
            <h4 className="text-3xl text-white mb-5 font-bold border-b-2 border-[#53aa42] py-2 w-fit">
                История просмотров
            </h4>
            <ul
                className={`flex flex-wrap gap-5 items-center ${styles.block} ${
                    watchingHistory.length ? "justify-start" : "justify-start"
                }`}
            >
                {isOpen ? data : setSortedData}
            </ul>
            {watchingHistory.length > 4 ? (
                <svg
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        isOpen && "rotate-180",
                        "mx-auto",
                        "transition",
                        "mt-3",
                        "select-none",
                        "cursor-pointer"
                    )}
                    fill="white"
                    height="30px"
                    width="40px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 330 330"
                >
                    <path
                        id="XMLID_225_"
                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    />
                </svg>
            ) : null}
        </div>
    );
};

export default WatchingHistoryBlock;
