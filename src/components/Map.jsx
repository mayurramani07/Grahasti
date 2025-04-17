import React from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import'leaflet/dist/leaflet.css'
import Pin from './Pin';
import { Link } from 'react-router-dom';


const Map = ({items}) => {
  return (
    <MapContainer className='h-full' center={
      items.length === 1
        ? [items[0].latitude, items[0].longitude]
        : [27.5811, 77.6966]
    } zoom={7} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {items.map(item => (
      <Pin item={item} key={item._id}/>
  ))}
</MapContainer>
    )
}

export default Map