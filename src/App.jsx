import { useState } from 'react';
import './App.css'
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import Home from "./home"
import Habits from './habits';
import { Simulate } from 'react-dom/test-utils';

export default function App() {
  return (
    <main>
      <Header />
      <div className='container'>
        <Sidebar />
        <div className="main">
          <Habits />
        </div>
      </div>
      <Footer />
    </main>
  )
}
