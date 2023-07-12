"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SearchModal from "../SearchModal/SearchModal";
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
import {
    useLoginModal,
    useRegisterModal,
    useSearchModal,
} from "@/hooks/useModal";

export const Navbar = () => {
    const searchModal = useSearchModal();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { isLogged, logout, login } = useAuth();
    const { mounted, mount } = useNavbar();

    const onClickSearch = () => {
        searchModal.onOpen();
    };

    useEffect(() => {
        mount();
    }, []);
    useEffect(() => {
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
                login();
            }
        }
    }, []);
    return (
        <>
            {mounted && (
                <>
                    <div className="sticky rounded-b-lg top-0 left-0 w-full h-[100px] bg-[#43aa52] flex items-center justify-between px-10 gap-4 shadow-lg shadow-[#43aa52] z-30 xl:h-[100px] lg:h-[80px] ">
                        <Link href={"/"}>
                            <Image
                                className="xl:w-[500px] xl:h-[80px] lg:h-[60px] w-[450px]"
                                width={500}
                                height={80}
                                src={"/images/logo.png"}
                                alt="lalal"
                            />
                        </Link>
                        <Button
                            onClick={onClickSearch}
                            className="ml-auto flex justify-between items-center w-[200px] h-[50px] bg-transparent transition-all ease-linear border-b-2 hover:bg-white/20   text-white border-white  hover:scale-[102%] "
                        >
                            <span>Поиск аниме...</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fff"
                                viewBox="0 0 50 50"
                                width="25px"
                                height="25px"
                            >
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                            </svg>
                        </Button>
                        <ul className="flex h-full items-center gap-4">
                            <li>
                                <Link href={"/anime"}>Топ</Link>
                            </li>
                            <li>
                                <Link href={"/categories"}>Категории</Link>
                            </li>
                            {!isLogged ? (
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
                                                {!isLogged ? (
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
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                logout()
                                                            }
                                                        >
                                                            Выйти
                                                        </DropdownMenuItem>
                                                        <Link href={"/profile"}>
                                                            <DropdownMenuItem>
                                                                Профиль
                                                            </DropdownMenuItem>
                                                        </Link>
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
