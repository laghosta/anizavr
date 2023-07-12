import { ShikimoriRelated } from "@/utils/AnimeApi";
import Link from "next/link";
import React from "react";
interface RelatedAnimeProps {
    element: ShikimoriRelated;
}

const RelatedAnime: React.FC<RelatedAnimeProps> = ({ element }) => {
    return (
        <Link href={`/anime/${element.anime?.id}`}>
            <div className="text-left  text-[#43aa52] hover:text-[#53d867fd]">
                {element.anime?.russian}
                <span className="text-white"> ({element.relationRussian})</span>
            </div>
        </Link>
    );
};
export default RelatedAnime;
