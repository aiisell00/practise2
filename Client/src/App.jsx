import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import FavoritesPage from './pages/FavoritesPage'
import BasketPage from './pages/BasketPage'
import AddProductPage from './pages/AddProductPage'
import ProductDetails from './pages/ProductDetailsPage'
import Header from './layouts/Header'
import Footer from './layouts/Footer'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/favorites' element={<FavoritesPage/>} />
      <Route path='/basket' element={<BasketPage/>} />
      <Route path='/addproduct' element={<AddProductPage/>} />
      <Route path='/productdetails' element={<ProductDetails/>} />
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
