import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home'
import Places from './components/Places'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/places' element={<Places />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

