import UserRoute from './api/v1/routes/user.route.js'
import authRoute from './api/v1/routes/auth.route.js'
import blogRoute from './api/v1/routes/blog.route.js'
import commentRoute from './api/v1/routes/comment.route.js'



export default (app) => {

    app.use('/user', UserRoute);
    app.use('/auth', authRoute);
    app.use('/blog', blogRoute);
    app.use('/comment', commentRoute);
 


}