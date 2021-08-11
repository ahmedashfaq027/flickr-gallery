import React, { useState } from "react";
import "./Gallery.css";
import Image from "./Image";
import ModalImage from "./ModalImage";

function Gallery({ photos }) {
    console.log(photos);
    const [size, setSize] = useState("b");
    const [showImage, setShowImage] = useState(false);
    const [showUrl, setShowUrl] = useState("");

    const buildImageUrl = (img) => {
        return `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`;
    };

    return (
        <>
            <div className="gallery">
                {photos?.map((pic, index) => (
                    <Image
                        key={index}
                        title={pic?.title}
                        url={buildImageUrl(pic)}
                        setShow={setShowImage}
                        setUrl={setShowUrl}
                    />
                ))}
            </div>
            <ModalImage show={showImage} setShow={setShowImage} url={showUrl} />
        </>
    );
}

export default Gallery;
