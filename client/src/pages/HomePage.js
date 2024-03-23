import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Local Service Marketplace</h1>
        <p>Find and offer local services easily.</p>
        <Link to="/signup" className="btn btn-primary">Get Started</Link>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Browse Services</h3>
            <p>Explore a wide range of services offered by local professionals.</p>
          </div>
          <div className="step">
            <h3>Book Instantly</h3>
            <p>Choose the service you need and book it instantly with a few clicks.</p>
          </div>
          <div className="step">
            <h3>Enjoy</h3>
            <p>Get the service at your convenience and enjoy the results.</p>
          </div>
        </div>
      </section>

      {/* Featured Listings Placeholder */}
      <section className="featured-listings">
        <h2>Featured Listings</h2>
        {/* Placeholder for listing components */}
      </section>

      {/* Testimonials Placeholder */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        {/* Placeholder for testimonials */}
      </section>

      {/* Additional CTA */}
      <section className="cta">
        <h2>Ready to find the service you need?</h2>
        <Link to="/listings" className="btn btn-secondary">Browse Listings</Link>
      </section>
    </div>
  );
};

export default HomePage;
