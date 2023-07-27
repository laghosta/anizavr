import React from 'react';
import './styles.css'
import Image from 'next/image'
const Loader = () => {
    return (
        <div className="wrapper">
            <div className="content">
                    <Image draggable={false} className="paw" src='/images/paw.png' alt="loading image" width={100} height={100}/>
            </div>
        </div>
    );
};

export default Loader;