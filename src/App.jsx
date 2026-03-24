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
import PaginationAPI from './Pagination/PaginationAPI'
import { Toaster } from 'sonner'
import NumberPagination from './Pagination/NumberPagination'
import DebounceEx from './Debounce/DebounceEx'
import LiveSearchAPI from './Debounce/LiveSearchAPI'
import DebounceFormSave from './Debounce/DebounceFormSave'
import NoteApp from './contextAPI/NoteApp'
import NoteSkeleton from './contextAPI/Docs/NoteSkeleton'
import UpDown from './Coding Challenge/upDown'
import AdvTodo from './Practice folder/AdvTodo'


function App() {

  return (
      <div>
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

          {/* Pagination 1st Exampeple */}
          {/* <Route path='/item' element={<Navigate to="/item/1" replace />} />
        <Route path='/item/:page' element={<Item />} /> */}

          {/* Pagination 2nd Exampeple */}
          <Route path='/products' element={<Navigate to={"/products/1"} replace />} />
          <Route path='/products/:page' element={<PaginationAPI />} />

         <Route path='/numberPage' element={<NumberPagination />} />

         <Route path='/debounce' element={<NoteApp />} />
         <Route path='/up' element={<AdvTodo />} />

        </Routes>


        <Toaster richColors position="top-right" />
      </div>
    
  )
}

export default App;
