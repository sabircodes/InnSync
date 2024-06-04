import { useEffect, useState } from 'react'
import { Link,  useParams } from 'react-router-dom'
import axios from 'axios'
import Placesformpage from './Placesformpage.jsx';
import Accountnavigation from './Accountnavigation.jsx';

const Placespage = () => {
    const { action } = useParams();
    const [places,setPlaces] =useState([]);
    
    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            setPlaces(data);
        })

        
    },[]);
   

    

    return (
        <div>
            <Accountnavigation/>
            

                <div className="text-center mt-10">
                    <Link to={'/account/places/new'} className="flex bg-primary py-2 px-6 text-white rounded-full max-w-sm mx-auto justify-center">
                        {/* icon svg */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new Places
                    </Link>
                    {/* List of all pages is displayed here */}
                    <div className='mt-4 px-10 py-10'>
                        {
                            places.length > 0 &&  places.map(place=>(
                                  
                                <Link key={place._id} to={'/account/places/'+place._id} className="bg-gray-200 p-4 rounded-2xl flex gap-4 cursor-pointer m-4">
                                    <div className=" w-32 h-32  shrink-0">
                                    {
                                        place.photos.length >0 && (
                                            <img  src={'http://localhost:3000/uploads/'+place.photos[0]} alt="photo" />
                                        )
                                    }
                                    </div>
                                    <div className='text-left grow-0 shrink'>
                                    <h2 className="text-xl font-semibold ">{place.title}</h2>
                                    <p className='text-sm mt-2'>{place.description}</p>
                                    </div>
                                </Link>
                                
                            ))
                        }
                    </div>

                </div>
            {
                action === 'new' && (
                    <Placesformpage/>
                )
            }
</div>
)
}

export default Placespage