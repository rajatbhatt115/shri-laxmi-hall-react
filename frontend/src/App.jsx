import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import InnerProduct from './pages/InnerProduct'
import InnerBlog from './pages/InnerBlog'
import './App.css'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<InnerProduct />} />
            <Route path="/blog/:id" element={<InnerBlog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App