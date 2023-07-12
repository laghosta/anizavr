"use client";
import { Link } from "@/utils/Link";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useLoginModal } from "@/hooks/useModal";
import { useAuth } from "@/hooks/useAuth";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
const LoginModal = () => {
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const loginModal = useLoginModal();
    const isLogged = useAuth((state) => state.isLogged);
    const login = useAuth((state) => state.login);

    const ref = useRef(null);

    const onSubmitLogin = async (values: z.infer<typeof LoginSchema>) => {
        console.log(JSON.stringify(values));

        try {
            setLoading(true);
            const res = await fetch(`${Link}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => res.text());
            localStorage.setItem("JWT", res);
            login();
        } finally {
            setLoading(false);
        }
    };
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    useEffect(() => {
        if (isLogged) {
            loginModal.onClose();
        }
    }, [isLogged]);
    useEffect(() => {
        window.onclick = (event: any) => {
            if (
                event.target.contains(ref.current) &&
                event.target !== ref.current
            ) {
                loginModal.onClose();
            }
        };
    }, []);
    return (
        <Modal>
            <div
                ref={ref}
                className="flex border-2 border-[#43aa52] bg-black rounded-2xl flex-col px-[45px] py-10"
            >
                <h1 className="text-center font-bold text-3xl mb-4">Вход</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitLogin)}
                        className="flex flex-col gap-4 "
                    >
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Електронная почта</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder={
                                                "narutouzumaki@anizavr.me"
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={
                                                isPasswordVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            disabled={loading}
                                            placeholder={"Пароль"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div
                                        onClick={() =>
                                            setIsPasswordVisible(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute top-[31px] right-[10px]"
                                    >
                                        {!isPasswordVisible ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                {" "}
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />{" "}
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />{" "}
                                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />{" "}
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                {" "}
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                                            </svg>
                                        )}
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 gap-5 flex items-center justify-center w-full">
                            <Button
                                type="submit"
                                disabled={loading}
                                variant={"default"}
                                className="bg-[#43aa52] border-2 transition border-white hover:bg-[#32a844] hover:scale-[105%]"
                            >
                                Войти
                            </Button>
                            <Button
                                onClick={loginModal.onClose}
                                className="bg-transparent hover:bg-transparent hover:border-[#43aa52] hover:text-[#43aa52]"
                                disabled={loading}
                                variant={"outline"}
                            >
                                Отмена
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};
export default LoginModal;
