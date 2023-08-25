import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
      <Footer/>
    </div>
  );
}

export default App;
