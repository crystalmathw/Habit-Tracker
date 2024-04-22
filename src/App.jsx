import { useState } from 'react';
import './App.css'
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"

export default function App() {
  
  return (
    <main>
      <Header />
      <div className='container'>
        <Sidebar />
        <div className="main">
          
        </div>
      </div>
      <Footer />
    </main>
  )
}
