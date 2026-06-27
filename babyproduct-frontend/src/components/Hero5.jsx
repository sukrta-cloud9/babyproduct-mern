import React from "react";
import "./Hero5.css";

export default function Hero5() {
  return (
    <section className="hero5-section py-5 text-center">
      <h2 className="mb-5 fw-bold">What Our Customers Say</h2>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        {/*  Card 1 */}
        <div className="testimonial-card">
          <img
            src="/testinewmom.png"
            alt="Sarah M."
            className="customer-pic"
          />
          <p className="testimonial-text">
            "As a first-time mom, I was so nervous about choosing the right products for me and my baby. Everything I ordered from this site felt safe, soft, and made with love. The quality and care behind every product truly made my motherhood journey more comfortable!"
          </p>
          <h6 className="customer-name">- Caroline.</h6>
        </div>

        {/* Card 2 */}
        <div className="testimonial-card">
          <img
            src="/momsitting.png"
            alt="Priya K."
            className="customer-pic"
          />
          <p className="testimonial-text">
            "I love how thoughtful each item is — from maternity wear to baby essentials. It's like this brand understands exactly what moms need! Fast delivery, gentle products, and such warm packaging — I felt cared for even before my baby arrived!"
          </p>
          <h6 className="customer-name">- Julia.</h6>
        </div>

        {/* Card 3 */}
        <div className="testimonial-card">
          <img
            src="/momkid.png"
            alt="Priya K."
            className="customer-pic"
          />
          <p className="testimonial-text">
            "The quality is amazing — even after multiple washes, the colors stay vibrant and the fabric feels gentle on my child’s skin. I recommend this brand to all moms!"
          </p>
          <h6 className="customer-name">- Scarlet.</h6>
        </div>
      </div>
    </section>
  );
}
