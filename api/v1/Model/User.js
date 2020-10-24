import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import paginate from 'mongoose-paginate-v2';


const UserSchema = new Schema({


    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

    articles:{
        ref:"blog",
        type:[Schema.Types.ObjectId],
    }
    
});

UserSchema.plugin(paginate);
const User = mongoose.model('user' , UserSchema)

export default User;