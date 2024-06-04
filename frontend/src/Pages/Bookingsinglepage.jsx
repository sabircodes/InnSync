import React from 'react'
import { useParams } from 'react-router-dom'

const Bookingsinglepage = () => {
    const {id}  = useParams();
  return (

    <div>single Booking page of <br/>
        {id}
    </div>
  )
}

export default Bookingsinglepage