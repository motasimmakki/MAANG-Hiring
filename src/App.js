import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Filter from './components/Filter';
import './components/Filter.css';
import List from './components/List';
import './components/List.css';
import Footer from './components/Footer';
import data from '../src/data.json';
import { useState } from 'react';

function App() {
  const [viewableData, setViewableData] = useState(data);
  const [isFiltered, setIsFiltered] = useState(false);
  const [themeMode, toggleThemeMode] = useState("light");
  function updateData(newData) {
    setViewableData(newData);
  }
  function updateFilterStatus() {
    setIsFiltered(true);
  }
  function updateThemeMode() {
    if(themeMode === "light") {
      toggleThemeMode("dark");
    } else {
      toggleThemeMode("light");
    }
    // console.log(themeMode);
  }
  return (
    <div className="App">
      <div className="container" onChange={updateThemeMode}>
        <input type="checkbox" id="toggle" className="toggle-input"></input>
        <label for="toggle" className="toggle-label">
          <span className="label-text-left">Dark</span>
          <span className="toggle-slider"></span>
          <span className="label-text-right">Light</span>
        </label>
      </div>

      <Navbar />
      <Filter filteredData={viewableData} filterData={updateData} filterStatus={updateFilterStatus} />
      <List data={viewableData} filterStatus={isFiltered} themeMode={themeMode}/>
      <Footer />
    </div>
  );
}

export default App;
