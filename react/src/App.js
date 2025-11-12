import React, { useState } from 'react';
export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickOptions = [
    { title: 'Shop Pharmacy', img: '../Assets/shop_pharmacy.webp', link: './HTML/shop_pharmacy.html' },
    { title: 'Order Prescription', img: '../Assets/order_prescription.webp', link: '#home' },
    { title: 'Book a Doctor', img: '../Assets/Consult_Doctor.avif', link: '/Assets/extraaaas/html/appointment3.html' },
    { title: 'Instant Consult', img: './Assets/instant_consultant.webp', link: './HTML/appointment3.html' },
    { title: 'My Records', img: '../Assets/records.webp', link: './HTML/login_pat.html' },
    { title: 'Optical Store', img: '../Assets/Optical.avif', link: '../HTML/optical_store.html' },
    { title: 'Exclusive Offers', img: '../Assets/Offers.avif', link: '#home' }
  ];

  const topCategories = [
    { title: 'Top Deals', img: '../Assets/top_deals.avif', link: './HTML/top_deals.html' },
    { title: 'Back to Routine', img: '../Assets/Back_to_Routine.avif', link: './HTML/back_to_routine.html' },
    { title: 'Beauty', img: '../Assets/Beauty.avif', link: './HTML/beauty.html' },
    { title: 'Mom & Baby', img: '../Assets/mom_and_baby.avif', link: './HTML/mom_and_baby.html' },
    { title: 'Nutrition', img: '../Assets/Nutrition_web.avif', link: './HTML/nutrition.html' },
    { title: 'Medical Essentials', img: '../Assets/Medical_Essentials.avif', link: './HTML/medical_essentials.html' },
    { title: 'Most Clicked', img: '../Assets/Most_Clicked.avif', link: './HTML/most_clicked.html' }
  ];

  const brands = [
    '../Assets/brand1.avif', '../Assets/brand2.avif', '../Assets/brand3.avif',
    '../Assets/brand4.avif', '../Assets/brand5.avif', '../Assets/brand6.avif', '../Assets/brand7.avif'
  ];

  const healthConditions = [
    { title: 'Cold', img: '/Assets/Cold.avif' },
    { title: 'Skin Rash', img: '/Assets/Skin_Rash.avif' },
    { title: 'Sore Throat', img: '/Assets/Sore_Throat.avif' },
    { title: 'Joint Pain', img: '/Assets/Joint_Pain.avif' },
    { title: 'Chest Pain', img: '/Assets/Chest_Pain.avif' },
    { title: 'Fatigue', img: '/Assets/Fatigue.avif' },
    { title: 'Headache', img: '/Assets/Headache.avif' }
  ];

  const categoryData = {
    'Mother & Baby': [
      'Baby Diapering', 'Baby Bath & Skin Care', 'Baby Food & Supplements',
      'Kids Food & Supplements', 'Moms & Maternity', 'Baby Medical Essentials',
      'Baby Feeding Accessories', 'Baby Health & Safety', 'Baby Gear & Nursery'
    ],
    'Beauty': [
      'Skin Care', 'Sun Protection', 'Hair Care', 'Bath & Body Care',
      'Fragrance', 'Make Up', 'Hand & Foot Care', 'Kits & Combos', 'Trending Skincare'
    ],
    'Personal Care': [
      'Dental Hygiene', 'Feminine Hygiene', 'Sexual Wellness',
      'Hygiene Essentials', 'Hair Removal', "Men's Grooming", 'Travel & Comfort'
    ],
    'Health & Wellness': [
      'Health Support', 'Vitamins', 'Minerals', 'Wellness & Lifestyle',
      'Specialty Supplements', 'Gut Health', 'Sports Nutrition', 'Health Food',
      "Shop by Women's Health", "Shop by Men's Health", 'Shop by Nutrition Trends'
    ],
    'Medical Essentials': [
      'Cough & Fever', 'Cold & Flu', 'Pain Relief', 'Pharmacy Remedies',
      'Digestive Remedies', 'First Aid', 'Medical Supplies', 'Specialist Remedies'
    ],
    'Equipment & Homecare': [
      'Health Monitors', 'Orthopedic Supports', 'Mobility Support',
      'Bath & Shower Support', 'Homecare Bed & Accessories', 'Respiratory Care', 'Massagers'
    ],
    'Lifestyle & Fitness': [
      'Fitness & Exercise', 'Health Food & Beverages', 'Aromatherapy', 'Sleep & Relaxation'
    ],
    'Eye Care & Opticals': [
      'Sunglasses', 'Reading Glasses', 'Contact Lenses', 'Eye Care Accessories', 'Optical Frames'
    ],
    'Pet Care': [
      'Pet First Aid', 'Pet Supplements', 'Pet Grooming'
    ]
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: #f8f9fa;
        }

        /* Hero Section */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 40px auto;
          padding: 60px 20px;
          gap: 60px;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .hero-content h1 {
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-content p {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .search-container {
          margin-top: 30px;
        }

        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 18px;
        }

        .search-input {
          width: 100%;
          padding: 16px 16px 16px 50px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .hero-image {
          flex: 1;
          height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        /* Row Title */
        .row-title {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 60px 0 30px;
        }

        .row-title img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
        }

        /* Container & Grid */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .col {
          margin: 0;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .col:hover {
          transform: translateY(-8px);
        }

        .col a {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .col img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s;
        }

        .col:hover img {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .col figcaption {
          text-align: center;
          margin-top: 12px;
          font-weight: 600;
          color: #333;
          font-size: 15px;
        }

        /* Category Footer */
        .category-footer {
          background: #f0f2f5;
          padding: 60px 20px 40px;
          margin-top: 80px;
        }

        .category-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .category-col h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .category-col ul {
          list-style: none;
        }

        .category-col li {
          padding: 6px 0;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .category-col li:hover {
          color: #667eea;
        }

        .category-bottom {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid #ddd;
          flex-wrap: wrap;
          gap: 20px;
        }

        .help-center p {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .help-center button {
          padding: 12px 28px;
          background: #667eea;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .help-center button:hover {
          background: #5568d3;
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .social-links span {
          font-weight: 600;
          color: #666;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 50%;
          color: #667eea;
          font-size: 18px;
          transition: all 0.3s;
          text-decoration: none;
        }

        .social-links a:hover {
          background: #667eea;
          color: #fff;
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            padding: 40px 20px;
          }

          .hero-content h1 {
            font-size: 36px;
          }

          .hero-image {
            width: 100%;
            height: 300px;
          }

          .row {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
          }

          .col img {
            height: 140px;
          }

          .category-container {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 30px;
          }

          .category-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-badge">
              <i className="fas fa-star"></i> Next-Gen Healthcare Software
            </span>
            <h1>Smarter Hospital Management for Better Care</h1>
            <p>
              Manage hospitals efficiently — from patient registration to advanced
              reporting — with seamless digital solutions that transform healthcare
              delivery.
            </p>

            <div className="search-container">
              <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search for services, doctors, or treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="hero-image"></div>
        </section>

        <div style={{ height: '40px' }} id="services"></div>

        {/* Quick Options */}
        <div className="row-title">
          <p>Quick Options</p>
        </div>

        <section className="container">
          <article className="row">
            {quickOptions.map((option, index) => (
              <figure className="col" key={index}>
                <a href={option.link}>
                  <img src={option.img} />
                  <figcaption>{option.title}</figcaption>
                </a>
              </figure>
            ))}
          </article>
        </section>

        {/* Top Categories */}
        <div className="row-title">
          <p>Top Categories</p>
        </div>

        <section className="container">
          <article className="row">
            {topCategories.map((category, index) => (
              <figure className="col" key={index}>
                <a href={category.link}>
                  <img src={category.img} />
                  <figcaption>{category.title}</figcaption>
                </a>
              </figure>
            ))}
          </article>
        </section>

        {/* Offer Banner */}
        <div className="row-title">
          <img src="/Assets/Offerbanner.avif" alt="Special Offers" />
        </div>

        {/* Brands in Spotlight */}
        <div className="row-title">
          <p>Brands In Spotlight</p>
        </div>

        <section className="container">
          <article className="row">
            {brands.map((brand, index) => (
              <figure className="col" key={index}>
                <img src={brand} />
              </figure>
            ))}
          </article>
          <article className="row">
            {brands.map((brand, index) => (
              <figure className="col" key={`second-${index}`}>
                <img src={brand} />
              </figure>
            ))}
          </article>
        </section>

        {/* Health Conditions */}
        <div className="row-title">
          <p>We Got You Through This</p>
        </div>

        <section className="container">
          <article className="row">
            {healthConditions.map((condition, index) => (
              <figure className="col" key={index}>
                <img src={condition.img}/>
                <figcaption>{condition.title}</figcaption>
              </figure>
            ))}
          </article>
        </section>

        {/* Category Footer */}
        <section className="category-footer">
          <div className="category-container">
            {Object.entries(categoryData).map(([title, items], index) => (
              <div className="category-col" key={index}>
                <h4>{title}</h4>
                <ul>
                  {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="category-bottom">
            <div className="help-center">
              <p>We're Always Here To Help</p>
              <a href="./HTML/contactpage.html">
                <button>Help Center</button>
              </a>
            </div>
            <div className="social-links">
              <span>Follow Us On:</span>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}