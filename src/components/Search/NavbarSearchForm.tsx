"use client";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { Input } from "../ui/input";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAnimeWishlistUpdate } from "@/hooks/useAnimeWishlistUpdate";
import { useLoading } from "@/hooks/useLoading";
import debounce from "lodash.debounce";
import { customFetch } from "@/utils/fetch";
import { Result } from "./../../utils/AnimeApi";
import Link from "next/link";
const NavbarSearchForm = () => {
    const [value, setValue] = useState<string>("");
    const [results, setResults] = useState<Result[]>();
    const router = useRouter();
    const path = usePathname()
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const { setIsLoading, setIsNotLoading } = useLoading();
    const input  = useRef(null)
    const onClickSearch = (
        event: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
        setIsLoading();
        event.preventDefault();
        setIsOpen(false);
        if (!value.trim()) {
            setIsNotLoading();
            //@ts-ignore
            input.current!.focus();

        } else {
            router.push(`/anime/search?title=${value}`);
        }
        setIsNotLoading();
    };
    const onInputChange = (tempValue: any) => {
        if (!tempValue.trim()) {
            setResults(undefined);
            setIsOpen(false);
        } else {
            customFetch(`api/searchAnime?query=${tempValue}`, "GET")
                .then((res) => res.json())
                .then((res) => setResults(res.results.slice(0, 5)))
                .then(() => setIsOpen(true));
        }
    };
    const debounced = useMemo(
        () => debounce((value) => onInputChange(value), 500),
        []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debounced(event.target.value);
    };
    const handleClickOutside = (event: any) => {
        if (
            !event.target.parentNode.classList.contains("dropdown") &&
            !event.target.parentNode.classList.contains("dropdown-parent")
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        return () => {
            debounced.cancel();
        };
    }, [debounced]);
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div className="relative dropdown">
            <>
                <form className="border-white flex gap-2 items-center ml-auto border-2 rounded-md md:px-2 sm:px-2 px-2 pr-1 dropdown-parent">
                    <Input
                        ref={input}
                        onChange={handleChange}
                        value={value}
                        className={cn(
                            "flex justify-between max-w-[110px] xl:max-w-[400px] lg:max-w-[400px] md:max-w-[150px] sm:max-w-[150px] w-[150px] px-0 focus:border-none outline-none border-none text-md focus:outline-none items-center text-white placeholder:text-white hover:border-none py-1 xl:py-3 lg:py-3 md:py-2 sm:py-2 bg-transparent transition-all ease-linear"
                        )}
                        placeholder="Поиск аниме..."
                        onFocus={() => setIsOpen(true)}
                    />
                    <Button
                        onClick={onClickSearch}
                        type="submit"
                        className="bg-transparent p-0 m-0 hover:bg-transparent dropdown"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            viewBox="0 0 50 50"
                            width="25px"
                            height="25px"
                        >
                            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                        </svg>
                    </Button>
                </form>
                {results ? (
                    <ul
                        className={cn(
                            "h-fit p-2 rounded-2xl w-full transition-all border border-white max-w-[150px] xl:max-w-[450px] lg:max-w-[450px] md:max-w-[200px] sm:max-w-[200px] shadow-lg shadow-[#43aa52] absolute left-0 top-[60px] bg-[#42aa53] dropdown",
                            isOpen ? "w-fit h-fit" : "h-0 hidden"
                        )}
                    >
                        {results.length ? (
                            <>
                                {results.map((el: Result, id) => (
                                    <li
                                        key={id}
                                        className={cn(
                                            "text-left py-1 cursor-pointer whitespace-nowrap overflow-x-hidden border-b border-b-white w-full hover:bg-[#43aa52]"
                                        )}
                                        onClick={() => {
                                            router.push(
                                                `/anime/${el.shikimori_Id}`
                                            );
                                            setIsOpen(false);
                                        }}
                                    >
                                        {el.title}
                                    </li>
                                ))}
                                <li className="py-1 cursor-pointer">
                                    <button
                                        onClick={() => {
                                            router.push(
                                                `/anime/search?title=${value}`
                                            );
                                        }}
                                        className="w-full h-full text-left"
                                    >
                                        Больше...
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="text-left py-1 cursor-pointer border-b border-b-white w-full hover:bg-[#43aa52]">
                                По вашему запросу ничего не найдено...
                            </li>
                        )}
                    </ul>
                ) : (
                    <div
                        className={cn(
                            "max-w-[150px] bg-[#43aa52]  xl:max-w-[450px] lg:max-w-[450px] md:max-w-[200px] sm:max-w-[200px] text-center fixed",
                            isOpen ? "" : "hidden"
                        )}
                    ></div>
                )}
            </>
        </div>
    );
};
export default NavbarSearchForm;
