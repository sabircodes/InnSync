import mongoose , {Schema} from 'mongoose';

const PlaceSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    title:{
        type:String,
        required:true,
    },
    photos:[String],
    address:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    Perks:[
        String
    ],
    extraInfo:{
        type:String,
    },
    checkIn:{
        type:Number,
    },
    checkOut:{
        type:Number,
    },
    maxGuests:{
        type:Number,
    },
    price:{
        type:Number,
    }
},{timestamps:true});

export const placemodel = mongoose.model('Place',PlaceSchema);
