import React from 'react'

const CityOptionsForm = ({country, handleOptions}) => {
  return (
    <button className='btn btn-dark m-2' value={country} onClick={() => {
        handleOptions(country)
    }}>{country}</button>
  )
}

export default CityOptionsForm