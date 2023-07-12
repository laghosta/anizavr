"use client";
import { AnimePreview, ShikimoriRelated } from "@/utils/AnimeApi";
import React, { useEffect, useState } from "react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Anime from "../Anime/Anime";
import "./styles.css";
interface SectionProps {
    title: string;
    anime: AnimePreview[];
    viewMoreHref?: string;
}

const Section: React.FC<SectionProps> = ({ anime, title, viewMoreHref }) => {
    return (
        <div className="mt-8 flex-col items-center justify-center gap-3 w-full">
            <h4 className="text-4xl  font-bold">{title}</h4>
            <Swiper
                slidesPerView={5}
                pagination={{
                    clickable: true,
                }}
                freeMode={true}
                grabCursor={true}
                modules={[Pagination, FreeMode]}
                breakpoints={{
                    0: {
                        slidesPerView: 1.1,
                    },
                    490: {
                        slidesPerView: 1.25,
                    },
                    530: {
                        slidesPerView: 1.5,
                    },
                    650: {
                        slidesPerView: 1.75,
                    },
                    720: {
                        slidesPerView: 2,
                    },
                    750: {
                        slidesPerView: 2.1,
                    },
                    800: {
                        slidesPerView: 2.25,
                    },
                    880: {
                        slidesPerView: 2.5,
                    },
                    1030: {
                        slidesPerView: 3,
                    },
                    1180: {
                        slidesPerView: 3.5,
                    },
                    1320: {
                        slidesPerView: 4,
                    },
                    1440: {
                        slidesPerView: 4.5,
                    },
                    1660: {
                        slidesPerView: 5.25,
                    },
                }}
            >
                {anime.map((el, id) => (
                    <SwiperSlide key={id}>
                        <Anime element={el} />
                    </SwiperSlide>
                ))}

                {viewMoreHref && (
                    <SwiperSlide key={viewMoreHref}>
                        <Anime href={viewMoreHref} />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};
export default Section;
