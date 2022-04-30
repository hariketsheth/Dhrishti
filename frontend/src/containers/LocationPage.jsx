import React from 'react';
import {loadLocations} from './utils.js';

import LocationCarousel from '../components/LocationCarousel';
import Map from '../components/Map';

const locations = [{lat: 32.76570649214452, long: -117.06651266267941}, {lat: 32.7256337, long: -117.1616766}, {lat: 32.7256001, long: -117.1616203}, {lat: 32.7256001, long: -117.1616203}]
const LocationPageContainer = () => {
  const mapLoad = map => {
    setTimeout(() => {
      window.map = map;
      loadLocations(map, locations);
    }, 2000);
  };

  const carouselChange = (from, to) => {
    console.log(to);
    console.log(locations[to]);
    window.map.flyTo({
      center: [
        locations[to].long,
        locations[to].lat,
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      })
    }

  return (
    <div className="location-page">
      <div className="location-container">
        <h1>Local Doctors</h1>
        <h3>Please enable location sharing on your browser</h3>
      <LocationCarousel
      beforeChange={carouselChange}
      information={[
        { name:'Geetanjali Taori - Clinical Treatment for Mental Stress', 
          occupation: 'doctor', // Type of doctor
          lat: 32.7256337,
          'location-img': 'https://d279m997dpfwgl.cloudfront.net/wp/2020/06/doctor-office.jpg',
          long: -117.1616766,
          address: 'Chennai, India',
          'phone-num': '9815167282',
          'office-hours': '9:00AM - 5:00PM',
          website:'https://pacificmedicalcare.net/'
      },
       { name:'Anthony Saravanakumar', 
         occupation: 'doctor', // Type of doctor
         lat: 32.7256001,
         'location-img': 'https://scopeblog.stanford.edu/wp-content/uploads/2020/06/doctors-office-1944117-scaled-e1591229685470-1152x578.jpg',
         long: -117.1616203,
         address: 'Chennai, India', // Address of doctor office
         'phone-num': '9815672311',
         'office-hours': '8:00AM - 5:00PM',
         website:'https://www.sharp.com/'
      },
          { name: 'Dr. Neelima Bharathi', 
          occupation: 'doctor', // Type of doctor
          lat: 32.7256001,
          'location-img': 'https://media.pri.org/s3fs-public/styles/story_main/public/story/images/25065081582_6d669759be_o.jpg?itok=POvhiOww',
          long: -117.1616203,
          address: 'Chennai, India', // Address of doctor office
          'phone-num': '(619)-446-1575',
          'office-hours': '8:00AM - 5:00PM',
          website:'https://www.sharp.com/'
      }
    ]}
    />
    </div>
  <Map mapLoad={mapLoad} />
  </div>
  )
}

export default LocationPageContainer;
