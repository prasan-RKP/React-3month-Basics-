import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './projects/todos/Todo'
import ShopHomepage from './projects/Mini E-Com/ShopHomepage'
import AddToCart from './projects/Mini E-Com/assets/AddToCart'
import {Routes, Route, Navigate} from 'react-router-dom';
import PassGen from './projects/PassGenerator/PassGen'
import LiftUp from './projects/LiftingUP/LiftUp'

function App() {

  return (
    <>
    {/* <ShopHomepage /> */}
    {/* <AddToCart /> */}
    {/* <PassGen /> */}
    <LiftUp />
    </>
  )
}

export default App;
