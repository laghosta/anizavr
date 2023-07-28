"use client";
import Anime from "@/components/Anime/Anime";
import SearchForm from "@/components/Search/SearchForm";
import SearchResult from "@/components/Search/SearchResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AnimePreview, Image, Result } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {useAnimeWishlistUpdate} from "@/hooks/useAnimeWishlistUpdate";
export interface SearchAnime {
    russian?: string | undefined;
    score?: string | undefined;
    episodes?: number | null;
    image?: Image;
    kind? : string;
    id?: number;
}

const SearchPage = () => {
    const [value, setValue] = useState("");
    const [mounted, setMounted] = useState(false);
    const [tempData, setTempData] = useState<Result[]>();
    const [data, setData] = useState<SearchAnime[]>();
    const searchParams = useSearchParams();
    const {updated, updateWishlist} = useAnimeWishlistUpdate()
    if (!searchParams.get("title")) {
        redirect("/");
    }

    useEffect(() => {
        const arr: SearchAnime[] = [];
        setData([])
        if (tempData) {
            for (let i = 0; i < tempData.length; i++) {
                const image = new Image();
                image.original = tempData[i].material_Data?.poster_Url;
                const element: SearchAnime = {
                    russian: tempData[i].title,
                    score: tempData[i].material_Data?.shikimori_rating?.toString(),
                    episodes: null,
                    kind: tempData[i].type,
                    image: image,
                    id: Number(tempData[i].shikimori_Id),
                };
                arr.push(element);
            }
            setData(arr);
        }
    }, [tempData]);

    const searchAnime = (value: string) => {
        fetch(`${Link}/api/searchAnime?query=${value}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        })
            .then((res) => res.json())
            .then((res) => setTempData(res.results));

    };

    const onClickSearch = (
        event: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
        event.preventDefault();
        searchAnime(value);
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            setMounted(true);
        }
    }, []);
    useEffect(() => {
        if (mounted) {
            if (searchParams.get("title")) {
                searchAnime(searchParams.get("title")!);
                setValue(searchParams.get("title")!);
            }
        }
    }, [mounted, searchParams]);

    return (
        <div className="px-10">
            {mounted && (
                <div className="xl:px-[50px] lg:px-[40px] md:px-[30px] sm:px-[40px] mt-10">
                    <h4 className=" ml-5 text-3xl mb-5">
                        Результаты поиска по названию:{" "}
                        <span className="text-[#43aa53]">
                            {searchParams.get("title")}
                        </span>
                    </h4>
                    <div className="ml-5 mb-5 w-[200px]">
                        <SearchForm />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-8 rounded-xl h-full w-full">
                        {data?.length ? (
                            data?.map((el, id) => (
                                <Anime key={id} element={el} />
                            ))
                        ) : (
                            <div className="text-left text-3xl font-bold text-white">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default SearchPage;
