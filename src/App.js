import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Filter from './components/Filter';
import './components/Filter.css';
import List from './components/List';
import './components/List.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Filter/>
      <List/>
      <Footer/>
    </div>
  );
}

export default App;
