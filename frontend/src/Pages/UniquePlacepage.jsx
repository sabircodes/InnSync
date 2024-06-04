import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Bookingwidget from '../components/Bookingwidget';



const UniquePlacepage = () => {
  const { id } = useParams();
  const [place, setPlaces] = useState(null);
  const [showallPhotos, setshowallPhotos] = useState(false);


  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => {
      setPlaces(data);
    })


  }, [id]);
  if (!place) return '';
  if (showallPhotos) return (
    <div className="absolute inset-0  bg-black text-white  min-h-screen">
      <div className="bg-black p-8 grid gap-4 ">
        <div>
          <button onClick={() => setshowallPhotos(false)} className="flex gap-2 px-4 py-2 rounded-2xl bg-gray-900 text-white fixed shadow-lg shadow-gray-950">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
            Close photos
          </button>
        </div>
        {
          place?.photos?.length > 0 && place.photos.map(photo => (
            <div key={photo}>
              <img src={'http://localhost:3000/uploads/' + photo} />
            </div>
          ))
        }
      </div>
    </div>
  )
  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8 lg:px-60 lg:py-10' >
      <div className=' my-2 rounded-lg'>
        <h1 className="text-xl font-bold leading-relaxed ">{place.title}</h1>
        <h3 className="text-sm font-semibold underline flex ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>

          {place.address}</h3>
      </div>
      <div className='relative rounded-2xl'>
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden   ">
          {
            place.photos?.[0] && (
              <div>
                <img src={'http://localhost:3000/uploads/' + place.photos[0]} alt="photo" className="object-cover aspect-square" />
              </div>

            )
          }
          <div className="grid ">
            {
              place.photos?.[1] && (
                <img src={'http://localhost:3000/uploads/' + place.photos[1]} alt="photo" className="object-cover aspect-square" />

              )
            }
            <div className='overflow-hidden'>
              {
                place.photos?.[2] && (
                  <img src={'http://localhost:3000/uploads/' + place.photos[2]} alt="photo" className="object-cover aspect-square relative top-2" />

                )
              }
            </div>
          </div>

        </div>
        <button onClick={() => setshowallPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 rounded-lg bg-white text-black border-black flex gap-2 shadow-lg shadow-gray-500 hover:border-primary ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>



          Show more photos</button>
      </div>
    
      <div className="mt-8 grid grid-cols-[2fr_1fr] gap-8 ">
        <div>
        <div className="my-4">
        <h2 className="font-semibold text-3xl mb-2">Description</h2>
        {place.description}
         </div>
          Check In  : {place.checkIn} <br />
          Check Out : {place.checkOut} <br />
          Max Guest : {place.maxGuests}
          
        </div>
        <div>
              <Bookingwidget place={place}/>
        </div>
      </div>
        <div>
        <h2 className="font-semibold text-3xl my-2">Extra Info</h2>
        </div>
      <div className="text-sm text-gray-700 leading-4 -mx-8 px-8 py-8 bg-white p-2 rounded-2xl shadow-lg">
        {place.extraInfo}</div>
    </div>
  )
}

export default UniquePlacepage