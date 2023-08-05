"use client";
import Section from "@/components/Section/Section";
import { AnimePreview } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import Head from "next/head";
import { useEffect, useState } from "react";
import fav from "../../public/images/favicon.ico";
import { customFetch } from "@/utils/fetch";
import Loader from "@/components/Loader/Loader";
import { useNavbar } from "@/hooks/useNavbar";
import { Metadata } from "next";
import { useLoading } from "./../hooks/useLoading";

const Home = () => {
    const [top, setTop] = useState<AnimePreview[]>();
    const [trending, setTrending] = useState<AnimePreview[]>();
    const [ongoings, setOngoings] = useState<AnimePreview[]>();
    const { setIsLoading, setIsNotLoading, loading } = useLoading();
    const getOngoings = async () => {
        const res = await customFetch(
            "api/getJustReleasedAnime?limit=10&page=1",
            "GET"
        ).then((res) => res.json());
        setOngoings(res);
        setIsNotLoading();
    };
    const getTop = () => {
        customFetch("api/getPopularAnime?limit=10&page=1", "GET")
            .then((res) => res.json())
            .then((res) => setTop(res));
    };
    const getTrending = () => {
        customFetch("api/getTrendingAnime?limit=10&page=1", "GET")
            .then((res) => res.json())
            .then((res) => setTrending(res));
    };

    useEffect(() => {
        setIsLoading();
        getTop();
        getTrending();
        getOngoings();
    }, []);

    return (
        <div className="flex flex-col items-start gap-10 justify-center pl-2 xl:pl-10 lg:pl-8 md:pl-6 sm:pl-4 pr-0">
            {!loading ? (
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
            ) : (
                <Loader />
            )}
        </div>
    );
};
export default Home;
