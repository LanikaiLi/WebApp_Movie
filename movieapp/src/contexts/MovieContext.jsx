import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext) // if you hover over useContext, you will be able to see that it returns the current context value, here, it will return movie context's value which are: isFavorite, addToFavorites, removeFromFavorites,..

export const MovieProvider = ({children}) => { // since movie provider returns component, movie provider is a functional component, so when it is used, it will be directly used as a component (<...>) instead of called as 'XXX()'
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs ? JSON.parse(storedFavs) : []
    })

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
      }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]) //... means append, prev is just Favorites, so this means Favorites = Favorites.append(movie)
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId)) // prev is just Favorites
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = { // pass all these functions as a value attribute to the context provider, then all the children of this context will be able to access the context
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}> 
        {children} 
    </MovieContext.Provider>
}