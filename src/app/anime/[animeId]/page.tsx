import { Link } from "@/utils/Link";
import React from "react";
import Image from "next/image";
import date from "date-and-time";
import Player from "@/components/Player/Player";
import { AnimeID, AnimePreview, ShikimoriRelated } from "@/utils/AnimeApi";
import Section from "@/components/Section/Section";
import RelatedAnime from "@/components/RelatedAnimeSection/RelatedAnime";
import Comment from "@/components/Comment/Comment";
import RelatedAnimeSection from "@/components/RelatedAnimeSection/RelatedAnimeSection";
import { Anime as IAnime } from "@/utils/AnimeApi";
import AnimeDescription from "@/components/AnimeDescription/AnimeDescription";
import CommentsBlock from "@/components/Comment/CommentsBlock";
import {customFetch} from "@/utils/fetch";
import {undefined} from "zod";
import {Button} from "@/components/ui/button";
import AddToTierlistButton from "@/components/TierList/AddToTierlistButton";
import Error from "@/app/anime/[animeId]/Error";
import {redirect, useSearchParams} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import anime from "@/components/Anime/Anime";
import {Metadata, ResolvingMetadata} from "next";
import Loader from "@/components/Loader/Loader";

interface AnimeProps {
    params: {
        animeId: number;
    };
}

const getAnime = async (id: number) => {
    const res = await customFetch(`api/getAnime/${id}`, "GET").then(res => res.json())
    return res;
};
const getSimilarAnime = async (id: number) => {
    const res = await customFetch(`api/getSimilarAnime/${id}`, "GET").then(res => res.json())
    return res;
};
const getRelatedAnime = async (id: number) => {
    const res = await customFetch(`api/getRelatedAnime/${id}`, "GET").then(res => res.json())
    return res;
};

export async function generateMetadata({params}:any){
    const res = await getAnime(params.animeId)
    return {
        title: res.shikimoriDetails.licenseNameRu,
        description: res.shikimoriDetails.description
    }
}
const Anime: React.FC<AnimeProps> = async (props) => {
    const data: IAnime = await getAnime(props.params.animeId);
    const details: AnimeID | undefined = data?.shikimoriDetails
    const relatedAnime = (await getRelatedAnime(props.params.animeId)).filter(
        (el: ShikimoriRelated) => el.relationRussian !== "Прочее"
    );
    const similarAnime: AnimePreview[] = (
        await getSimilarAnime(props.params.animeId)
    ).slice(0, 10);
    const isDescription =
        details!.descriptionHtml !==
        '<div class="b-text_with_paragraphs"></div>';

    if(!data?.kodikDetails?.results?.length){
        return (
            <div className="text-white">
                Данное аниме еще не добавлено на сайт
            </div>
        )
    }
    else return (
            <div className="w-full h-full">
                <div className="flex flex-col mt-5 xl:mt-10 lg:mt-8 md:mt-6 text-center justify-between max-w-[960px] mx-auto w-screen">
                    <h1 className="font-bold text-3xl px-2">{details!.russian}</h1>
                    <p className="font-normal text-xl px-2">{details!.name}</p>
                    <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col items-center xl:h-[400px] lg:h-[400px] md:h-[400px] h-full  w-full mt-5 xl:mt-10 lg:mt-8 md:mt-6 gap-6">
                        <Image
                            loading={'eager'}
                            src={`https://shikimori.me${details!.image!.original}`}
                            width={300}
                            height={400}
                            alt={"anime poster"}
                            className="rounded-xl border-2 border-[#43aa52] h-[400px]"
                        />

                        <ul className="flex flex-col justify-between items-baseline max-h-[400px] xl:h-[400px] lg:h-[400px] md:h-[400px] gap-2">
                            <li>
                                Статус:{" "}
                                <span
                                    className="px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${
                                            details!.status == "released"
                                                ? "#389b16"
                                                : "#ea4f36"
                                        }`,
                                    }}
                                >
                        {details!.status}
                    </span>
                            </li>
                            <li>
                                Кол-во серий:{" "}
                                {`${
                                    details!.episodes === 0
                                        ? details!.episodesAired
                                        : details!.episodes
                                }`}
                            </li>
                            <li className="flex items-center gap-1">
                                Рейтинг:
                                <Image
                                    src={"/images/rating.png"}
                                    width={20}
                                    height={20}
                                    alt={"rating icon"}
                                />
                                {details!.score!}
                            </li>
                            <li>
                                {" "}
                                Дата выхода:{" "}
                                {`${date.format(
                                    new Date(details!.airedOn!),
                                    "DD.MM.YYYY"
                                )}`}
                            </li>
                            <li>Тип: {details!.kind}</li>
                            <li>
                                Студии:{" "}
                                {details!.studios
                                    ?.map((el: any) => el.name)
                                    .join(", ")}
                            </li>
                            <li className="flex items-center gap-2">
                                {details!.genres!.map((el: any, id: number) => (
                                    <span
                                        className="underline transition cursor-pointer hover:text-[#43aa52]"
                                        key={id}
                                    >
                            {el.russian}
                        </span>
                                ))}
                            </li>
                            <li>
                                <AddToTierlistButton animeId={props.params.animeId}/>
                            </li>
                        </ul>
                    </div>

                    <AnimeDescription
                        text={
                            isDescription
                                ? details!.descriptionHtml!
                                : "Описание отсутсвует"
                        }
                    />

                    {relatedAnime.length ? (
                        <RelatedAnimeSection relatedAnime={relatedAnime} />
                    ) : null}
                    {data && (
                        <Player
                            link={`https:${data?.kodikDetails?.results![0].link}` } animeId={props.params.animeId} timestamps={data.timestamps!}
                        />
                    )}
                    {
                        similarAnime.length ?  <Section
                            title="Похожие аниме"
                            anime={similarAnime}
                            slidesToShow={3}
                        /> : null
                    }

                    <CommentsBlock animeId={props.params.animeId} />
                </div>
            </div>

    );
};
export default Anime;
