"use client";
import Section from "@/components/Section/Section";
import { AnimePreview } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import Head from "next/head";
import { useEffect, useState } from "react";
import fav from "../../public/images/favicon.ico";

const Home = () => {
    const [top, setTop] = useState<AnimePreview[]>();
    const [trending, setTrending] = useState<AnimePreview[]>();
    const [ongoings, setOngoings] = useState<AnimePreview[]>();
    const [isLoading, setIsLoading] = useState<true | false>(false);

    const getOngoings = () => {
        fetch(`${Link}/api/getJustReleasedAnime?limit=10&page=1`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        })
            .then((res) => res.json())
            .then((res) => setOngoings(res));
    };
    const getTop = () => {
        fetch(`${Link}/api/getPopularAnime?limit=10&page=1`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        }).then((res) => res.json().then((res) => setTop(res)));
    };
    const getTrending = () => {
        fetch(`${Link}/api/getTrendingAnime?limit=10&page=1`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        })
            .then((res) => res.json())
            .then((res) => setTrending(res));
    };

    useEffect(() => {
        setIsLoading(true);
        getOngoings();
        getTop();
        getTrending();
        setIsLoading(false);
    }, []);

    return (
        <div className="flex flex-col items-start gap-10 justify-center pl-10 pr-0">
            {!isLoading && (
                <>
                    {top && (
                        <Section
                            anime={top}
                            title={"Топ аниме"}
                            viewMoreHref="/anime"
                        />
                    )}
                    {trending && (
                        <Section anime={trending} title={"Популярные"} />
                    )}
                    {ongoings && (
                        <Section anime={ongoings} title={"Лучшие онгоинги"} />
                    )}
                </>
            )}
        </div>
    );
};
export default Home;
