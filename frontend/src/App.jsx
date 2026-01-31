import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

// Lazy load all page components
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

// Loading fallback component
const PageLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    flexDirection: 'column'
  }}>
    <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    <p style={{ marginTop: '20px', color: '#FF7E00', fontSize: '16px' }}>
      Loading page...
    </p>
  </div>
)

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoading />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App