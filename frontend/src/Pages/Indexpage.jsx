
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';




const Indexpage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);

    })
  }, [])
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3  lg:grid-cols-6   my-8 mx-4 ">
      {places.length > 0 && places.map(place => (
        <Link to={'/places/'+place._id} key={place.id}  >

          <div className="bg-gray-500 rounded-2xl mb-2 ">
            <img src={'http://localhost:3000/uploads/' + place.photos[0]} className='object-cover aspect-square rounded-2xl' />
          </div>
          <div className='flex gap-2 my-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            <h3 className="text-xs font-bold ">{place.address}</h3>
          </div>
          <div className="flex flex-col px-2 ">
          <h2 className="text-sm font-thin truncate">{place.title}</h2>
          <h4 className='text-normal font-bold flex gap-2'>${place.price}<span className="text-sm font-thin">night</span></h4>
          </div>


        </Link>
      ))}
    </div>
  )
}

export default Indexpage