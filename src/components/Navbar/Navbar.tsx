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
                    <div className="sticky rounded-b-lg top-0 left-0 w-full h-[100px] bg-[#43aa52] flex items-center justify-between px-10 gap-4 z-30 xl:h-[100px] lg:h-[80px] ">
                        <Link href={"/"}>
                            <Image
                                className="xl:w-[500px] xl:h-[80px] lg:h-[60px] w-[450px] select-none transition hover:scale-[102%] active:scale-[98%]"
                                width={500}
                                height={80}
                                src={"/images/logo.png"}
                                alt="lalal"
                            />
                        </Link>
                        <NavbarSearchForm />

                        <ul className="flex h-full items-center gap-4">
                            <li>
                                <Link href={"/anime"}>Топ</Link>
                            </li>
                            <li>
                                <Link href={"/anime/genres"}>Категории</Link>
                            </li>
                            {!user ? (
                                <>
                                    <li className="hover: cursor-pointer ">
                                        <Button
                                            onClick={loginModal.onOpen}
                                            className="bg-transparent border-2 transition border-white hover:bg-white/20 hover:scale-[105%]"
                                            variant={"default"}
                                        >
                                            Войти
                                        </Button>
                                    </li>
                                    <li className="hover: cursor-pointer">
                                        <Button
                                            onClick={registerModal.onOpen}
                                            className="bg-transparent border-2 transition border-white hover:bg-white/20 hover:scale-[105%]"
                                            variant={"default"}
                                        >
                                            Зарегистрироваться
                                        </Button>
                                    </li>
                                </>
                            ) : (
                                <li className="hover: cursor-pointer hover:scale-[105%]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="border-white border-2">
                                                <AvatarImage src="/images/avatar.jpg" />
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48 mr-10 mt-2">
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
