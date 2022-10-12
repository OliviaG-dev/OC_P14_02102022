
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Error404 from '../error404/Error404';
import Home from '../../pages/home/Home';
import ArrayEmployee from '../../pages/arrayEmployee/ArrayEmployee';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/employees-list' element={<ArrayEmployee />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
