import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const CommentSchema = new Schema({
    text:{type:String},
});


const Comment = mongoose.model('comment' , CommentSchema);

export default Comment;