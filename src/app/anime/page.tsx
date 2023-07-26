"use client";
import Anime from "@/components/Anime/Anime";
import { AnimePreview } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import React, { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
const BrowsingAnime = () => {
    const [anime, setAnime] = useState<AnimePreview[]>([]);
    const [page, setPage] = useState(1);

    const getAnime = (page: number) => {
        fetch(`${Link}/api/getPopularAnime?limit=50&page=${page}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        })
            .then((res) => res.json())
            .then((res) => setAnime([...anime, ...res]));
    };

    useEffect(() => {
        getAnime(1);
    }, []);

    useEffect(() => {
        getAnime(page);
    }, [page]);
    return (
        <div className="h-full w-full flex flex-col px-10">
            <div className="grid pt-10 gap-y-8 animePage">
                {anime &&
                    anime.map((el, id) => (
                        <Anime rated={id + 1} key={id} element={el} />
                    ))}
            </div>
            <Button onClick={() => setPage(page+1)} variant="default"  className={"mt-5"}>
                Еще...
            </Button>
        </div>
    );
};
export default BrowsingAnime;
