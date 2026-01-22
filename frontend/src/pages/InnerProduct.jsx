import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import api from '../api';
import { FaHeart, FaMinus, FaPlus, FaPaperPlane, FaEye, FaRedo, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const InnerProduct = () => {
  const [mainImage, setMainImage] = useState('/img/img_lg1.png');
  const [selectedSize, setSelectedSize] = useState('XS');
  const [quantity, setQuantity] = useState(2);
  const [activeTab, setActiveTab] = useState('details');
  const [wishlisted, setWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    comment: ''
  });
  const [reviews, setReviews] = useState([]);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const reviewTimerRef = useRef(null);

  // Mock data structure matching the HTML
  const mockProduct = {
    name: "Women's Summer Dress",
    price: 2000,
    rating: 4.9,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      { large: '/img/img_lg1.png', thumb: '/img/img_sm1.png' },
      { large: '/img/img_lg2.png', thumb: '/img/img_sm2.png' },
      { large: '/img/img_lg3.png', thumb: '/img/img_sm3.png' }
    ]
  };

  // Initial reviews data
  const initialReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 4,
      text: 'Excellent quality! The dress fits perfectly and the fabric is very comfortable. I\'ve received so many compliments!',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      rating: 5,
      text: 'Best purchase ever! The stitching is excellent and the color looks exactly like in the picture. Very fast delivery too!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 4,
      text: 'Love this dress! Perfect for summer parties. The quality exceeded my expectations. Will definitely buy again.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 3,
      text: 'Good quality fabric, but the size was slightly smaller than expected. Would recommend ordering one size up.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Neha Gupta',
      rating: 4,
      text: 'Beautiful design and perfect for office wear. The material is breathable and doesn\'t wrinkle easily.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Raj Malhotra',
      rating: 5,
      text: 'Perfect fit and amazing quality! I\'ve ordered 3 more dresses from this store. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Using mock data for now
        setProduct(mockProduct);
        setMainImage('/img/img_lg1.png');
        setReviews(initialReviews);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to mock data
        setProduct(mockProduct);
        setMainImage('/img/img_lg1.png');
        setReviews(initialReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // Auto slide reviews
  useEffect(() => {
    reviewTimerRef.current = setInterval(() => {
      setCurrentReviewSlide(prev => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 5000);

    return () => {
      if (reviewTimerRef.current) {
        clearInterval(reviewTimerRef.current);
      }
    };
  }, [reviews.length]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted);
    alert(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    setReviewForm({ ...reviewForm, rating });
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      product: product?.name || 'Product',
      size: selectedSize,
      quantity: quantity,
      price: product?.price || 0,
      total: (product?.price || 0) * quantity
    };

    alert(`Added to cart:\nProduct: ${cartItem.product}\nSize: ${cartItem.size}\nQuantity: ${cartItem.quantity}\nTotal: ₹${cartItem.total}`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.firstName || !reviewForm.lastName || !reviewForm.comment || reviewForm.rating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }

    // Generate random avatar from Unsplash
    const avatarIds = [
      '1524504388940-b1c1722653e1',
      '1507003211169-0a1dd7228f2d',
      '1438761681033-6461ffad8d80',
      '1500648767791-00dcc994a43e',
      '1544005313-94ddf0286df2',
      '1506794778202-cad84cf45f1d'
    ];
    const randomAvatar = `https://images.unsplash.com/photo-${avatarIds[Math.floor(Math.random() * avatarIds.length)]}?w=150&auto=format&fit=crop&q=80`;

    const newReview = {
      id: reviews.length + 1,
      name: `${reviewForm.firstName} ${reviewForm.lastName}`,
      rating: reviewForm.rating,
      text: reviewForm.comment,
      avatar: randomAvatar
    };

    // Add new review to the beginning
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Reset form
    setReviewForm({
      firstName: '',
      lastName: '',
      rating: 0,
      comment: ''
    });
    setUserRating(0);

    alert('Review submitted successfully!');
  };

  const renderStars = (rating, interactive = false) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FaStar
            key={i}
            color="#FFB800"
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={interactive ? () => handleRatingClick(i) : undefined}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            color="#FFB800"
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={interactive ? () => handleRatingClick(i) : undefined}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            color="#ddd"
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={interactive ? () => handleRatingClick(i) : undefined}
          />
        );
      }
    }
    return stars;
  };

  const renderReviewStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} color="#FFB800" />
      ) : (
        <FaRegStar key={i} color="#ddd" />
      )
    );
  };

  // Get current reviews for slider
  const getCurrentReviews = () => {
    const start = currentReviewSlide * 3;
    const end = start + 3;
    return reviews.slice(start, end);
  };

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentReviewSlide(index);
    // Reset timer
    if (reviewTimerRef.current) {
      clearInterval(reviewTimerRef.current);
    }
    reviewTimerRef.current = setInterval(() => {
      setCurrentReviewSlide(prev => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 5000);
  };

  // Calculate total dots needed
  const totalDots = Math.ceil(reviews.length / 3);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#FF7E00' }}>Loading product...</div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#FF7E00' }}>Product not found</div>;
  }

  const totalPrice = product.price * quantity;
  const totalReviews = 487162 + reviews.length - initialReviews.length; // Adjust for new reviews

  return (
    <>
      <HeroSection pageName="product" />

      {/* Product Detail Section */}
      <section className="product-detail-section" style={{ padding: '80px 0', background: '#fff' }}>
        <Container>
          <Row>
            {/* Product Images */}
            <Col lg={6}>
              <div className="main-product-image" style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img
                  src={mainImage}
                  alt="Dress"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <button
                  onClick={handleWishlistToggle}
                  className="wishlist-btn"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '45px',
                    height: '45px',
                    background: wishlisted ? '#FF7E00' : 'white',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    zIndex: 10
                  }}
                >
                  <i className={wishlisted ? 'fas fa-heart' : 'far fa-heart'} style={{ color: wishlisted ? 'white' : '#FF7E00', fontSize: '20px' }} />
                </button>
              </div>
              <div className="thumbnail-container" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                {product.images && product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(img.large)}
                    className="thumbnail"
                    style={{
                      flex: 1,
                      cursor: 'pointer',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      border: mainImage === img.large ? '3px solid #FF7E00' : '2px solid #eee',
                      transition: 'all 0.3s',
                      height: '120px',
                      opacity: mainImage === img.large ? 1 : 0.7
                    }}
                  >
                    <img
                      src={img.thumb}
                      alt={`View ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </Col>

            {/* Product Info */}
            <Col lg={6}>
              <div className="product-info-container" style={{ paddingLeft: '40px', paddingTop: '20px' }}>
                <h1 className="product-name" style={{ fontSize: '32px', fontWeight: '700', color: '#2D2D2D', marginBottom: '20px' }}>
                  {product.name}
                </h1>

                <div className="product-price-box" style={{ background: '#FFF4E6', display: 'inline-block', padding: '10px 25px', borderRadius: '25px', marginBottom: '20px' }}>
                  <div className="product-price" style={{ fontSize: '24px', fontWeight: '700', color: '#2D2D2D', margin: 0 }}>
                    ₹ {product.price}
                  </div>
                </div>

                <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                  <div className="stars" style={{ color: '#FFB800', fontSize: '20px' }}>
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-text" style={{ color: '#666', fontSize: '16px', marginLeft: '5px' }}>
                    ({product.rating})
                  </span>
                </div>

                {/* Size Selection */}
                <div className="size-section" style={{ marginBottom: '30px' }}>
                  <div className="section-label" style={{ fontWeight: '600', color: '#2D2D2D', marginBottom: '15px', fontSize: '16px' }}>
                    Size: {selectedSize}
                  </div>
                  <div className="size-options" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {product.sizes && product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        className="size-option"
                        style={{
                          padding: '10px 20px',
                          border: selectedSize === size ? '2px solid #FF7E00' : '2px solid #e0e0e0',
                          background: selectedSize === size ? '#FF7E00' : 'white',
                          color: selectedSize === size ? 'white' : '#2D2D2D',
                          borderRadius: '25px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          minWidth: '50px'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="quantity-section" style={{ marginBottom: '30px' }}>
                  <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="quantity-btn"
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '50%',
                        background: 'white',
                        color: '#2D2D2D',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-value" style={{ fontSize: '20px', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="quantity-btn"
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '50%',
                        background: 'white',
                        color: '#2D2D2D',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaPlus />
                    </button>
                    <span className="total-price" style={{ fontSize: '28px', fontWeight: '700', color: '#2D2D2D', marginLeft: '20px' }}>
                      ₹ {totalPrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                  <button
                    className="btn-buy-now"
                    style={{
                      flex: 1,
                      background: '#FF7E00',
                      color: 'white',
                      padding: '15px 40px',
                      borderRadius: '30px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => alert('Buy Now clicked')}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn-add-cart"
                    style={{
                      flex: 1,
                      background: 'white',
                      color: '#2D2D2D',
                      padding: '15px 40px',
                      borderRadius: '30px',
                      border: '2px solid #2D2D2D',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Tabs Section */}
          <div className="product-tabs" style={{ marginTop: '60px', borderBottom: '3px solid #f0f0f0' }}>
            <div className="tab-buttons" style={{ display: 'flex', gap: '40px' }}>
              <button
                onClick={() => setActiveTab('details')}
                className="tab-btn"
                style={{
                  padding: '15px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: activeTab === 'details' ? '#2D2D2D' : '#999',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                Product Details
                {activeTab === 'details' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#FF7E00'
                  }} />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className="tab-btn"
                style={{
                  padding: '15px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: activeTab === 'reviews' ? '#2D2D2D' : '#999',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                Reviews
                {activeTab === 'reviews' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#FF7E00'
                  }} />
                )}
              </button>
            </div>
          </div>

          {/* Product Details Tab */}
          <div className="tab-content" style={{ padding: '40px 0 0' }}>
            {activeTab === 'details' && (
              <div className="tab-pane active">
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-pane active">
                <div className="reviews-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px', paddingBottom: '20px', borderBottom: '2px solid #f0f0f0' }}>
                  <div className="stars" style={{ color: '#FFB800', fontSize: '24px' }}>
                    {renderStars(product.rating)}
                  </div>
                  <span className="reviews-count" style={{ color: '#666', fontSize: '18px' }}>
                    ({product.rating}) • {totalReviews.toLocaleString()} Reviews
                  </span>
                </div>

                {/* Reviews Container with Slider */}
                {reviews && reviews.length > 0 ? (
                  <>
                    <div className="reviews-container" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '20px',
                      marginBottom: '30px',
                      position: 'relative',
                      minHeight: '300px'
                    }}>
                      {getCurrentReviews().map(review => (
                        <div key={review.id} className="review-card" style={{
                          background: '#f8f9fa',
                          borderRadius: '15px',
                          padding: '30px',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease, opacity 0.3s ease',
                          border: '1px solid #eee'
                        }}>
                          <div className="review-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                            <div
                              className="reviewer-avatar"
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                flexShrink: 0,
                                backgroundImage: `url(${review.avatar})`,
                                border: '2px solid #FF7E00'
                              }}
                            ></div>
                            <div className="reviewer-info">
                              <h6 style={{ fontWeight: '600', color: '#2D2D2D', margin: 0 }}>{review.name}</h6>
                              <div className="review-rating" style={{ color: '#FFB800', fontSize: '16px', marginTop: '5px' }}>
                                {renderReviewStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <p className="review-text" style={{ color: '#666', lineHeight: '1.8', flexGrow: 1 }}>
                            "{review.text}"
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Review Slider Dots */}
                    <div className="review-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px', minHeight: '20px' }}>
                      {Array.from({ length: totalDots }).map((_, index) => (
                        <div
                          key={index}
                          className={`review-dot ${index === currentReviewSlide ? 'active' : ''}`}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: index === currentReviewSlide ? '#FF7E00' : '#ddd',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            transform: index === currentReviewSlide ? 'scale(1.2)' : 'scale(1)'
                          }}
                          onClick={() => handleDotClick(index)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    border: '2px dashed #eee',
                    borderRadius: '10px',
                    background: '#fff',
                    margin: '30px 0'
                  }}>
                    <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
                      No reviews yet. Be the first to review this product!
                    </p>
                    <button
                      style={{
                        padding: '10px 25px',
                        background: '#FF7E00',
                        border: 'none',
                        color: 'white',
                        borderRadius: '25px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onClick={() => {
                        // Scroll to review form
                        document.getElementById('reviewForm')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Write First Review
                    </button>
                  </div>
                )}

                {/* Add Comment Form with Light Gray Background */}
                <div style={{
                  background: '#fff4e6',
                  // marginTop: '60px', 
                  padding: '60px',
                  borderRadius: '20px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.05)', marginTop: '60px'
                }}>
                  <Row className="d-flex justify-content-center align-items-center" id="reviewForm">
                    <Col lg={6} md={6} xs={12}>
                      <div className="add-review-form" style={{marginTop: '0px'}}>
                        <h3 className="form-title" style={{
                          color: '#2D2D2D',
                          fontSize: '24px',
                          fontWeight: '600',
                          marginBottom: '25px',
                          paddingBottom: '15px',
                          borderBottom: '2px solid #e0e0e0'
                        }}>
                          Add Your Review
                        </h3>
                        <Form onSubmit={handleReviewSubmit}>
                          <Row>
                            <Col md={6} className="mb-3">
                              <Form.Label htmlFor="firstName" style={{ fontWeight: '600', color: '#2D2D2D', marginBottom: '8px', display: 'block' }}>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={reviewForm.firstName}
                                onChange={handleReviewChange}
                                required
                                style={{
                                  border: '2px solid #e0e0e0',
                                  borderRadius: '12px',
                                  padding: '12px 15px',
                                  fontSize: '16px',
                                  transition: 'all 0.3s',
                                  background: 'white'
                                }}
                              />
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Label htmlFor="lastName" style={{ fontWeight: '600', color: '#2D2D2D', marginBottom: '8px', display: 'block' }}>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={reviewForm.lastName}
                                onChange={handleReviewChange}
                                required
                                style={{
                                  border: '2px solid #e0e0e0',
                                  borderRadius: '12px',
                                  padding: '12px 15px',
                                  fontSize: '16px',
                                  transition: 'all 0.3s',
                                  background: 'white'
                                }}
                              />
                            </Col>
                          </Row>

                          <div className="mb-3">
                            <Form.Label style={{ fontWeight: '600', color: '#2D2D2D', marginBottom: '8px', display: 'block' }}>Your Rating</Form.Label>
                            <div style={{ margin: '15px 0' }}>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    onClick={() => handleRatingClick(star)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {star <= userRating ? (
                                      <FaStar size={28} color="#FFB800" />
                                    ) : (
                                      <FaRegStar size={28} color="#ddd" />
                                    )}
                                  </span>
                                ))}
                              </div>

                              <span style={{ color: '#666', fontSize: '16px', minWidth: '150px' }}>
                                {userRating === 0 ? 'Click stars to rate' :
                                  userRating === 1 ? 'Poor - 1 star' :
                                    userRating === 2 ? 'Fair - 2 stars' :
                                      userRating === 3 ? 'Good - 3 stars' :
                                        userRating === 4 ? 'Very Good - 4 stars' :
                                          'Excellent - 5 stars'}
                              </span>
                              <input type="hidden" id="userRating" value={userRating} />
                            </div>
                          </div>

                          <div className="mb-4">
                            <Form.Label htmlFor="comment" style={{ fontWeight: '600', color: '#2D2D2D', marginBottom: '8px', display: 'block' }}>Your Review</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="comment"
                              name="comment"
                              rows={4}
                              placeholder="Share your experience with this product..."
                              value={reviewForm.comment}
                              onChange={handleReviewChange}
                              required
                              style={{
                                border: '2px solid #e0e0e0',
                                borderRadius: '12px',
                                padding: '12px 15px',
                                fontSize: '16px',
                                transition: 'all 0.3s',
                                background: 'white'
                              }}
                            />
                          </div>

                          <div
                            className="d-flex flex-column align-items-center"
                            style={{ gap: '20px' }}
                          >
                            {/* TOP BUTTON (CENTERED) */}
                            <button
                              type="submit"
                              className="btn-submit-review"
                              style={{
                                width: '100%',          // ✅ THIS LINE
                                padding: '14px 35px',
                                background: '#FF7E00',
                                border: 'none',
                                color: 'white',
                                borderRadius: '30px',
                                fontWeight: '600',
                                fontSize: '16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                              }}
                            >
                              <FaPaperPlane /> Post Your Comment
                            </button>


                            {/* BOTTOM BUTTONS (SAME WIDTH AS TOP) */}
                            <div
                              style={{
                                display: 'flex',
                                gap: '15px',
                                width: '100%',
                                maxWidth: '420px' // 👈 adjust if needed
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setShowPreview(true)}
                                style={{
                                  flex: 1,
                                  padding: '10px 20px',
                                  background: 'white',
                                  color: '#2D2D2D',
                                  border: '2px solid #2D2D2D',
                                  borderRadius: '25px',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px'
                                }}
                              >
                                <FaEye /> Preview
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setReviewForm({
                                    firstName: '',
                                    lastName: '',
                                    rating: 0,
                                    comment: ''
                                  })
                                  setUserRating(0)
                                }}
                                style={{
                                  flex: 1,
                                  padding: '10px 20px',
                                  background: 'white',
                                  color: '#dc3545',
                                  border: '2px solid #dc3545',
                                  borderRadius: '25px',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px'
                                }}
                              >
                                <FaRedo /> Reset
                              </button>
                            </div>
                          </div>


                        </Form>
                      </div>
                    </Col>
                    <Col lg={6} md={6} xs={12} style={{ textAlign: 'center' }}>
                      <img
                        src="/img/img_comment.png"
                        alt="Comment"
                        style={{
                          width: '100%',
                          maxWidth: '500px',   // 🔼 yahan control
                          height: 'auto',
                          margin: '0 auto'
                        }}
                      />
                    </Col>

                  </Row>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Preview Modal */}
      {showPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
            animation: 'modalSlideIn 0.3s ease'
          }}>
            <div style={{
              padding: '20px 30px',
              borderBottom: '2px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h5 style={{ margin: 0, fontSize: '22px', color: '#2D2D2D' }}>Review Preview</h5>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  color: '#999',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: '30px' }}>
              <div className="preview-review-card" style={{
                background: '#f8f9fa',
                borderRadius: '15px',
                padding: '25px',
                marginBottom: '20px'
              }}>
                <div className="preview-review-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div className="preview-reviewer-avatar" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#FF7E00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px'
                  }}>
                    {reviewForm.firstName?.charAt(0) || ''}{reviewForm.lastName?.charAt(0) || ''}
                  </div>
                  <div className="preview-reviewer-info">
                    <h6 style={{ fontWeight: '600', color: '#2D2D2D', margin: 0 }}>
                      {reviewForm.firstName} {reviewForm.lastName}
                    </h6>
                    <div className="preview-review-rating" style={{ color: '#FFB800', fontSize: '16px', marginTop: '5px' }}>
                      {renderReviewStars(userRating)}
                    </div>
                  </div>
                </div>
                <p className="preview-review-text" style={{ color: '#666', lineHeight: '1.8', padding: '10px 0' }}>
                  "{reviewForm.comment}"
                </p>
                <div className="preview-timestamp" style={{ color: '#999', fontSize: '14px', fontStyle: 'italic' }}>
                  Preview - Will be posted immediately after submission
                </div>
              </div>
              <p className="text-center text-muted">This is how your review will appear. Click "Submit Review" to post it.</p>
            </div>
            <div style={{
              padding: '20px 30px',
              borderTop: '2px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px'
            }}>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  padding: '12px 30px',
                  background: 'white',
                  color: '#2D2D2D',
                  border: '2px solid #2D2D2D',
                  borderRadius: '25px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleReviewSubmit({ preventDefault: () => { } });
                  setShowPreview(false);
                }}
                style={{
                  padding: '12px 30px',
                  background: '#FF7E00',
                  color: 'white',
                  border: '2px solid #FF7E00',
                  borderRadius: '25px',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InnerProduct;