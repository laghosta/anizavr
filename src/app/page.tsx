"use client";
import Section from "@/components/Section/Section";
import { AnimePreview } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import Head from "next/head";
import { useEffect, useState } from "react";
import fav from "../../public/images/favicon.ico";
import {customFetch} from "@/utils/fetch";
import Loader from "@/components/Loader/Loader";
import {useNavbar} from "@/hooks/useNavbar";

const Home = () => {
    const [top, setTop] = useState<AnimePreview[]>();
    const [trending, setTrending] = useState<AnimePreview[]>();
    const [ongoings, setOngoings] = useState<AnimePreview[]>();
    const [isLoading, setIsLoading] = useState<true | false>(true);
    const getOngoings = async() => {
        const res = await customFetch("api/getJustReleasedAnime?limit=10&page=1", "GET").then((res) => res.json())
        setOngoings(res)
        setIsLoading(false)
    };
    const getTop = () => {
        customFetch("api/getPopularAnime?limit=10&page=1", "GET")
            .then(res => res.json()).then((res) => setTop(res));
    };
    const getTrending = () => {
       customFetch("api/getTrendingAnime?limit=10&page=1", "GET")
            .then((res) => res.json())
            .then((res) => setTrending(res));

    };

    useEffect(() => {
        getTop();
        getTrending();
        getOngoings();
    }, []);

    return (
        <div className="flex flex-col items-start gap-10 justify-center pl-10 pr-0">
            {!isLoading ? (
                <>
                    {top && (
                        <Section anime={top} title={"Топ аниме"} viewMoreHref="/anime"/>
                    )}
                    {trending && (
                        <Section anime={trending} title={"Популярные"} />
                    )}
                    {ongoings && (
                        <Section anime={ongoings} title={"Лучшие онгоинги"} />
                    )}
                </>
            ) :
                <Loader/>
            }
        </div>
    );
};
export default Home;
