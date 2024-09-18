import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import profile_img from '../assets/profile_page.jpg';
import axios from 'axios';

const Sidebar = () => {
    const [profile, setProfile] = useState([]);
    const url1 = "https://script.googleusercontent.com/macros/echo?user_content_key=jIrB89qiZ7c7iJMw5MXr9iLmkcrt_9rdQt164B1M3xG8LjcOT6YB38qP6k5ytEC1yOHDJkWXFXBAM8EGZsgx-936h62sjDTXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLsznbTJQGzbss45ob142ZI_elH_OBV7XpJWU7664uPaQO-TRhHM6TJ7IfS_XV2Yw_Tg86S3JcvjsT0K3tp37Kq0PIW3Jhv5udz9Jw9Md8uu&lib=MoScz0vOL4sPVmJr8nWWq_3ICqT_Ep9Bz";
    
    const getCourier1 = async () => {
        try {
            const response = await axios.get(`${url1}`);
            setProfile(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourier1();
    }, []);

    return (
        <div className="sidebar-container d-flex flex-column align-items-center justify-content-start">
            <div className="d-flex justify-content-center mt-3 w-100">
                <button className="btn btn-outline-light font-weight-bold rounded custom-button">
                    <i className="fas fa-search icon-spacing"></i>
                    Find People
                </button>
            </div>

            <div className="d-flex flex-column align-items-center px-4 mt-3">
                <img src={profile_img} alt="profile" className="rounded-image img-fluid" />
                <h1 className="mt-4 text-center">{profile.Instructor}</h1>
            </div>

            <div className="text-container px-4 mt-4">
                <p style={{ fontSize: "18px", textAlign: "justify", whiteSpace: 'pre-wrap', lineHeight: "1.6" }}>
                    {profile.Message}
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
        </div>
    );
};

export default Sidebar;
