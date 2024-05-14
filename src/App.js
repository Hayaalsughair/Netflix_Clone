import { Routes, Route } from 'react-router-dom';
import NavBar from './component/navBar/NavBar';
import Home from "../src/component/home/Home";
import FavMovie from './component/favMovie/FavMovie';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <>
  <NavBar/>
   <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="favMovies" element= {<FavMovie/>}></Route>
   </Routes>
   </>
  );
}

export default App;
