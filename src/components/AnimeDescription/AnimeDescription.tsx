"use client";
import React, { useEffect, useState } from "react";

interface AnimeDescriptionProps {
    text: string;
}
const AnimeDescription: React.FC<AnimeDescriptionProps> = ({ text }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (typeof window !== undefined) {
            setMounted(true);
        }
    }, []);
    return mounted ? (
        <div className="mt-8 px-2 xl:px-5 lg:px-4 md:px-3 sm:px-3">
            <h4 className="text-3xl font-bold mb-2">Описание</h4>
            <p
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
                className="text-center mb-5 descLink xl:text-left lg:text-left md:text-left"
            ></p>
        </div>
    ) : null;
};
export default AnimeDescription;
