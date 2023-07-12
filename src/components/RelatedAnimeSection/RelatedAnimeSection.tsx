"use client";
import { ShikimoriRelated } from "@/utils/AnimeApi";
import React, { useEffect, useState } from "react";
import RelatedAnime from "../RelatedAnime/RelatedAnime";
import { cn } from "@/lib/utils";

interface RelatedAnimeSectionProps {
    relatedAnime: ShikimoriRelated[];
}

const RelatedAnimeSection: React.FC<RelatedAnimeSectionProps> = ({
    relatedAnime,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-10 flex flex-col items-center">
            <div
                className={cn(
                    isOpen
                        ? "h-full overflow-y-visible"
                        : "max-h-[120px] overflow-y-hidden",
                    "w-full"
                )}
            >
                <h4 className="text-center text-3xl font-bold mb-3">
                    Связаные аниме
                </h4>
                {relatedAnime.map((el: ShikimoriRelated, id: number) => (
                    <RelatedAnime key={id} element={el} />
                ))}
            </div>
            <div onClick={() => setIsOpen((prev) => !prev)}>
                <svg
                    className={cn(
                        isOpen ? "rotate-180" : "",
                        "transition hover:fill-[#43aa52]",
                        "mt-3"
                    )}
                    fill="#fff"
                    height="30px"
                    width="40px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 330 330"
                >
                    <path
                        id="XMLID_225_"
                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
   c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
   s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    />
                </svg>
            </div>
        </div>
    );
};
export default RelatedAnimeSection;
