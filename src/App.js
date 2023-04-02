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
  function updateData(newData) {
    setViewableData(newData);
  }
  function updateFilterStatus(){
    setIsFiltered(true);
  }
  return (
    <div className="App">
      <Navbar/>
      <Filter filteredData={viewableData} filterData={updateData} filterStatus={updateFilterStatus}/>
      <List data={viewableData} filterStatus={isFiltered}/>
      <Footer/>
    </div>
  );
}

export default App;
