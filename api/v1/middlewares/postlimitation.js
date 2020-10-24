import Blog from '../Model/Blog.js';

export default async ({user} , res , next) => {
    try {
        const {_id:id} = user
        const blogs = await Blog.find({author:id});
      
        if(blogs.length >= 3){
            return res.status(400).json({code:"Limit exceeded"})
        }

        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:"Limitation error"});

    }


}