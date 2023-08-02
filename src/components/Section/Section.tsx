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
    anime?: AnimePreview[];
    viewMoreHref?: string;
    slidesToShow?: boolean;
    inWishList?: boolean;
}

const Section: React.FC<SectionProps> = ({
    anime,
    title,
    viewMoreHref,
    slidesToShow,
    inWishList,
}) => {
    const data = anime?.length ? (
        anime.map((el, id) => {
            return (
                <SwiperSlide key={id}>
                    <Anime inWishlist={inWishList} element={el} />
                </SwiperSlide>
            );
        })
    ) : (
        <div className="flex items-center ">
            <h4 className="text-3xl ">Я знаю, что ты хочешь посмотреть...</h4>
            <img
                src="/images/3.png"
                alt="История просмотров пуста"
                className="w-[200px] h-[200px]"
            />
        </div>
    );

    const checkResolution = () => {
        let slidesToShow;
        let resolution = 1920;
        resolution = window.innerWidth;
        if (resolution >= 960) {
            slidesToShow = 3;
        } else if (resolution < 960 && resolution > 850) {
            slidesToShow = 2.75;
        } else if (resolution < 850 && resolution > 770) {
            slidesToShow = 2.5;
        } else if (resolution < 770 && resolution > 700) {
            slidesToShow = 2.25;
        } else if (resolution < 700 && resolution > 630) {
            slidesToShow = 2;
        } else if (resolution < 630 && resolution > 560) {
            slidesToShow = 1.75;
        } else if (resolution < 560 && resolution > 490) {
            slidesToShow = 1.5;
        } else if (resolution < 490 && resolution > 420) {
            slidesToShow = 1.25;
        } else {
            slidesToShow = 1.15;
        }
        return slidesToShow;
    };

    const getBreakpoints = (): any => {
        const breakpoints: any = {
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
        };
        if (!slidesToShow) {
            return breakpoints;
        }
        return null;
    };
    return (
        <div className="mt-8 flex-col items-center justify-center gap-3 w-full">
            <h4 className="text-4xl  font-bold w-fit border-b-2 border-[#53aa42] py-2">
                {title}
            </h4>
            {anime ? (
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    slidesPerView={slidesToShow ? checkResolution() : 5}
                    freeMode={true}
                    grabCursor={true}
                    modules={[Pagination, FreeMode]}
                    breakpoints={getBreakpoints()}
                >
                    {data}

                    {viewMoreHref && (
                        <SwiperSlide key={viewMoreHref}>
                            <Anime href={viewMoreHref} />
                        </SwiperSlide>
                    )}
                </Swiper>
            ) : (
                <h4 className="text-white">Пусто...</h4>
            )}
        </div>
    );
};
export default Section;
