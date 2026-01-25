import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import './App.css'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Shop = lazy(() => import('./pages/Shop'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Account = lazy(() => import('./pages/Account'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const InnerProduct = lazy(() => import('./pages/InnerProduct'))
const InnerBlog = lazy(() => import('./pages/InnerBlog'))

// Preload important pages
const preloadPages = () => {
  import('./pages/About')
  import('./pages/Shop')
  import('./pages/Blog')
  import('./pages/Contact')
}

function AppContent() {
  const location = useLocation()
  const Footer = lazy(() => import('./components/Footer')) // lazy load footer too

  return (
    <Suspense fallback={<PageLoader />}>
      {/* Everything inside Suspense including Footer */}
      <div className="page" key={location.pathname}>
        <Routes location={location}>
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
        <Footer />
      </div>
    </Suspense>
  )
}

function App() {
  useEffect(() => {
    preloadPages()
  }, [])

  return (
    <Router>
      <Navbar />
      <AppContent />
    </Router>
  )
}

export default App
