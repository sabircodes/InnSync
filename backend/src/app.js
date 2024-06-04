import express from 'express';
import cors from "cors";
import { UserModel } from './models/User.model.js';
import { placemodel } from './models/Place.model.js';
import bcrypt from 'bcrypt';
import { hash, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
// node cache  being called
import NodeCache from 'node-cache';
import { bookingmodel } from './models/Booking.model.js';



const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
// defining the middleware here for ndoe cahce
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL: 60s, check period: 120s
// this thing her made it possible to upload photos , this line basicaaly saya that everything in upload should be displayed in the browser
// Combining these parts, the line essentially says: "Use the express.static middleware to serve static files from the 'uploads' directory when the URL path starts with '/uploads'." This is commonly used to make files in the 'uploads' directory accessible over the web, like images or user-uploaded files.
app.use('/uploads', express.static(__dirname + '/uploads'));
const jwtSecret = 'skjbasjkasdjjabdjkadbeajbdelddbeldbeadbubfwldfland';
app.use(express.json());
app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newuser = await UserModel.create({
            name,
            email,
            password: hashSync(password, bcryptSalt,),
        });
        res.status(200).json(newuser);

    }
    catch (e) {
        res.status(422).json({ error: "error occurred while trying to register user", message: e.message });
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newuser = await UserModel.findOne({ email });
        if (newuser) {
            const passOK = bcrypt.compareSync(password, newuser.password);
            if (passOK) {
                jwt.sign({ email: newuser.email, id: newuser._id, name: newuser.name }, jwtSecret, {}, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie('token', token).json(newuser);
                })
            }
            else {
                res.status(422).json('Password does not match');
            }

        }
        else {
            res.status(500).json('User does not exist');
        }



    } catch (error) {
        res.json(422).json("error occured while loging in ");
        console.log(error);

    }
})



// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await UserModel.findOne({ email });
//         if (user) {
//             const passOK = bcrypt.compareSync(password, user.password);
//             if (passOK) {
//                 // Generate JWT token
//                 jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
//                     if (err) {
//                         throw err;
//                     }
//                     // Check if user data is already in cache
//                     const cachedUserData = cache.get(`user:${user._id}`);
//                     if (cachedUserData) {
//                         console.log(`Cached user data found for ${user._id}.`);
//                     } else {
//                         console.log(`No cached user data found for ${user._id}. Fetching from database.`);
//                         // Cache user data for 1 hour
//                         cache.set(`user:${user._id}`, user, 3600);
//                     }
//                     // Set JWT token in cookie and send user data
//                     res.cookie('token', token).json(user);
//                 });
//             } else {
//                 res.status(422).json('Password does not match');
//             }
//         } else {
//             res.status(500).json('User does not exist');
//         }
//     } catch (error) {
//         res.status(422).json("An error occurred while logging in.");
//         console.error(error);
//     }
// });




app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, data) => {
            if (err) throw err;
            res.json(data);
        })

    } else {
        res.json(null);
    }

})


app.post('/logout', (req, res) => {
    res.cookie('token', '').status(200).json('You are logged out please login again')
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    // console.log(link);
    const newName = 'Photo' + Date.now() + '.jpg';

    // Corrected destination path
    const destinationPath = __dirname + '/uploads/' + newName;

    try {
        await imageDownloader.image({
            url: link,
            dest: destinationPath,
        });

        res.json(newName);
    } catch (error) {
        console.error('Error downloading or saving the image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const upploadpicmiddleware = multer({dest:'src/uploads'});
app.post('/uploads',upploadpicmiddleware.array('photos',100),(req, res) => {
    const uploadedfiles=[];
    for(let i =0 ; i < req.files.length ;i++){
        const {path , originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newpath = path+'.'+ext;
        fs.renameSync(path,newpath);
        uploadedfiles.push(newpath.replace('src\\uploads\\',''));


    }
    res.json(uploadedfiles);
})


app.post('/places', (req,res) =>{
    const { token } = req.cookies;
    const {title,address,addedPhoto,description,perks,extrainfo,checkIn,checkOut,maxGuest,Price}=req.body;
    jwt.verify(token, jwtSecret, {}, async(err, data) => {
        if (err) throw err;
        const placeDoc = await placemodel.create({
            owner:data.id,
            title,address,photos:addedPhoto,description,Perks:perks,extraInfo:extrainfo,checkIn,checkOut,maxGuest,price:Price
        });
        res.json(placeDoc);
        
    })

})

app.get('/user-places',(req,res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, data) => {
        if (err) throw err;
        const{id}=data;
        res.json(await placemodel.find({owner:id}));
        });
    })

app.get('/places/:id', async(req, res) => {
    // res.json(req.params);
    const {id} = req.params;
    res.json(await placemodel.findById(id));

})

app.put('/places/:id',async(req, res) => {
    
    const { token } = req.cookies;
    const {id,title,address,addedPhoto,description,perks,extrainfo,checkIn,checkOut,maxGuest,Price}=req.body;
    
    jwt.verify(token, jwtSecret, {}, async(err, data) => {
        if (err) throw err;
       const placedoc = await placemodel.findById(id);
       if(data.id === placedoc.owner.toString()) {
        placedoc.set({
            title,address,photos:addedPhoto,description,Perks:perks,extraInfo:extrainfo,checkIn,checkOut,maxGuest,price:Price
        });
        await placedoc.save();

       }
        res.json('ok');
        
    })


})

// modified with caching
// Assuming this is part of your caching middleware or a function called within your route handlers
app.get('/places', async (req, res) => {

    // normal code without caching
    // const places = await placemodel.find();
    // res.json(places);

    // code with caching

    const now = Date.now();
    if (!cache.has('allPlaces') || now - cache.get('lastUpdate') > 60000) { // Check if cache expired
        const places = await placemodel.find(); // Fetch from DB
        cache.set('allPlaces', places); // Store in cache
        cache.set('lastUpdate', now); // Update last update timestamp
        console.log('Fetching data from database and storing in cache.');
    }
    const cachedPlaces = cache.get('allPlaces'); // Retrieve from cache
    if (cachedPlaces) {
        console.log('Serving data from cache.');
        res.json(cachedPlaces);
    } else {
        console.log('No data found in cache. Serving default response.');
        res.json([]); // Or another default response
    }
});


app.get('/place/:id',async(req, res) => {
    const {id} = req.params;
    res.json(await placemodel.findById(id));
    
});


function getUserDataFromToken(req){
    return new Promise((resolve, reject) =>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err, data)=>{
        if(err) throw err;
        resolve(data);

    });
    });
}



app.post('/booking', async(req, res) => {
    const userdata = await  getUserDataFromToken(req);
    const {checkIn,checkOut,name,number,guest,place ,price} = req.body;
    bookingmodel.create(
        {checkIn,checkOut,name,number,guest,place ,price,user:userdata.id}
    ).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        throw err;
    });
})





app.get('/booking' , async (req, res)=>{
   const userdata = await getUserDataFromToken(req);
   res.json(await bookingmodel.find({user:userdata.id}).populate('place'));
})


app.get('/', (req, res) => {
    res.json('Hey backend set up is done')
})

export { app }