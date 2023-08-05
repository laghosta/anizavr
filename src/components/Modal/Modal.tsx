'use client'
import React, { useEffect, useRef } from "react";

interface ModalProps {
    children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ children }) => {

    const  preventScroll = (e:any) => {
        const event  = e as WheelEvent
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    useEffect(() => {
        document.addEventListener('wheel', preventScroll, {passive: false});
        return () => document.removeEventListener('wheel', preventScroll);
    }, [] )
    return (
        <div className="w-screen h-screen bg-black/80 fixed z-50 top-0 left-0 flex items-center justify-center">
            {children}
        </div>
    );
};
export default Modal;
