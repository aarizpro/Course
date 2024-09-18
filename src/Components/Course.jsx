import React from 'react';
import './Course.css'; // Import your custom CSS
import { Link } from 'react-router-dom';

const Course = ({courier }) => {
  return (
   
     <div className="card bg-white rounded shadow-sm overflow-hidden px-3 pt-2 pb-2">
         <div className="w-100 h-auto">
        <h3> {courier.couName}</h3>
        </div>
        <div className="px-4 pt-2 pb-2">
        <div className="text-muted small"><i class="bi bi-stopwatch-fill"></i> {courier.couDuration}</div>
        <div className="text-muted small"><i class="bi bi-camera-reels-fill"></i>  {courier.couType}</div>
        <div className="mt-2 d-flex gap-2">
        
            <Link to="/summary"
             state={{
                title: courier.couName,
                duration: courier.couDuration,
                aboutCourse: courier.couAbout,
                type:courier.couType,
                discPrice:courier.couPrice
              }}
            className="btn btn-primary w-100 text-center shadow-sm text-sm font-weight-bold"
            >
            <i class="bi bi-currency-rupee"></i>  {courier.couPrice}  <i class="bi bi-caret-right-square-fill"></i>
            </Link>
        </div>
        </div>
    </div>
    

  );
};

export default Course;
