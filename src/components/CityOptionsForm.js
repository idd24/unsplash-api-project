import React from 'react'

const CityOptionsForm = ({country, handleOptions}) => {
  return (
    <button value={country} onClick={() => {
        handleOptions(country)
    }}>{country}</button>
  )
}

export default CityOptionsForm