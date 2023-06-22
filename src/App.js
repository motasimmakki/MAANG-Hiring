import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Filter from './components/Filter';
import './components/Filter.css';
import List from './components/List';
import './components/List.css';
import Footer from './components/Footer';
import data from '../src/data.json';
import { useState, useEffect } from 'react';

function App() {
  const [viewableData, setViewableData] = useState(data);
  const [themeMode, toggleThemeMode] = useState(localStorage.getItem("themeMode") || "light");
  function updateData(newData) {
    setViewableData(newData);
  }
  function updateThemeMode() {
    if(themeMode === "light") {
      toggleThemeMode("dark");
    } else {
      toggleThemeMode("light");
    }
    // console.log(themeMode);
  }
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode])
  return (
    <div className="App">
      <div className="container" onChange={updateThemeMode}>
        {  
        (themeMode === "light")?
          <input type="checkbox" id="toggle" className="toggle-input"></input>
        :
          <input type="checkbox" id="toggle" className="toggle-input" checked></input>
        }
        <label for="toggle" className="toggle-label">
          <span className="label-text-left">Dark</span>
          <span className="toggle-slider"></span>
          <span className="label-text-right">Light</span>
        </label>
      </div>

      <Navbar />
      <Filter filteredData={viewableData} filterData={updateData}/>
      <List data={viewableData} themeMode={themeMode}/>
      <Footer />
    </div>
  );
}

export default App;
