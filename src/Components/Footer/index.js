import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="Footer">
      <h1>Momentum Plus</h1>
      <section className="container">
        <div className="section1">
          <h1 className="title">The ultimate portfolio tracker</h1>
          <p className="subtitle">
            Mentioned brokers and banks are not affiliated with Momentum and
            does not endorse or recommend any information or advice provided by
            Momentum Pro.
          </p>
        </div>
        <div className="section2">
          <ul>
            <li>About</li>
            <li>Our products</li>
            <li>What we do</li>
            <li>Road map</li>
            <li>Blob</li>
            <li>Jobs</li>
          </ul>
        </div>
        <div className="section3">
          <ul>
            <li>Contact Momentum</li>
            <li>Help</li>
            <li>Legal notices</li>
            <li>Terms of use</li>
            <li>Privacy policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
