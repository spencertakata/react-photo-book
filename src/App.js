import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import PhotoList from './PhotoList';
import Beetle from './photos/beetle.jpg';
import Timmy from './photos/timmy.jpg';

function App() {
  // Initial state data
  const photoData = [
    {
      "src": Beetle,
      "description": "Beetle ready for a close up",
      "id": uuidv4()
    },
    {
      "src": Timmy,
      "description": "This is Timmy",
      "id": uuidv4()
    }
  ]

  //useState def
  //Init state from photoData object above
  // const [photos, setPhotos] = useState(photoData);

  const [photos, setPhotos] = useState(() => {
    //Check for saved photo data in local storage
    const saved = sessionStorage.getItem("photos");
    const initial = JSON.parse(saved);
    //If saved data exists, use data from session storage, else used app state default data
    if (saved != null) {
      return initial
    } else {
      return photoData
    }
  });

  // Update local storage with current photo data state
  const updateStorage = () => {
    const temp = JSON.stringify(photos);
    sessionStorage.setItem("photos", temp);
  }

  //add photoData to local storage on render
  useEffect(() => {
  // eslint-disable-line react-hooks/exhaustive-deps
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
    Array.from(document.querySelectorAll(".input-text")).forEach(
      input => (input.value = "")
    );
  }

  //Submit, create new object in photoData
  const handleSubmit = e => {
    e.preventDefault();
    console.log(photos);

    const newPhoto = {
      "src": e.target.src.value,
      "description": e.target.description.value,
      "id": uuidv4()
    }
    //update the state var, not state itself (...photoData)
    setPhotos([...photos, newPhoto]);
    //update local storage with new state
    updateStorage();
    //clear form inputs
    clearForm();
  };

  const delPhoto = id => {
    console.log("delete clicked");
    console.log(photos[0].id);
    // setPhotos([
    //   ...photos.filter(photo => {
    //     return photo.id !== id
    //   }),
    // ])
    setPhotos(photos.filter(photo => photo.id !== id));
  }


  return (
    <div className="App">
      <div className="header">
        <h2>React Photo Book</h2>
        <form onSubmit={handleSubmit} className="form photo-form">
          <div className="input-item">
            <label><span className="label">SRC</span><br/>
            <input 
              type="text"
              className="input-text"
              placeholder="Image url"
              onChange={handleChange}
              value={photos.src}
              name="src"
            />
            </label>
          </div>

          <div className="input-item">
            <label><span className="label">Description</span><br/>
            <textarea 
              type="text"
              className="input-text"
              placeholder="Add a caption"
              onChange={handleChange}
              value={photos.description}
              name="description"
            />
            </label>
          </div>

          <input type="submit" value="Submit" className="submit button" />
        </form>
      </div>

      <PhotoList
        deletePhoto={delPhoto}
        photos={photos}
      />
    </div>
  );
}

export default App;

