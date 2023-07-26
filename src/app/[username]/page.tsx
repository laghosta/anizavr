"use client";
import React, {useEffect, useState} from "react";
import {redirect, useParams} from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNavbar } from "@/hooks/useNavbar";
import WatchingHistoryBlock from "@/components/WatchingHistory/WatchingHistoryBlock";
import TierList from "@/components/TierList/TierList";
import {customFetch} from "@/utils/fetch";
import {AnimePreview, Image, TierlistAnime, UserDto} from "@/utils/AnimeApi";
import Error from "@/app/[username]/Error";
import Section from "@/components/Section/Section";
import {useAnimeWishlistUpdate} from "@/hooks/useAnimeWishlistUpdate";
import {useUser} from "@/hooks/useUser";
import {useTierlist} from "@/hooks/useTierlist";
import Loader from "@/components/Loader/Loader";
const Profile = () => {
    const isLogged = useAuth((state) => state.isLogged);
    const isNavbarMounted = useNavbar((state) => state.mounted);
    const params = useParams()
    const {setUser} = useUser()
    const [user, setUserDto] = useState<UserDto | null>()
    const [isLoading, setIsLoading] = useState(true)
    const [wishlistAnime, setWishlistAnime] = useState<AnimePreview[]>()
    const {updated} = useAnimeWishlistUpdate()
    const {tierlistAction} = useTierlist()
    const [tierlist, setTierlist] = useState<TierlistAnime[]>()
    useEffect(() => {
        getUser()
    }, []);

    useEffect(() => {
        getUser()
    }, [updated,tierlistAction])
    useEffect(() => {
        if(user){
            setWishlist()
            setTierlist(user.tierlist)
        }
    }, [user?.wishlist, user?.tierlist])
    const getUser = async() => {
        const user = await customFetch(`api/users/getUser/${params.username}`, "GET")
        const errorCode = user.status === 200 ? false : user.status
        if(!errorCode){
            const json = await user.json()
            setUserDto(json)
            setIsLoading(false)
        }
        else{
            setUserDto(null)
            setIsLoading(false)
        }
    }
    const setWishlist = () => {
        const data = user?.wishlist
        if(!data){return 0}
        const temp:AnimePreview[] = []
        data.forEach((el) => {
            const image = new Image()
            image.original = el.posterUrl!;
            const anime = {
                id:el.animeId!,
                name:undefined,
                russian:el.title!,
                image:image!,
                url:undefined,
                kind:el.kind,
                score:el.rating!.toString()!,
                status:undefined,
                airedOn:undefined,
                releasedOn:undefined,
                episodes: el.episodesTotal,
                episodesAired : el.episodesTotal
            }
            const animePrev = new AnimePreview(anime)
            temp.push(animePrev)
        })
        setWishlistAnime(temp)
    }
    const renderData = () => {
        if(isLoading){
            return <Loader/>
        }
        else{
            if(!user){
                return <Error/>
            }
            else{
                return <div className="xl:px-[50px] lg:px-[40px] md:px-[30px] sm:px-[40px] mt-10 watchingHistoryWrapper">
                    <WatchingHistoryBlock watchingHistory={user.currentlyWatchingAnime!}/>
                    <TierList anime={tierlist}/>
                    <Section inWishList={true} title="Хочу посмотреть" anime={wishlistAnime}/>
                </div>
            }
        }
    }

    return (
        <>
        {renderData()}
        </>
    )

};
export default Profile;
