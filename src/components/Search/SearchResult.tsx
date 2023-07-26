import { Result } from "@/utils/AnimeApi";
import React from "react";
import Image from "next/image";
interface SearchResultProps {
    element: Result;
}
const SearchResult: React.FC<SearchResultProps> = ({ element }) => {
    return (
        <div className="flex self-center">
            <Image
                src={element.material_Data?.poster_Url!}
                width={300}
                height={400}
                alt="anime poster"
            ></Image>
        </div>
    );
};
export default SearchResult;
