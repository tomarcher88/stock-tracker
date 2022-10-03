import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import {StockOverviewPage} from './pages/StockOverviewPage'
import {StockDetailPage} from './pages/StockDetailPage'
import './App.css'

export default function App() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverviewPage />} />
          <Route path='/details/:symbol' element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}