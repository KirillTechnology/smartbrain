import './App.css';
import React from 'react';

import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// Clarifai API
// const USER_ID = 'kirilltechnology';
// const PAT = 'f869ca70889145759b928f2262e6e3ea'; // Your PAT (Personal Access Token) can be found in the portal under Authentification
// const APP_ID = 'my-first-application';
// const MODEL_ID = 'face-detection'; // Change these to whatever model and image URL you want to use

// test image: https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-three-men-sitting-in-van.jpg?v=thumb

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    score: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    console.log('Calculting face location...');

    const image = document.getElementById('input-image');
    const width = image.width;
    const height = image.height;

    let boxes = [];

    const faces = data.outputs[0].data.regions;

    for (let x of faces) {
      const face = x.region_info.bounding_box;
      boxes.push({
        leftCol: face.left_col * width,
        rightCol: width - (face.right_col * width),
        topRow: face.top_row * height,
        bottomRow: height - (face.bottom_row * height)
      })
    }

    return boxes
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = (event) => {
    this.setState({ imageURL: this.state.input })

    // const raw = JSON.stringify({
    //   "user_app_id": {
    //     "user_id": USER_ID,
    //     "app_id": APP_ID
    //   },
    //   "inputs": [
    //     {
    //       "data": {
    //         "image": {
    //           "url": this.state.input // Change to imageURL later after debugging setState
    //         }
    //       }
    //     }
    //   ]
    // });

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Authorization': 'Key ' + PAT
    //   },
    //   body: raw
    // };

    // fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
    //   .then(response => {
    //     if (response.status !== 200) {
    //       throw new Error('Bad response / Make sure the link is correct');
    //     }
    //     return response.text()
    //   })

    fetch('https://smartbrain-api-m35g.onrender.com/imageURL', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        const points = JSON.parse(result).outputs[0].data.regions.length;
        if (result) {
          fetch('https://smartbrain-api-m35g.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
              points: points
            })
          })
            .then(response => response.json())
            .then(score => {
              // this.setState(Object.assign(this.state.user, {score: score} )) 
              this.setState({
                user: {
                  ...this.state.user,
                  score: score
                }
              })
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result)))
      })
      .catch(error => {
        console.log('Oops error', error);
        this.setState({ imageURL: 'False' })
      });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        score: data.score,
        joined: data.joined
      }
    })
  }

  render() {
    const { isSignedIn, boxes, imageURL, route } = this.state;
    return (
      <div className="App">

        <ParticlesBg type="cobweb" color="#ffffff" num={100} bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />

        {route === 'home'
          ?
          <div className='main-space'>
            <Logo />
            <Rank name={this.state.user.name} score={this.state.user.score} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} boxes={boxes} />
            {/* Add a note that API can be down sometimes */}
          </div>
          :
          (route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> // Add Sign-In h1 color animation
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }

      </div>
    );
  }
}

export default App;