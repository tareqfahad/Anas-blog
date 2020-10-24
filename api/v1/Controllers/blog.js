import User from '../Model/User.js'
import Blog from '../Model/Blog.js'


const newPost = async ({user , body}, res) =>{
    try {
        // extract body and _id as text and id
       const {body:text} = body;
       const {_id:id} = user;
        
      await Blog.create({body:text , author:id});

       return res.status(202).json({code:"post has been created"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"server Error"});
    }
};


const getPost = async ({params , query} , res) =>{

    const {id} = params; 
    const {page} = query;
    if (id){
        const getSinglePost = await Blog.findOne({_id:id} , {__v:0});
        // second argument is an object to select which field you want to show or hide
        // 0 to hide the field 1 to show it
        if (!getSinglePost) return res.status(404).json({error:"Not found"});
        return res.status(200).json(getSinglePost);
    }
    const options = {page:parseInt(page) || 1 , limit:11  , select:{ __v:0 , comments:0}};

    const getAllPosts = await Blog.paginate({},options);

    if (!getAllPosts.docs.length) return res.status(404).json({error:"No posts found"});
    return res.status(200).json({data:getAllPosts})

}

                        // extract user and params from req object on entering the route
const deletePost = async ({user , params} , res)=>{
    try {
        const {id} = params;
        const {_id:author} = user;

        if(!id) return res.status(400).json({code:"Fucking donkey ID is required"});

      await Blog.deleteOne({_id:id , author} , (err , doc) =>{
                if (!doc.deletedCount) return res.status(400).json({code:"Nothing deleted"})
               
                return res.status(200).json({code:"Blog has been deleted "});
      });
 

    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Server error"});
    }


}


const updatePost = async ({params , user , body} , res) =>{
    try {

        const {id:blogId} = params;
        const {_id:author} = user;
        const {body:text} = body;
       
        if(!blogId) return res.status(400).json({code:"Fucking donkey ID is required"});

        await Blog.updateOne({_id:blogId , author},{body:text});

        return res.status(200).json({code:"Blog has been updated"});

        
    } catch (err) {
        console.log(err);
        return res.status(500).json({Error:"Server Error"});
    }
}





export {newPost ,getPost , deletePost , updatePost}