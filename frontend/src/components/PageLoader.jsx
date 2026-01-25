// src/components/PageLoader.jsx
import React, { useEffect, useState } from 'react'

const PageLoader = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Show loader only if loading > 100ms
    const timer = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div style={styles.loaderOverlay}>
      <div style={styles.spinner}></div>
    </div>
  )
}

const styles = {
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  spinner: {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #FF7E00',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
}

// Add this to App.css
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

export default PageLoader
