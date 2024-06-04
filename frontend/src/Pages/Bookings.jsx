import React, { useEffect, useState } from 'react'
import Accountnavigation from './Accountnavigation'
import axios from 'axios'
import { format } from 'date-fns';


const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/booking').then(response => {
            setBookings(response.data);
        })
    }, [])
    return (
        <div>
            <Accountnavigation />
            <div >
                {
                    bookings?.length > 0 && bookings.map(booking => (
                        <div key={booking._id} className="bg-gray-200 p-4 rounded-2xl flex gap-4 cursor-pointer m-4">
                        <div className=" w-32 h-32  shrink-0">
                            {
                                booking.place.photos.length > 0 && (
                                    <img src={'http://localhost:3000/uploads/' + booking.place.photos[0]} alt="photo" />
                                )
                            }
                        </div>
                        <div className='text-left grow-0 shrink'>
                                    <h2 className="text-xl font-semibold ">{booking.place.title}</h2>
                                    <p className='text-sm mt-2 font-semibold'>{format ( new Date(booking.checkIn),'dd-MM-yyyy')} to {format ( new Date(booking.checkOut),'dd-MM-yyyy')}</p>
                                    <h2 className='text-sm mt-2 font-thin'>Total Price : ${booking.price}</h2>
                                    
                        </div>
                    </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Bookings