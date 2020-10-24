import express from 'express';
import {authJwt} from '../Controllers/auth.js'
import {newPost ,getPost, deletePost, updatePost} from '../Controllers/blog.js'
import limitationMiddleware from '../middlewares/postlimitation.js'
const router = express.Router();

router.route("/").post(authJwt , newPost);
router.route("/:id?").get(getPost);
router.route("/:id?").delete(authJwt,deletePost);
router.route("/:id?").patch(authJwt,updatePost);


export default router;