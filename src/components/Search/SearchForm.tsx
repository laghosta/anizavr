"use client";
import React, { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const SearchForm = () => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClickSearch = (
        event: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
        event?.preventDefault();
        router.replace(`/anime/search?title=${value}`);
    };
    return (
        <form className="w-fit border-white flex gap-2 items-center ml-auto border-2  rounded-md px-3 pr-5 ">
            <Input
                onChange={(event) => setValue(event.target.value)}
                value={value}
                className={
                    "flex justify-between w-[150px]  focus:w-[400px]  focus:border-none outline-none border-none text-md focus:outline-none items-center text-white placeholder:text-white hover:border-none py-3 bg-transparent transition-all ease-linear"
                }
                placeholder="Поиск аниме..."
            />
            <Button
                onClick={onClickSearch}
                type="submit"
                className="bg-transparent p-0 m-0 hover:bg-transparent"
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
    );
};
export default SearchForm;
