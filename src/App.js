import { useEffect, useState } from "react";
import "./App.css";
import Gallery from "./Components/Gallery";
import axios from "axios";

function App() {
    const [search, setSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [loadImage, setLoadImage] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            let url;
            if (search && searchTerm) {
                url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d93302efafff22b55721f049b8f47cf2&tags=${searchTerm}&page=${page}&per_page=${perPage}&format=json&nojsoncallback=1`;
                console.log(url);
            } else {
                url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=d93302efafff22b55721f049b8f47cf2&page=${page}&per_page=${perPage}&format=json&nojsoncallback=1`;
            }

            const data = await axios
                .get(url)
                .then((response) => {
                    console.log(response);
                    return response.data?.photos;
                })
                .catch((err) => console.log(err));

            if (page !== 1) {
                setImages((prev) => [...prev, ...data.photo]);
            } else {
                setImages(data.photo);
            }
            setPage(page + 1);
            setLoadImage(false);
        };

        if (loadImage) {
            fetchImages();
        }
    }, [loadImage, search]);

    useEffect(() => {
        if (searchTerm === "") {
            setSearch(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const container = document.querySelector(".gallery");

            if (
                container.offsetHeight <=
                window.innerHeight + window.scrollY - 120
            ) {
                setLoadImage(true);
            }
        });
    }, []);

    return (
        <div className="app">
            <header>
                <h2 className="fw-bold">Gallery</h2>
            </header>
            <main>
                <form className="input-group mb-3 w-75">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter search term"
                        aria-label="Search"
                    />
                    <button
                        type="submit"
                        className="input-group-text btn btn-primary fw-bold"
                        onClick={(e) => {
                            e.preventDefault();
                            setLoadImage(true);
                            setSearch(true);
                            setPage(1);
                        }}
                    >
                        Search
                    </button>
                </form>
                <Gallery photos={images} />
            </main>
            <footer>
                <p>Made with ♡ by Ashfaq </p>
            </footer>
        </div>
    );
}

export default App;
