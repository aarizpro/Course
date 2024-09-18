import React, { useState, useEffect } from 'react';
import Course from '../Components/Course';
import axios from 'axios';
import './Karthik.css';
import { Link } from 'react-router-dom';

const Karthik = () => {
  const [courier, setCourier] = useState([]);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
   //const url="http://localhost:3000/";
   const url ="https://karthik.ciprecisionproducts.com/"
 
  const [profile1, setProfile1] = useState([]);
  
  const getCourier1 = async () => {
      try {
          const response = await axios.get(`${url}api/profile`);
          setProfile1(response.data[0]);
      } catch (error) {
          console.log(error);
      }
  };
  const getImage = async () => {
    try {
        const response = await axios.get(`${url}api/cimage`);
        setImages(response.data);
    } catch (error) {
        console.log(error);
    }
};
  useEffect(() => {
      getCourier1();
      getImage();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}api/quotes`);
        setProfile(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCourier = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}api/course`);
        setCourier(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchCourier();
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row">
       <div className="sidebar-container d-flex flex-column align-items-center justify-content-start">
     
       
            <div className="d-flex justify-content-end p-3 w-100">
           
     
              <Link className="px-2 font-weight-bold rounded custom-button" to={profile1.insLink} target="_blank"
  rel="noopener noreferrer">
              <i class="bi bi-linkedin"></i>
              </Link>
            </div>

            <div className="d-flex flex-column align-items-center px-2 mt-3">
                <img src={profile1.insImgurl} alt="profile" className="rounded-image img-fluid" />
                <h1 className="mt-4 text-center " style={{color:"white"}}>{profile1.insName}</h1>
                <p className="text-center " style={{color:"white"}}><i class="bi bi-whatsapp"></i> {profile1.insMobile}</p>
                <p className="text-center " style={{color:"white"}}><i class="bi bi-envelope-at-fill"></i> {profile1.insEmail}</p>
            </div>

            <div className="text-container px-4 mt-4">
                <p style={{ fontSize: "18px", textAlign: "justify", whiteSpace: 'pre-wrap', lineHeight: "1.6" }}>
                    {profile1.insMessage}
                </p>
            </div>

            <div className="d-flex justify-content-center gap-2 w-100 mt-4">
                <button type="button" className="btn btn-success fw-bold flex-fill">
                    <i className="bi bi-speedometer2"></i> Top 5%
                </button>
                <button type="button" className="btn btn-danger fw-bold flex-fill">
                    <i className="bi bi-ticket-perforated-fill"></i> Bookings: 11
                </button>
            </div>
            <div className="d-flex justify-content-start  w-100">
            <Link className="px-2 font-weight-bold rounded custom-button" to="https://karthikcpanel.netlify.app/" target="_blank"
             rel="noopener noreferrer">
              <i class="bi bi-gear"></i>
              </Link>
     </div>
        </div>
     
      <div className="container-fluid content-area" style={{ marginLeft: '300px' }}>
        <div className="row justify-content-end py-3">
          <div className="col-auto">
            <a href="#about-us" className="nav-link">About Me</a>
          </div>
          <div className="col-auto">
            <a href="#services" className="nav-link">Services</a>
          </div>
          <div className="col-auto">
            <a href="#gallery" className="nav-link">Gallery</a>
          </div>
        </div>
        <div className="row justify-content-center py-3">
          <div className="col-auto">
          <div class="card bg-primary text-white rounded-3 mb-3">
          <div class="card-body p-4">
            <figure class="mb-0">
              <blockquote class="blockquote">
                <p class="pb-2">
                {profile.quoteMessage}
                </p>
              </blockquote>
              <figcaption class="blockquote-footer mb-0 text-white">
              {profile.quoteAuthor}
              </figcaption>
            </figure>
          </div>
        </div>
            </div>
            </div>
        <div className="row" id="services">
          {isLoading ? (
            <div className="col-12 text-center">Loading...</div>
          ) : (
            courier.map((item, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <Course courier={item} />
              </div>
            ))
          )}
        </div>

        <div id="about-us" className="row p-4 mb-2">
          <div className="col-12">
            <h1>About Me</h1>
            <p className="text-justify" style={{ fontSize: '18px', lineHeight: '1.6',whiteSpace: 'pre-wrap' }}>
              {profile1.insAboutme}
            </p>
          </div>
        </div>

        <div id="gallery" className="row mb-5">
      <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
        <div className="carousel-inner">
          {images.map((imgSrc, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
              <img src={imgSrc.imgLink} className="d-block w-100" alt={`Slide ${idx}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Karthik;
