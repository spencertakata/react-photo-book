import React from "react";
import PhotoCard from './PhotoCard';

const PhotoList = props => {
  return (
    <div className="photo-container">
    {props.photos.map(photo => (
      <PhotoCard 
        src={photo.src}
        id={photo.id}
        description={photo.description}
        deletePhoto={props.deletePhoto}
      />
    ))}
  </div>
  )
}

export default PhotoList