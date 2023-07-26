'use client'
import React from "react";
import Image from "next/image";
import { Link as ApiLink } from "@/utils/Link";
import Link from "next/link";
import {useUser} from "@/hooks/useUser";
import {CommentAuthorDto} from "@/utils/AnimeApi";
import {customFetch} from "@/utils/fetch";
interface CommentProps {
    text: string;
    id:string;
    avatar: string;
    username: string;
    author : CommentAuthorDto
    changeAction:(agr:boolean) => void
    change : boolean
}
const Comment: React.FC<CommentProps> = ({ text, avatar, username,author, id,change, changeAction }) => {
    const {user} = useUser()
    const deleteComment = async() => {
        const res = await customFetch(`api/users/deleteComment/${id}`, "DELETE")
        changeAction(!change)
    }
    return (
        <div className="w-full border-2 border-[#43aa52] relative rounded-xl px-5 py-3 flex flex-col items-start gap-2 ">
            <Link
                href={`/${username}`}
                className="w-full flex gap-1 items-center max-w-[20%] overflow-x-hidden opacity-80"
            >
                <img
                    loading="lazy"
                    src={avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full"
                />
                {username}
            </Link>
            <p>{text}</p>
            {
                user?.id === author.id ?
                <div onClick={deleteComment} className="absolute top-[50%] cursor-pointer rounded-full right-5 translate-y-[-50%] w-[30px] h-[30px] opacity-50 transition-all hover:opacity-100  hover:scale-[105%]  hover:rotate-[90deg]">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 50 50">
                        <circle style={{fill:"#D75A4A"}} cx="25" cy="25" r="25"/>
                        <polyline style={{fill:"none", stroke:"#FFFFFF", strokeWidth:2, strokeLinecap:"round", strokeMiterlimit:10}} points="16,34 25,25 34,16"/>
                        <polyline style={{fill:"none", stroke:"#FFFFFF", strokeWidth:2, strokeLinecap:"round", strokeMiterlimit:10}} points="16,16 25,25 34,34"/>
                    </svg>
                </div>
                : null
            }

        </div>
    );
};
export default Comment;
