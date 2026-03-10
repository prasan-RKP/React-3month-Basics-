import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import ShopHomepage from './projects/Mini E-Com/ShopHomepage'
import AddToCart from './projects/Mini E-Com/assets/AddToCart'
import {Routes, Route, Navigate} from 'react-router-dom';
import PassGen from './projects/PassGenerator/PassGen'
import LiftUp from './projects/LiftingUP/LiftUp'
import MyWeather from './projects/API projects/WeatherAPI/MyWeather'
import MovieSearch from './projects/API projects/Movie API/MovieSearch'
import MyTodo from './projects/todos/MyTodo'
//import NewTodo from './projects/todos/NewTodo'


function App() {

  return (
    <>
    {/* <ShopHomepage /> */}
    {/* <AddToCart /> */}
    {/* <PassGen /> */}
    {/* <LiftUp /> */}
     {/* <MyWeather /> */}
     {/* <MovieSearch /> */}
     <MyTodo />
     {/* <NewTodo /> */}
    </>
  )
}

export default App;
