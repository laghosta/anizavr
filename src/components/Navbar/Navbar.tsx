"use client";
import Link from "next/link";
import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchModal from "../Search/SearchModal";
import { useNavbar } from "@/hooks/useNavbar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RegisterModal from "../Modal/RegisterModal";
import LoginModal from "../Modal/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

import {
    useLoginModal,
    useRegisterModal,
    useSearchModal,
} from "@/hooks/useModal";
import NavbarSearchForm from "@/components/Search/NavbarSearchForm";
import {customFetch} from "@/utils/fetch";
import {UserDto} from "@/utils/AnimeApi";
import {useWishlist} from "@/hooks/useWishlist";
import {useUser} from "@/hooks/useUser";

export const Navbar = () => {
    const searchModal = useSearchModal();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { setUser, removeUser } = useUser();
    const user = useUser(state => state.user)
    const removeWishlist = useWishlist(state => state.removeWishlist)
    const setWishlist = useWishlist(state => state.setWishlist)
    const wishlist = useWishlist((state) => state.wishlist)
    const { mounted, mount } = useNavbar();
    const [username, setUsername] = useState<UserDto>()

    const getCurrentUser = useCallback(async() => {
        const res = await customFetch('api/users/getCurrentUser', "GET")
        const user = await res.json()
        return user
    }, [])

    useEffect(() => {
        mount();
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                searchModal.onClose();
                loginModal.onClose();
                registerModal.onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    useEffect(() => {
        if (!mounted) {
            if (localStorage.getItem("JWT")) {
                (async function () {
                    const res = await getCurrentUser()
                    if(res){
                        setUsername(res.username)
                        setUser(res)
                        setWishlist(res.wishlist)

                    }
                    else{
                        removeUser()
                        removeWishlist()
                    }
                }());
            }
        }
    }, [user]);
    return (
        <>
            {mounted && (
                <>
                    <div className="sticky rounded-b-lg top-0 left-0 w-full h-[70px] xl:h-[100px] lg:h-[100px] md:h-[80px] sm:h-[70px] bg-[#43aa52] flex items-center justify-between px-2 gap-4 z-30  xl:px-10 lg:px-8 md:px-6 sm:px-4 ">
                        <Link href={"/"}>
                            {
                                window.innerWidth > 720 ?
                                    <Image
                                        className="xl:w-[500px] xl:h-[80px] lg:h-[60px] w-[450px] select-none transition hover:scale-[102%] active:scale-[98%]"
                                        width={500}
                                        height={80}
                                        src="/images/logo.png"
                                        alt="logo"
                                    />
                                    :
                                    <Image
                                        className="select-none transition hover:scale-[102%] active:scale-[98%]"
                                        width={60}
                                        height={60}
                                        src="/images/mini-logo.png"
                                        alt="logo"
                                    />
                            }

                        </Link>
                        <NavbarSearchForm />

                        <ul className="flex w-fit h-full items-center lg:gap-4 md:gap-3 sm:gap-2 gap-2">
                            <li>
                                <Link href={"/anime"}>Топ</Link>
                            </li>

                            {!user ? (
                                <ul className="h-fit justify-center py-5 flex flex-col gap-0 xl:gap-3 lg:gap-2 md:gap-2 sm:gap-0 items-center xl:flex-row lg:flex-row md:flex-row sm:flex-col">
                                    <li
                                        onClick={loginModal.onOpen}
                                        className=" text-center underline rounded-xl w-full h-fit bg-transparent  xl:px-5 xl:py-3 lg:px-4 lg:py-2 md:px-3 md:py-1 sm:px-2 sm:py-1  border-0 xl:borer-2 lg:border-2 md:border-2 sm:border-0 transition border-white hover:bg-white/20 hover:scale-[105%]"
                                    >
                                        Вход
                                    </li>
                                    <li
                                        onClick={registerModal.onOpen}
                                        className="text-center underline rounded-xl w-full h-fit bg-transparent  xl:px-5 xl:py-3 lg:px-4 lg:py-2 md:px-3 md:py-1 sm:px-2 sm:py-1  border-0 xl:borer-2 lg:border-2 md:border-2 sm:border-0 transition border-white hover:bg-white/20 hover:scale-[105%]"
                                    >
                                        Регистрация</li>
                                </ul>
                            ) : (
                                <li className="hover: cursor-pointer hover:scale-[105%]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="border-white border-2">
                                                <AvatarImage src="/images/avatar.jpg" />
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48 mr-3 mt-2 xl:mr-10 lg:mr-8 md:mr-6">
                                            {/* <DropdownMenuLabel>
                               Panel Position
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator /> */}
                                            <DropdownMenuGroup>
                                                {!user ? (
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                loginModal.onOpen();
                                                            }}
                                                        >
                                                            Войти
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                registerModal.onOpen();
                                                            }}
                                                        >
                                                            Зарегистрироваться
                                                        </DropdownMenuItem>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link href={`/${username}`}>
                                                            <DropdownMenuItem>
                                                                Профиль
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                localStorage.removeItem(
                                                                    "JWT"
                                                                );
                                                                removeUser();
                                                                removeWishlist()
                                                            }}
                                                        >
                                                            Выйти
                                                        </DropdownMenuItem>

                                                    </>
                                                )}
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            )}
                        </ul>
                    </div>
                    {searchModal.isOpen && <SearchModal />}
                    {registerModal.isOpen && <RegisterModal />}
                    {loginModal.isOpen && <LoginModal />}
                </>
            )}
        </>
    );
};
