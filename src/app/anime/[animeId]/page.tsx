import { Link } from "@/utils/Link";
import React from "react";
import Image from "next/image";
import date from "date-and-time";
import Player from "@/components/Player/Player";
import { AnimePreview, ShikimoriRelated } from "@/utils/AnimeApi";
import Section from "@/components/Section/Section";
import RelatedAnime from "@/components/RelatedAnime/RelatedAnime";
import { useNavbar } from "@/hooks/useNavbar";
import RelatedAnimeSection from "@/components/RelatedAnimeSection/RelatedAnimeSection";

interface AnimeProps {
    params: {
        animeId: number;
    };
}

const getAnime = async (id: any) => {
    const res = await fetch(`${Link}/api/getAnime/${id}`).then((res) =>
        res.json()
    );
    return res;
};
const getRelatedAnime = async (id: number) => {
    const res = await fetch(`${Link}/api/getRelatedAnime/${id}`).then((res) =>
        res.json()
    );
    return res;
};

const Anime: React.FC<AnimeProps> = async (props) => {
    const data = await getAnime(props.params.animeId);
    const details = data.shikimoriDetails;
    const relatedAnime = await getRelatedAnime(props.params.animeId);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col mt-10 text-center justify-between max-w-[960px] mx-auto w-screen">
                <h1 className="font-bold text-3xl">{details.russian}</h1>
                <p className="font-normal text-xl">{details.name}</p>
                <div className="flex items-center h-[400px] w-full mt-10 gap-6">
                    <Image
                        src={`https://shikimori.me${details.image!.original}`}
                        width={300}
                        height={400}
                        alt={"anime poster"}
                        className="rounded-xl border-2 border-[#43aa52] h-[400px]"
                    />
                    <ul className="flex flex-col py-5 justify-between items-baseline h-[400px]">
                        <li>
                            Статус:{" "}
                            <span
                                style={{
                                    backgroundColor: `${
                                        details.status == "released"
                                            ? "#389b16"
                                            : "#ea4f36"
                                    }`,
                                }}
                            >
                                {details.status}
                            </span>
                        </li>
                        <li>
                            Кол-во серий:{" "}
                            {`${
                                details.episodes === 0
                                    ? details.episodesAired
                                    : details.episodes
                            }`}
                        </li>
                        <li>
                            Рейтинг:
                            <Image
                                src={"/images/rating.png"}
                                width={20}
                                height={20}
                                alt={"///"}
                            />
                            {details.score!}
                        </li>
                        <li>
                            {" "}
                            Дата выхода:{" "}
                            {`${date.format(
                                new Date(details.airedOn),
                                "DD.MM.YYYY"
                            )}`}
                        </li>
                        <li>Тип: {details.kind}</li>
                        <li>
                            Студии:{" "}
                            {details.studios
                                ?.map((el: any) => el.name)
                                .join(", ")}
                        </li>
                        <li>
                            {details.genres!.map((el: any, id: number) => (
                                <span key={id}>{el.russian}</span>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h4 className="text-3xl font-bold mb-2">Описание</h4>
                    <p
                        className="text-left mb-5"
                        dangerouslySetInnerHTML={{
                            __html: details && details.descriptionHtml,
                        }}
                    ></p>
                </div>
                {relatedAnime && (
                    <RelatedAnimeSection relatedAnime={relatedAnime} />
                )}
                {data && (
                    <Player
                        link={`https:${data?.kodikDetails?.results![0].link}`}
                    />
                )}
            </div>
        </div>
    );
};
export default Anime;
