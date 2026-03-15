import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import ShopHomepage from './projects/Mini E-Com/ShopHomepage'
import AddToCart from './projects/Mini E-Com/assets/AddToCart'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import PassGen from './projects/PassGenerator/PassGen'
import LiftUp from './projects/LiftingUP/LiftUp'
import MyWeather from './projects/API projects/WeatherAPI/MyWeather'
import MovieSearch from './projects/API projects/Movie API/MovieSearch'
import MyTodo from './projects/todos/MyTodo'
import Item from './Pagination/Item'
import HomePage from './HomePage'
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
      {/* <MyTodo /> */}
      {/* <NewTodo /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/item' element={<Navigate to="/item/1" replace />} />
        <Route path='/item/:page' element={<Item />} />
      </Routes>

    </>
  )
}

export default App;
