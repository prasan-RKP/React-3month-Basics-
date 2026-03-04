import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './projects/todos/Todo'
import ShopHomepage from './projects/Mini E-Com/ShopHomepage'
import AddToCart from './projects/Mini E-Com/assets/AddToCart'
import {Routes, Route, Navigate} from 'react-router-dom';

function App() {

  return (
    <>
    <ShopHomepage />
    {/* <AddToCart /> */}
    </>
  )
}

export default App;
