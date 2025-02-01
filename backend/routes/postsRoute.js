import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/posts.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protectRoute,createPost);

router.route('/:id')
  .get(getPost)
  .put(protectRoute ,updatePost)
  .delete(protectRoute,deletePost);

export default router;