import React from "react";
import "./Image.css";

function Image({ url, title, setShow, setUrl }) {
    return (
        <div
            className="image"
            onClick={(e) => {
                setShow(true);
                setUrl(url);
            }}
        >
            <img src={url && url} alt="" />

            {title && (
                <div className="image__content">
                    <p>{title}</p>
                </div>
            )}
        </div>
    );
}

export default Image;
