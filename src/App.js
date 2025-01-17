import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import PizzaDetails from './pages/PizzaDetails/PizzaDetails';
import Search from './pages/Search/Search';

import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, fetchCart } from './redux/slices/cartSlice';
import { useEffect } from 'react';

function App() {
    const x = [1,2,3];
    const y = [4,5,6]
    console.log(typeof null !== 'object')
    const dispatch = useDispatch()
    const cart = useSelector(selectCart);
    useEffect(() => {
        dispatch(fetchCart())
    }, [])
    console.log(cart)
    return (
        <div className="app">
            <ScrollToTop />
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="/pizza/:id" element={<PizzaDetails />} />
                    <Route path="/search/:title" element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
