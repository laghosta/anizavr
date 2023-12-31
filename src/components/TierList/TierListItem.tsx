'use client'
import React from 'react';
import Image from 'next/image'
import {cn} from "@/lib/utils";
import {TierlistAnime} from "@/utils/AnimeApi";
import {useTierlist} from "@/hooks/useTierlist";
import {customFetch} from "@/utils/fetch";
import Link from "next/link";
import {useUser} from "@/hooks/useUser";
import {useParams} from "next/navigation";
import {ShikimoriLink} from "@/utils/Link";

interface TierListProps {
    element:TierlistAnime,
    index:number,
    isFirst:boolean,
    isLast:boolean
}
const TierListItem:React.FC<TierListProps> = ({element, isFirst, isLast,index}) => {
    const {user} = useUser()
    const {username} = useParams()
    const {handleTierlistAction, tierlistAction} = useTierlist()
    const changeTierlistAnimePosition = async(up:boolean) => {
        const res = await customFetch(`api/users/changeTierlistOrder/${element.animeId}?newPosition=${up ? index-1 : index+1}`, "PUT")
        const errorCode = res.status === 200 ? false : res.status
        if(!errorCode){
            handleTierlistAction(tierlistAction)
        }
    }
    const removeFromTierList = async() => {
        const res = await customFetch(`api/users/removeFromTierlist/${element.animeId}`, "DELETE")
        const errorCode = res.status === 200 ? false : res.status
        if(!errorCode){
            handleTierlistAction(tierlistAction)
        }
    }
    return (
        <li className="border-2 border-[#43aa52] w-full flex rounded-3xl items-center gap-1 xl:gap-5 lg:gap-4 md:gap-3 sm:gap-2 justify-between px-5 py-2 transition-all hover:scale-[101%]">
            <div className="flex items-center gap-3">
                <h4 className={cn( index === 1 ? "text-yellow-400" : index === 2 ? "text-orange-300" : index === 3 ? "text-red-400" : "text-white"  ,"text-3xl")}>
                    #{index}
                </h4>
                <Link href={`/anime/${element.animeId}`}  className="relative min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px] xl:max-h-[100px] xl:max-w-[100px] xl:min-h-[100px] xl:min-w-[100px] lg:max-h-[100px] lg:min-h-[100px] md:min-h-[100px] md:max-h-[100px] rounded-full">
                    <Image src={`${ShikimoriLink}${element.posterUrl}`} fill={true} alt="tier list anime poster"
                           className="rounded-full border-2 border-[#43aa52]"/>
                </Link>
                <p className="text-lg xl:text-2xl lg:text-xl md:text-lg sm:text-lg font-semibold">{element.title}</p>
            </div>
            {
                user?.username === username ?
                    <div className="flex gap-1 items-center xl:gap-3 lg:gap-3 md:gap-3 sm:gap-2 ">
                       <div className="flex flex-col md:flex-row ">

                        {
                            !isFirst ? <div
                                onClick={() => changeTierlistAnimePosition(true)}>
                                <svg
                                    className={cn(
                                        "rotate-180",
                                        "mx-auto",
                                        "transition",
                                        "mt-3",
                                        "select-none",
                                        "cursor-pointer",
                                        "opacity-70",
                                        "transition",
                                        "hover:scale-[105%]",
                                        "hover:opacity-100"

                                    )}
                                    fill={!isFirst ? "white" : "gray"}
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
                            </div> : null
                        }
                        {
                            !isLast ?
                                <div
                                    onClick={() => changeTierlistAnimePosition(false)}
                                >
                                    <svg
                                        className={cn(
                                            "mx-auto",
                                            "transition",
                                            "mt-3",
                                            "select-none",
                                            "cursor-pointer",
                                            "opacity-70",
                                            "transition",
                                            "hover:scale-[105%]",
                                            "hover:opacity-100"

                                        )}
                                        fill={!isLast ? "white" : "gray"}
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
                                </div>
                                : null
                        }
                       </div>

                        <div onClick={removeFromTierList} className="w-[30px] h-[30px] rounded-full cursor-pointer  hover:scale-[105%] opacity-80 hover:opacity-100">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 50 50">
                                <circle style={{fill:"#D75A4A"}} cx="25" cy="25" r="25"/>
                                <polyline style={{fill:"none", stroke:"#FFFFFF", strokeWidth:2, strokeLinecap:"round", strokeMiterlimit:10}} points="16,34 25,25 34,16"/>
                                <polyline style={{fill:"none", stroke:"#FFFFFF", strokeWidth:2, strokeLinecap:"round", strokeMiterlimit:10}} points="16,16 25,25 34,34"/>
                            </svg>
                        </div>

                    </div> : null
            }

        </li>
    );
};

export default TierListItem;