import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import StoreProvider from './store';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <NavBar />
        <Navigation />
      </StoreProvider>
    </div>
  );
}

export default App;
