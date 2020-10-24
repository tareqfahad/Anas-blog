import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import paginate from 'mongoose-paginate-v2';


const BlogSchema = new Schema({

    body:{
        type:String,

    },
    author:{
        ref:"user",
        type:Schema.Types.ObjectId
    },
    comments:{
        ref:'comment',
        type:[Schema.Types.ObjectId]

    },

    food:String
});

BlogSchema.plugin(paginate);
const Blog = mongoose.model('blog' , BlogSchema)

export default Blog;