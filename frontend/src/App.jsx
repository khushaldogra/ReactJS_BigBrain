import React from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import StoreProvider from './store';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Header />
        <Navigation />
      </StoreProvider>
    </div>
  );
}

export default App;
