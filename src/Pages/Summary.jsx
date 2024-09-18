import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Summary.css';

const Summary = () => {
  const location = useLocation();
  const { title, duration, aboutCourse, type, discPrice } = location.state || {};
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState([]);
  const [clientSlot, setClientSlot] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMobile, setClientMobile] = useState('');
  const [clientReq, setClientReq] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  //const url = "https://script.google.com/macros/s/AKfycbzQDkEe_HcGBTbZAh5vF_NmHR9zdefMRGu263oUSJ4FYRhp1QEUxlQiq138YecMp2lsRA/exec";
  //const url="http://localhost:3000/";
  const url ="https://karthik.ciprecisionproducts.com/"
 
  const today = new Date().toISOString().split('T')[0];
  const getSlot = async () => {
    try {
      const response = await axios.get(`${url}api/cslot/search?field[]=cName&value[]=${title}`);
        setSlot(response.data);
      } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClient = async () => {
    const newTeacher = {
      couName:title,
      couDuration:duration,
      couType:type,
      couPrice:discPrice,
      vAbout:clientReq,
      vName:clientName,
      vEmail:clientEmail,
      vMobile:clientMobile,
      vDate:date,
      vTime:clientSlot
  };
    if(clientName===""){
      alert("Enter Name to Book the Slot");
    }else if(clientMobile===""){
      alert("Enter Mobile to Book the Slot");
    }else if(clientEmail===""){
      alert("Enter Email to Book the Slot");
    }else if(clientSlot===""){
      alert("Select your Slot");
    }
    
    else{
    try {
      const response = await axios.post(`${url}api/visit`, newTeacher);
      console.log('Success:');
      
    } catch (error) {
      console.error('Error:', error);
    }
    sendEmail();  
    setClientEmail("");
    setClientMobile("");
    setClientName("");
    setClientReq("");
    setClientSlot("");
    alert("Slot Booked.. Thank You!");
    
  }
  };
  const sendEmail = async () => {
   setSubject("Your Slot Bookings Confirmed"+ clientName)
   const mess ="Hi,  Your Selected for the Course Name- "+title+" Dated: "+date+ " Time: "+clientSlot+" is Confirmed."
   setMessage(mess);
   setRecipientEmail(clientEmail);
    try {
      const response = await axios.post(`${url}sendemail`, {
        recipientEmail,
        subject,
        message,
      });
      if (response.data.status === 'success') {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email.');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  useEffect(() => {
    getSlot();
  }, []);

  return (
    <div className="container mt-2 p-2">
      <Link to="/" className="btn btn-primary shadow-sm text-sm font-weight-bold">
        <i className="bi bi-arrow-left"></i> Home
      </Link>
      
      <div className="row justify-content-center mt-3">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card rounded shadow-sm overflow-hidden p-3" style={{ backgroundColor: "#b5edf5" }}>
            <h3>{title}</h3>
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-muted small">
                <i className="bi bi-stopwatch-fill"></i> {duration}
              </div>
              <div className="text-muted small">
                <i className="bi bi-camera-reels-fill"></i> {type}
              </div>
              <div className="text-end">
                
                <h4 className="btn btn-primary w-100">
                  <i className="bi bi-currency-rupee"></i> {discPrice}
                </h4>
              </div>
            </div>
            
            <div className="card mt-2 p-3" style={{ backgroundColor: "white", whiteSpace: 'pre-wrap' }}>
              <h4>About Course</h4>
              <p>{aboutCourse}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card rounded shadow-sm p-3" style={{ backgroundColor: "#b5edf5" }}>
            <div className="card p-3 mb-3" style={{ backgroundColor: "white" }}>
              <h6>When Should we meet? {date} - {clientSlot}</h6>
              <div className="datepicker-container mt-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="custom-datepicker"
                  min={today}
                />
              </div>
              <h6 className='mt-2'>Available Slots:</h6>
              <div className="row justify-content-center">
                {slot.length > 0 ? (
                  slot.map((slots, index) => (
                    <div key={index} className="col-4 col-md-3 p-2">
                      <div
                        className="card text-center border rounded-square"
                        style={{
                          backgroundColor: hoveredIndex === index ? 'dodgerblue' : 'skyblue',
                          color: hoveredIndex === index ? 'white' : 'black',
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setClientSlot(slots.cSlot)}
                      >
                        <div className="card-body p-3">
                          <h6 style={{ cursor: "pointer" }}>{slots.cSlot}</h6>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading slots...</p>
                )}
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Name"
                
              />
              <label>Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="Email"
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                value={clientMobile}
                onChange={(e) => setClientMobile(e.target.value)}
                placeholder="Mobile"
              />
              <label>Mobile Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={clientReq}
                onChange={(e) => setClientReq(e.target.value)}
                placeholder="What is the call about?"
              />
              <label>What is the call about?</label>
            </div>
            
            <button className="btn btn-primary w-100" onClick={handleClient}>
              Book Your Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
