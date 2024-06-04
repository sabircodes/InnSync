import mongoose , {Schema} from 'mongoose';

const BookingSchema = new Schema({
    "place":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true,
    },
    "user":{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    "checkIn":{
        type:Date,
        required:true,
    },
    "checkOut":{
        type:Date,
        required:true,
    },
    "name":{
        type:String,
        required:true
    },
    "number":{
        type:String,
        required:true
    },
    "guest":{
        type:String,
    },
    "price":{
        type:Number,
    }

})

export const bookingmodel = mongoose.model('Booking',BookingSchema);