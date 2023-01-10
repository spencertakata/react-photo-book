import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import PhotoCard from './PhotoCard';
import Beetle from './photos/beetle.jpg';
import Timmy from './photos/timmy.jpg';

function App() {
  // Initial state data
  const photoData = [
    {
      "src": Beetle,
      "fstop": "5.6",
      "shutter": "1/200",
      "iso": "1000",
      "id": uuidv4()
    },
    {
      "src": Timmy,
      "fstop": "5.6",
      "shutter": "1/250",
      "iso": "125",
      "id": uuidv4()
    }
  ]

  //useState def
  //Init state from photoData object above
  // const [photos, setPhotos] = useState(photoData);

  const [photos, setPhotos] = useState(() => {
    //Check for saved photo data in local storage
    const saved = localStorage.getItem("photos");
    const initial = JSON.parse(saved);
    //If saved data exists, use data from local storage, else used app state default data
    if (saved != null) {
      return initial
    } else {
      return photoData
    }
  });

  // Update local storage with current photo data state
  const updateStorage = () => {
    const temp = JSON.stringify(photos);
    localStorage.setItem("photos", temp);
  }

  //add photoData to local storage on render
  useEffect(() => {
    updateStorage()
  }, [photos])

  //handle change in input tags
  const handleChange = (e) => {
    const newValue = {
      [e.target.name]: e.target.value
    };
    return newValue;
  };

  //Clear form fields after submit
  const clearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  //Submit, create new object in photoData
  const handleSubmit = e => {
    e.preventDefault();
    console.log(photos);

    const newPhoto = {
      "src": e.target.src.value,
      "fstop": e.target.fstop.value,
      "shutter": e.target.shutter.value,
      "iso": e.target.iso.value,
      "id": uuidv4()
    }
    //update the state var, not state itself (...photoData)
    setPhotos([...photos, newPhoto]);
    //update local storage with new state
    updateStorage();
    //clear form inputs
    clearForm();
  };


  return (
    <div className="App">
      <div className="header">
        <h2>Photo Book</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-item">
            <label>SRC<br/>
            <input 
              type="text"
              className="input-text"
              placeholder="Upload image"
              onChange={handleChange}
              value={photos.src}
              name="src"
            />
            </label>
          </div>

          <div className="input-item">
            <label><span className="label">ISO</span><br/>
              <input 
                type="text"
                className="input-text"
                placeholder="Add img iso here"
                onChange={handleChange}
                value={photos.iso}
                name="iso"
              />
            </label>
          </div>
          
          <div className="input-item">
            <label><span className="label">f-stop</span><br/>
              <input 
                type="text"
                className="input-text"
                placeholder="Add img fstop here"
                onChange={handleChange}
                value={photos.fstop}
                name="fstop"
              />
            </label>
          </div>

          <div className="input-item">
            <label><span className="label">Shutter</span><br/>
              <input 
                type="text"
                className="input-text"
                placeholder="Add img shutter here"
                onChange={handleChange}
                value={photos.shutter}
                name="shutter"
              />
            </label>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>

      
      <div className="photo-container">
        {photos.map(photo => (
          <PhotoCard 
            src={photo.src}
            fstop={photo.fstop}
            shutter={photo.shutter}
            iso={photo.iso}
            id={photo.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

