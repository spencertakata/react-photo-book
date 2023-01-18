import React from 'react';
import "./PhotoCard.css";

const PhotoCard = (props) => {
  return(
    <div className="photo-card">
      <img src={props.src} className="img" alt="" />
      <div className="card-bottom">
        <div className="flex-container">
          <p>{props.description}</p>
          <button onClick={() => props.deletePhoto(props.id)} className="del-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard;