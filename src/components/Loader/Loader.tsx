'use client'
import React from 'react';
import './styles.css'
import Image from 'next/image'
import {useLoading} from "@/hooks/useLoading";
const Loader = () => {
    const {loading} = useLoading()
    return (
        <div style={{display:`${loading ? "flex" : "none"}`}} className="wrapper">
            <div className="content">
                    <img draggable={false} className="paw" src='/images/paw.png' alt="loading image" width={100} height={100}/>
            </div>
        </div>
    );
};

export default Loader;