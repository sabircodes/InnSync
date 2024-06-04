import React, { useEffect } from 'react'
import { useState } from 'react';
import Photosuploader from '../components/Photosuploader';
import Perks from '../components/Perks';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import Accountnavigation from './Accountnavigation';

const Placesformpage = () => {
    const {id} = useParams();





    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');


    const [addedPhoto, setAddedPhoto] = useState([]);

    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtrainfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);
    const [Price, setPrice] = useState(5);
    const [redirect , setRedirect] = useState(false);


    useEffect(() => {
        if(!id){
            return ;
        }
        axios.get('/places/'+id)
            .then(response => {
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhoto(data.photos);
                setDescription(data.description);
                setExtrainfo(data.extraInfo);
                setPerks(data.Perks);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuest(data.maxGuest);
                setPrice(data.price);
            })

    },[id]);


    async function addnewPlace(e) {
        e.preventDefault();
        if(id){
            const placedata = {id, title, address, addedPhoto, description, perks, extrainfo, checkIn, checkOut, maxGuest,Price };
        await axios.put('/places/'+id, placedata)
        setRedirect(true);

        }
        else{

        
        const placedata = { title, address, addedPhoto, description, perks, extrainfo, checkIn, checkOut, maxGuest,Price };
        await axios.post('/places', placedata)
        setRedirect(true);
        }

        
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }


    return (
        <div>
            <Accountnavigation/>
            <form className='flex flex-col px-20 py-8 border mt-8 mx-10 rounded-lg' onSubmit={addnewPlace}>
                <h2 className="text-4xl font-bold mt-4 p-2">Title</h2>
                <p className='p-2 text-gray-500'>Write a cool title for your place</p>
                <input type="text" placeholder="Title, for eg: my lovely apartment" value={title} onChange={e => setTitle(e.target.value)} />

                {/* address */}
                <h2 className="text-4xl font-bold mt-4 p-2">Address</h2>
                <p className='p-2 text-gray-500'>write a descriptive address for your place</p>

                <input type="text" placeholder="Address, for eg: Boullevard Street" value={address} onChange={e => setAddress(e.target.value)} />
                {/* photos */}
                <h2 className="text-4xl font-bold mt-4 p-2">Photos</h2>
                <p className='p-2 text-gray-500'>more = better</p>
                <Photosuploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />

                {/* description */}
                <h2 className="text-4xl font-bold mt-4 p-2">Description</h2>
                <p className='p-2 text-gray-500'>Write about your place</p>
                <textarea placeholder="Describe your place" className="w-full border p-4 rounded-lg" value={description} onChange={e => setDescription(e.target.value)} />

                {/* perks */}
                <h2 className="text-4xl font-bold mt-4 p-2">Perks</h2>
                <p className='p-2 text-gray-500'>choose the perks you want to offer</p>


                <Perks selected={perks} onChange={setPerks} />


                {/* extra info */}
                <h2 className="text-4xl font-bold mt-4 p-2">Extra Information</h2>
                <p className='p-2 text-gray-500'>Your house your rules</p>
                <textarea className="w-full border p-4 rounded-lg" value={extrainfo} onChange={e => setExtrainfo(e.target.value)} />

                {/* chcek in /out */}
                <h2 className="text-4xl font-bold mt-4 p-2">Check in  & Check out , Max Guest</h2>
                <p className='p-2 text-gray-500'>Please keep in mind to keep the room ready , in order to prepare it for the next guest</p>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap- 2 px-2 ">
                    <div className="p-2">
                        <h3>Check in</h3>
                        <input type='text' placeholder='14:00' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="p-2">
                        <h3>Check Out</h3>
                        <input type='text' placeholder='18:00' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                    <div className="p-2">
                        <h3>Max Guest</h3>
                        <input type='number' placeholder='2 ' value={maxGuest} onChange={e => setMaxGuest(e.target.value)} />
                    </div>
                    <div className="p-2">
                        <h3>Price</h3>
                        <input type='number' placeholder='5 ' value={Price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>

                {/* button */}
                <div className="flex justify-center mt-10 py-4">
                    <button className="bg-primary w-full rounded-lg py-2 text-white max-w-sm ">Save</button>
                </div>

            </form>
        </div>
                
            

        
  )
}

export default Placesformpage