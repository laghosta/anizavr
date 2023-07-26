"use client";
import React, { useEffect, useState } from "react";
import { CommentDto } from "@/utils/AnimeApi";
import Comment from "./Comment";
import {header} from '@/utils/Header'
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Link } from "@/utils/Link";
import { useAuth } from "@/hooks/useAuth";
import {customFetch} from "@/utils/fetch";

interface CommentsBlockProps {
    animeId: number;
}

const CommentSchema = z.object({
    value: z.string().max(100),
});

const CommentsBlock: React.FC<CommentsBlockProps> = ({ animeId }) => {
    const [mounted, setMounted] = useState(false);
    const [comments, setComments] = useState<CommentDto[]>();
    const isLogged = useAuth((state) => state.isLogged);
    const [value, setValue] = useState("");
    const { reset } = useForm<z.infer<typeof CommentSchema>>();
    const [changed, setChanged] = useState(false)
    const getComments = async () => {
        const res = await customFetch(`api/users/getComments/${animeId}`, "GET").then(res => res.json())
        setComments(res)
    };

    const onSendComment = () => {
        if (!value.trim()) {
            return 0;
        }
        setValue("");
        fetch(`${Link}/api/users/addComment`, {
            method: "POST",
            body: JSON.stringify({
                animeId: Number(animeId),
                text: value,
            }),
            headers : {...header}
        }).then(() => getComments());
    };

    useEffect(() => {
        getComments();
        setMounted(true);
    }, []);
    useEffect(() => {
        getComments();
    }, [changed])
    return (
        <div className="w-full mt-5">
            <h4 className="text-center text-3xl font-bold mb-5">Комментарии</h4>
            <div className="flex flex-col items-start gap-3">
                {comments &&
                    comments.map((el, id) => (
                        <Comment
                            key={id}
                            id={el.id!}
                            changeAction={setChanged}
                            change={changed}
                            author={el.author!}
                            text={el.text!}
                            avatar={el.author?.avatarUrl!}
                            username={el.author?.username!}
                        />
                    ))}
                <div className="w-full mb-10 gap-3 flex items-center ">
                    <input
                        className="w-full px-3 py-2 bg-transparent border-2 outline-0 border-[#43aa53] rounded-md focus:border-[#43aa53] focus:outline-0"
                        type="text"
                        value={value}
                        placeholder="Чиииинаааа"
                        onChange={(event) => setValue(event.target.value)}
                    />
                    <Button
                        onClick={onSendComment}
                        variant={"default"}
                        className="border-2 border-[#43aa53] bg-transparent hover:scale-[105%]"
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default CommentsBlock;
