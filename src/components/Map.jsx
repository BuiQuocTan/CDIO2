import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'
import '../style/buy.css'

import Geocode from 'react-geocode'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

Geocode.setApiKey('AIzaSyCCELZ9Ep_A7KLeESHaqtokgeV7Cyvy7Yo')
Geocode.setLanguage('en')
Geocode.setRegion('vn')
Geocode.setLocationType('ROOFTOP')

function Map({ homes }) {
  const mapStyles = {
    minHeight: '400px',
    height: '92.5%',
    width: '100%',
  }

  const [locations, setLocations] = useState([])
  const [defaultCenter, setDefaultCenter] = useState({ lat: 16.082664, lng: 108.2397785 }) // 16.082664 108.2397785

  useEffect(() => {
    async function func() {
      var temp = []
      console.log('homes===>', homes)
      for (var i = 0; i < homes.length; i++) {
        const data = await Geocode.fromAddress(homes[i])
        console.log(data)
        const { lat, lng } = data.results[0].geometry.location
        temp = [...temp, { name: homes[i], location: { lat: lat, lng: lng } }]
      }
      console.log(temp)
      setLocations(temp)
      if (temp.length > 0) {
        setDefaultCenter(temp[0].location)
      }
    }
    func()
  }, [homes])

  return (
    <div className="map-content">
      <LoadScript googleMapsApiKey="AIzaSyCCELZ9Ep_A7KLeESHaqtokgeV7Cyvy7Yo">
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
          {locations.map((item) => {
            return <Marker key={item.name} position={item.location} />
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
