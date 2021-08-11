import React from "react";
import { Modal, ModalBody } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalImage({ show, setShow, url, title }) {
    const handleHide = () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Body>
                <button
                    className="btn btn-danger close-btn"
                    onClick={handleHide}
                >
                    x
                </button>
                <img
                    src={url && url}
                    alt=""
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalImage;
