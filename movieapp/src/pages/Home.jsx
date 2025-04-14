import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"

function Home () {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err); // this is to show you the log for debugging
          setError("Failed to load movies...");
        } finally {
          setLoading(false);
        }
      };
  
      loadPopularMovies();
    }, []);
  
  

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

            {error && <div className="error-message">{error}</div>} 

            {loading ? ( // the line above is for displaying the error message, this line is for displaying the loading status of the webpage
                <div className = "loadging">Loading...</div>
            ): (
                <div className = "movies-grid">
                {movies.map(
                    (movie) => 
                    movie.title.toLowerCase().startsWith(searchQuery) &&
                    // dynamic rendering based on value passed into the functional component
                    (<MovieCard movie = {movie} key = {movie.id}></MovieCard>) //Note that for dynamic rendering, it is compulsory to always add a key input parameter no matter if it exist in original function
                    )   
                }
            </div>
            )} 
        </div>
    );
}

export default Home

//  const movies = [
   // {id:1, title: "Lily", release_date: "2020"},
    //{id:2, title: "The Science", release_date: "2021"},
    //{id:1, title: "Dream", release_date: "2023"}
//];