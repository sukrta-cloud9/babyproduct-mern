import React from "react";
import "./Hero4.css";

export default function Hero4() {
  return (
    <section className="hero4-section py-5 text-center">
      <h2
        className="mb-4 fw-bold"
        style={{
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
          color: "#FFBD59",
        }}
      >
        Sweet Deals..!!
      </h2>

      <div id="offerCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide1 */}
          <div className="carousel-item active">
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <div className="offer-card">
                <img
                  src="/infantproduct.png"
                  alt="Infant Care"
                  className="offer-img"
                />
                <h5>Flat 30% Off</h5>
                <p>On all Infant Care Essentials</p>
              </div>

              <div className="offer-card">
                <img
                  src="/toddlerproduct.jpeg"
                  alt="Toddler Wear"
                  className="offer-img"
                />
                <h5>Flat 25% Off</h5>
                <p>Trendy Toddler Wear</p>
              </div>
            </div>
          </div>

          {/* Slide2 */}
          <div className="carousel-item">
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <div className="offer-card">
                <img
                  src="/kidsAccessories.jpeg"
                  alt="Kids Accessories"
                  className="offer-img"
                />
                <h5>Flat 40% Off</h5>
                <p>On Kids’ Accessories</p>
              </div>

              <div className="offer-card">
                <img
                  src="/maternityproduct.jpeg"
                  alt="Maternity"
                  className="offer-img"
                />
                <h5>Flat 20% Off</h5>
                <p>On Maternity Care Products</p>
              </div>
            </div>
          </div>

        </div>

        
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
}
