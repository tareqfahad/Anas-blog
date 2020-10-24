import Comment from '../Model/Comment.js';
import Blog from '../Model/Blog.js'

const addComment = async ({params , body} , res) =>{
    try {
        
        const {blogId} = params;
        const {text} = body;
       
        const blog = await Blog.findOne({_id:blogId});

        if (!blog) return res.status(400).json({error:"No blog found"});

        const comment = await Comment.create({text});
        console.log(comment);

        await Blog.updateOne({_id:blogId} , {$push:{comments:comment._id}});

        return res.status(200).json({Code:"Comments has been created"});



    } catch (err) {
        console.log(err);
        return res.status(500).json({code:"Server Error"});
    }




}

// const deleteComment = async ({params} , res) =>{
//     try {
//     const {id:commentId} = params;
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({code:"Error server"});
//     }
// }


export {addComment};