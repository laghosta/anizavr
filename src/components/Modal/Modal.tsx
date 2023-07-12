import React, { useEffect, useRef } from "react";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    return (
        <div className="w-screen h-screen bg-black/80 fixed z-50 top-0 left-0 flex items-center justify-center">
            <>{children}</>
        </div>
    );
};
export default Modal;
