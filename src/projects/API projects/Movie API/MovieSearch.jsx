import React, { useState } from 'react'
//import "../stylesheets/movie.css";

const MovieSearch = () => {

    let [name, setName] = useState("");
    let [movieName, setMovieName] = useState("");
    let [movieRating, setMovieRating] = useState("");
    let [movieGenre, setMovieGenre] = useState([]);
    let [movieReleaseDate, setMovieReleaseDate] = useState("");
    let [movieDuration, setMovieDuration] = useState("");
    let [moviePlot, setMoviePlot] = useState("");
    let [moviePoster, setMoviePoster] = useState("");
    let [loading, setLoading] = useState(false);
    const [data, setData] = useState("");

    const APIKey = "17f8307a";

    const searchMovie = async (filmName) => {
        setLoading(true);
        try {
            let res = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${filmName}`);

            if (res.status === 404) {
                alert("Movie Not Found");
                setLoading(false);
                setName("");
                return;
            }

            let data = await res.json();
            setData(data);
            setMovieName(data?.Title);
            setMovieDuration(data?.Runtime);
            setMoviePoster(data?.Poster);
            setMovieGenre(data?.Genre?.split(","));
            setMoviePlot(data?.Plot);
            setMovieRating(data?.Ratings[0]?.Value);
            setMovieReleaseDate(data?.Released);
            setName("");

        } catch (error) {
            console.log("Error inside the method", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    console.log("Movie Data", data);

    return (
        <div>
            <div className="container">
                <nav>
                    <div className="logo">
                        <h1>Movie's</h1>
                    </div>

                    <div className="searchBar">
                        <input onChange={(e) => setName(e.target.value)} type="text" id="searchInput" placeholder="Search Here...." />
                        <button
                            id="searchBtn"
                            onClick={() => searchMovie(name)}>{loading ? "Searching..." : "Search"}</button>
                    </div>
                </nav>
            </div>

            {data ? (<><div className="card-container">
                <div className="card">
                    <div className="movie-img">
                        {moviePoster && <img src={moviePoster} id="movieImage" width={235} alt="Movie poster" />}
                    </div>

                    <div className="right-movie-text">
                        <h2 className="movie-name">
                            <span className="name">{movieName}</span>
                        </h2>
                        <p className="movie-rating">Rating: <span className="rating">{movieRating}</span></p>
                        {movieGenre.map((genre, index) => {
                            return <p key={index} className="movie-genre">
                                <span className="genre">{genre}</span>
                            </p>
                        }
                        )}
                        <p className="movie-releaseDate">Released: <span className="releaseDate">{movieReleaseDate}</span></p>
                        <p className="movie-duration">Duration: <span className="duration">{movieDuration}</span></p>
                        <p className="movie-plot">
                            Plot: &nbsp;
                            <span className="plot">
                                {moviePlot ? moviePlot : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate."}
                            </span>
                        </p>
                    </div>
                </div>
            </div></>) : (<><div className="no-result">
                <div className="not-found">
                    <h2 className="no-heading">Movies not Found ....</h2>
                    <img src="notfound.png" alt="No movies found" />
                </div>
            </div></>)}




        </div>
    )
}

export default MovieSearch;