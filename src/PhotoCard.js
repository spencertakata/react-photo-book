import React from 'react';
import "./PhotoCard.css";

const PhotoCard = (props) => {
  return(
    <div className="photo-card">
      <img src={props.src} className="img" alt="" />
      <div className="card-bottom">
        <p>ISO: {props.iso}</p>
        <p>F-stop: {props.fstop}</p>
        <p>Shutter speed: {props.shutter}</p>
      </div>
    </div>
  )
}

export default PhotoCard;