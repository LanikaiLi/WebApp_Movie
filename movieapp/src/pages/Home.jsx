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
  
  

    const handleSearch = async (e) => {
        e.preventDefault(); // by default, the submit button will always refresh the page which means user's typed search query will be cleared after they clicked search, and we don't want that to happen
        if (!searchQuery.trim()) return // this is to prevent users from typing empty string or spaces when searching
        if (loading) return // this is to prevent users from searching while the screen is still loading
    
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null) // this is to refresh the error state, if last time there is an error and this time it works fine, we need to clear the error
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
      };

    return (
        <div className = "home">
            <form onSubmit={handleSearch} className="search-form">
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
                <div className = "loading">Loading...</div>
            ): (
                <div className = "movies-grid">
                {movies.map(
                    (movie) => 
                    movie.title.toLowerCase().startsWith(searchQuery) && // this is to search for the popular movies that starts with 's', it is different than what the 'handlesearch' function does, what handle search does is to return all movies contains 's' - not only popular ones
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