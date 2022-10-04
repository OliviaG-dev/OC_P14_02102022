
import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from '../error404/Error404';
import Home from '../../pages/home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
