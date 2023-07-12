import { Result } from "@/utils/AnimeApi";
import React from "react";

interface SearchResultProps {
    element: Result;
}
const SearchResult: React.FC<SearchResultProps> = ({ element }) => {
    return <div>{element.title}</div>;
};
export default SearchResult;
