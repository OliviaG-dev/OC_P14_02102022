
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Error404 from '../error404/Error404';
import Home from '../../pages/home/Home';
import ArrayEmployee from '../../pages/arrayEmployee/ArrayEmployee';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/employees-list' element={<ArrayEmployee />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
