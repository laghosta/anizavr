"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchModal } from "@/hooks/useModal";
import { AnimePreview, Result } from "@/utils/AnimeApi";
import { Link } from "@/utils/Link";
import Anime from "../Anime/Anime";
import SearchResult from "./SearchResult";

const SearchModal = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Result[]>();
    const [query, setQuery] = useState("");
    const ref = useRef(null);
    const searchModal = useSearchModal();

    const getAnime = () => {
        fetch(`${Link}/api/searchAnime?query=${query}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "6024",
            },
        })
            .then((res) => res.json())
            .then((res) => setResults(res.results))
            .then(() => setLoading(false));
    };

    useEffect(() => {
        window.onclick = (event: any) => {
            if (
                event.target.contains(ref.current) &&
                event.target !== ref.current
            ) {
                searchModal.onClose();
            }
        };
    }, []);

    return (
        <div className="w-full h-full fixed top-0 left-0 bg-black/80 flex items-center justify-center z-50 modal-wrapper">
            <div
                ref={ref}
                className="flex bg-black items-start justify-center w-[600px] min-h-[400px] px-8 py-8  gap-3 border-2 border-[#43aa52] rounded-2xl"
            >
                <div className="flex items-center justify-center gap-5 w-full">
                    <Input
                        onChange={(e: any) => {
                            e.target.value.trim() &&
                                setQuery(e.target.value.trim());
                        }}
                        value={query}
                        className="w-full h-[40px] text-[#43aa52] focus:border-[#43aa52]"
                        placeholder="Поиск..."
                    ></Input>
                    <Button
                        onClick={getAnime}
                        className="text-[#43aa52] border-2 border-transparent transition hover:border-[#43aa52]"
                    >
                        Поиск
                    </Button>
                </div>
                <div className="flex flex-col ">
                    {results &&
                        results.map((el, id) => (
                            <SearchResult key={id} element={el} />
                        ))}
                </div>
            </div>
        </div>
    );
};
export default SearchModal;
