import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_LIVE || 'https://shree-laxmi-mall-backend.onrender.com/api'
  : import.meta.env.VITE_API_LOCAL || 'http://localhost:5000/api';

const api = {
  // ==================== COMMON ====================
  getHomeBanner: (pageName) => {
    return axios.get(`${API_BASE_URL}/homeBanners/page/${pageName}`);
  },

  // ==================== HOME PAGE COMPONENTS ====================
  getDiscoverProducts: () => axios.get(`${API_BASE_URL}/discoverProducts`),

  getCategories: () => axios.get(`${API_BASE_URL}/categories`),

  getTopRatingProducts: (category = 'kids') =>
    axios.get(`${API_BASE_URL}/topRatingProducts/${category}`),

  getTestimonials: () => axios.get(`${API_BASE_URL}/testimonials`),

  getBlogHome: () => axios.get(`${API_BASE_URL}/blogHome`),

  getAboutContent: () => axios.get(`${API_BASE_URL}/aboutContent/1`),

  // ==================== ABOUT PAGE ====================
  getAboutData: () => axios.get(`${API_BASE_URL}/aboutContent/1`),

  getTeam: () => axios.get(`${API_BASE_URL}/team`),

  // ==================== BLOG PAGE ====================
  getBlogPages: () => axios.get(`${API_BASE_URL}/blogPages`),

  getBlogPage: (page) => axios.get(`${API_BASE_URL}/blogPages/${page}`),

  // ==================== INNER BLOG PAGE ====================
  getInnerBlog: (id) => axios.get(`${API_BASE_URL}/innerBlog/${id}`),

  // ==================== BLOG COMMENTS ====================
  addBlogComment: (blogId, commentData) =>
    axios.post(`${API_BASE_URL}/innerBlog/${blogId}/comments`, commentData),


  // ==================== SHOP PAGE ====================
  getProducts: () => axios.get(`${API_BASE_URL}/products`),

  searchProducts: (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return axios.get(`${API_BASE_URL}/products?${params.toString()}`);
  },

  // ==================== CART PAGE ====================
  getCartItems: () => axios.get(`${API_BASE_URL}/cartItems`),

  updateCartItem: (id, data) =>
    axios.patch(`${API_BASE_URL}/cartItems/${id}`, data),

  deleteCartItem: (id) =>
    axios.delete(`${API_BASE_URL}/cartItems/${id}`),

  addToCart: (data) =>
    axios.post(`${API_BASE_URL}/cartItems`, data),

  // ==================== WISHLIST PAGE ====================
  getWishlistItems: () => axios.get(`${API_BASE_URL}/wishlistItems`),

  addToWishlist: (data) =>
    axios.post(`${API_BASE_URL}/wishlistItems`, data),

  updateWishlistItem: (id, data) =>
    axios.patch(`${API_BASE_URL}/wishlistItems/${id}`, data),

  deleteWishlistItem: (id) =>
    axios.delete(`${API_BASE_URL}/wishlistItems/${id}`),

  // ==================== PRODUCT DETAILS ====================
  getProductDetails: (id) =>
    axios.get(`${API_BASE_URL}/productDetails/${id}`),

  // ==================== REVIEWS ====================
  getProductReviews: (productId) =>
    axios.get(`${API_BASE_URL}/productReviews?productId=${productId}`),

  addProductReview: (data) =>
    axios.post(`${API_BASE_URL}/productReviews`, data),

  // ==================== USERS ====================
  getUsers: () => axios.get(`${API_BASE_URL}/users`),

  registerUser: (userData) =>
    axios.post(`${API_BASE_URL}/users`, userData),

  loginUser: (credentials) =>
    axios.post(`${API_BASE_URL}/users/login`, credentials),

};


export default api;