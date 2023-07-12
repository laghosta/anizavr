"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useNavbar } from "@/hooks/useNavbar";

const Profile = () => {
    const isLogged = useAuth((state) => state.isLogged);
    const isNavbarMounted = useNavbar((state) => state.mounted);

    useEffect(() => {
        if (isNavbarMounted) {
            if (!isLogged) {
                redirect("/");
            }
        }
    }, [isNavbarMounted, isLogged]);
    return <div>Profile</div>;
};
export default Profile;
