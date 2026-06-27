import React, { useState } from "react";
import "./Footer.css";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault(); 

    if (!email) {
      setMessage("Please enter your email!");
      return;
    }

    setMessage("Thanks for subscribing! 💕");
    setEmail("");
  };
  return (
    <footer className="footer-section">
      
      <div className="footer-top container py-5">
        <div className="row text-center text-md-start">

          
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Get Connected</h5>
            <p>Download our app for the best experience!</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-google-play fs-2"></i>
              <i className="bi bi-apple fs-2"></i>
            </div>
          </div>

          
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-twitter fs-3"></i>
              <i className="bi bi-instagram fs-3"></i>
              <i className="bi bi-youtube fs-3"></i>
              <i className="bi bi-facebook fs-3"></i>
            </div>
          </div>

          
          <div className="col-md-4">
            <h5 className="footer-title">Join Our Newsletter</h5>
            <p>Sign up and stay inspired ✨</p>
            <form className="newsletter-form d-flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control me-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn pastel-btn-footer">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="footer1 row text-center text-md-start">
          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">More Info</h5>
            <ul className="list-unstyled">
              <li><a href="#">Help</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Customer Care & Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns & Exchange</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <ul className="list-unstyled">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Gift a Smile</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      

      
      <div className="footer-bottom text-center py-3">
        <p>© 2025 BabyBay. All Rights Reserved.</p>
      </div>
    </footer>
  );
  }