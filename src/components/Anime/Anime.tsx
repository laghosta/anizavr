import { AnimePreview } from "@/utils/AnimeApi";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import numeralize from "numeralize-ru";

interface AnimeProps {
    element?: AnimePreview;
    rated?: number;
    href?: string;
}

const Anime: React.FC<AnimeProps> = ({ element, rated, href }) => {
    const validateEpisodesStr = (episodes: number) => {
        return numeralize.pluralize(episodes, "серия", "серии", "серий");
    };

    return (
        <>
            {element && (
                <Link
                    className="justify-self-center"
                    href={`/anime/${element.id}`}
                >
                    <div
                        className="relative bg-no-repeat bg-center flex items-end rounded-xl border-2 border-[#43aa52] shadow-md shadow-[#43aa52] w-[300px] h-[400px] transition hover:scale-[102%] anime"
                        style={{
                            background: `url(https://shikimori.me${element.image?.original})`,
                            backgroundSize: "cover",
                        }}
                    >
                        {rated && (
                            <div className="absolute flex items-center justify-center bg-[#43aa52]/80 text-center z-10 top-[-15px] left-[-15px] text-xl rounded-full border-2 border-[#43aa52] w-[40px] h-[40px] ">
                                {rated}
                            </div>
                        )}
                        <div className="flex w-full px-5 py-2">
                            <div className="flex-col w-full self-end">
                                <p className=" outline-purple-50 text-lg leading-6 font-bold drop-shadow-lg shadow-black title">
                                    {element.russian}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-1.5">
                                            {element.score}{" "}
                                            <span className="flex items-center justify-center">
                                                {" "}
                                                <Image
                                                    src="/images/rating.png"
                                                    width={20}
                                                    height={20}
                                                    alt=""
                                                />
                                            </span>{" "}
                                        </div>
                                        <span>&#160;&#160;|&#160;&#160;</span>
                                        <div>
                                            {`${
                                                element.episodes === 0
                                                    ? `?`
                                                    : element.episodes
                                            } ${validateEpisodesStr(
                                                element.episodes!
                                            )}`}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(event) =>
                                            event.preventDefault()
                                        }
                                    >
                                        <svg
                                            className="transition-all hover:scale-[105%] active:scale-[99%]"
                                            width="30px"
                                            height="40px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M15 6H9"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {href && (
                <Link href={href}>
                    <div className="text-center relative bg-no-repeat bg-center flex items-center justify-center text-3xl bg-[#43aa52] rounded-xl border-2 border-[#43aa52] shadow-md shadow-[#43aa52] w-[300px] h-[400px] transition hover:scale-[102%] hover:bg-[#54c565]  anime">
                        Больше...
                    </div>
                </Link>
            )}
        </>
    );
};
export default Anime;
