import axios from 'axios';
import { useState } from 'react'

const Photosuploader = ({ addedPhoto, onChange }) => {
    const [photolink, setPhotoLink] = useState('');


    async function addphotobylink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photolink });
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');



    }

    function removePhoto(filename) {
        onChange([...addedPhoto.filter(photo => photo !== filename)]);


    }

    function selectAsMainPhoto(ev,filename) {
        ev.preventDefault();
        const addedPhotoWithoutselected = addedPhoto.filter(photo => photo !== filename);
        const newaddedPhoto  = [filename,...addedPhotoWithoutselected]
        onChange(newaddedPhoto);

    }

    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/uploads', data, {
            headers: { 'Content-Type': 'mulitipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames]
            });
        })
    }
    return (
        <div>
            <div className='flex gap-2'>
                <input type="text" placeholder="Add someinteresting photos...." value={photolink} onChange={e => setPhotoLink(e.target.value)} />
                <button className="bg-primary px-5 rounded-2xl text-white" onClick={addphotobylink}>Add Photo</button>
            </div>

            {/* this is what help u to display photos */}
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {addedPhoto.length > 0 &&
                    addedPhoto.map((link) => (
                        <div key={link}  >
                            <div className="h-32 flex relative">
                                <img className="rounded-2xl object-contain w-full" src={`http://localhost:3000/uploads/${link}`} />
                                <div onClick={() => removePhoto(link)} className="cursor-pointer absolute  right-0 bottom-4 border rounded-3xl px-4 text-white bg-opacity-30 bg-black hover:bg-black ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </div>
                                <div onClick={ev => selectAsMainPhoto(ev,link)} className="cursor-pointer absolute  left-0 bottom-4 border rounded-3xl px-4 text-white bg-opacity-30 bg-black hover:bg-black ">
                                    {
                                        link === addedPhoto[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                            </svg>

                                        )
                                    }
                                    {
                                        link!==addedPhoto[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                        )
                                    }
                                   


                                </div>
                            </div>
                        </div>
                    ))
                }
                <label className="border bg-transparent rounded-2xl items-center text-lg text-gray-700 flex justify-center gap-1 ">
                    {/* upload icon */}
                    <input type="file" className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>

                    upload </label>
            </div>
        </div>

    )
}

export default Photosuploader