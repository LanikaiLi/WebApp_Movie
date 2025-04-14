import MovieCard from "../components/MovieCard";
import {useState} from "react";
import "../css/Home.css"

function Home () {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {id:1, title: "Lily", release_date: "2020"},
        {id:2, title: "The Science", release_date: "2021"},
        {id:1, title: "Dream", release_date: "2023"}
    ];

    const handleSearch = (e) => {
        e.preventDefault() // by default, the submit button will always refresh the page which means user's typed search query will be cleared after they clicked search, and we don't want that to happen
        alert(searchQuery)
    };

    return (
        <div className = "home">
            <form onSubmit={handleSearch} className="search-fomr">
                <input 
                type = "text"
                placeholder="Search for movies..."
                className="search-input"
                value = {searchQuery}
                onChange = {(e) => setSearchQuery(e.target.value)} // takes user's input search query and set it as the current value of the searchquery state
                >
                </input>
                <button type = "submit" className="search-button">Search</button>
            </form>
            <div className = "movies-grid">
                {movies.map(
                    (movie) => 
                    movie.title.toLowerCase().startsWith(searchQuery) &&
                    // dynamic rendering based on value passed into the functional component
                    (<MovieCard movie = {movie} key = {movie.id}></MovieCard>) //Note that for dynamic rendering, it is compulsory to always add a key input parameter no matter if it exist in original function
                    )   
                }
            </div>
        </div>
    );
}

export default Home