import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import DiabeticChartApp from '../src/Components/DiabeticChartApp'


function App() {
  console.log('app!!!!!!!!!!!!!!!!!!!');
  return (
    <div className="App">
         {/*<Counter/>*/}
         <DiabeticChartApp/>
      </div>
  );
}

export default App;
