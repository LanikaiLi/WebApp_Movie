import './css/App.css'
import MovieCard from './components/MovieCard'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom" // you need this to use router
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

function App() { // this is a component
  return (
    <MovieProvider>
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path = "/" element = {<Home />}></Route>
          <Route path = "/favorites" element = {<Favorites />}></Route>
        </Routes>
      </main>
    </MovieProvider>
  );
}


export default App;


//things below can be put into the function app body, just for study purpose
//<MovieCard movie = {{title:"Lily", release_date:"2024"}} />

//function Text({display}) {
  //return <div>
    //<p>{display}</p>
  //</div>
//}
