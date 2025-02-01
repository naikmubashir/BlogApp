import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// @desc    Get single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({post})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// @desc    Create post
export const createPost = async (req, res) => {
    const { postedBy,title, content } = req.body;
    if (!postedBy, !title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const user= await User.findById(postedBy);
    if(!user){
        return res.status(404).json({message:'User nto found'})
    }
    if(user._id.toString()!== req.user._id.toString()) {//or postedBy!== req.user._id
        console.log(user._id)
        console.log(req.user._id)
        return res.status(401).json({message:'unauthorized to create post'})
    }

    try {
    const newPost = await Post.create({ title, content, postedBy });
    res.status(201).json({newPost});
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};


// @desc    Update post
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  
  // Verify user is post owner
//   console.log(post)
//   console.log(req.user)
  if (post.postedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: 'Not authorized to update this post' });
  }
     post = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true, runValidators: true }
    );
    res.status(201).json({post});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete post
export const deletePost = async (req, res) => {
  try {
    const post= await Post.findById(req.params.id);
    if(!post){
        return res.status(404 ).json({error:'Post not found...'})
    }
    if(req.user._id.toString() !== post.postedBy.toString()){
        return res.status(401).json({error:'Not authorized t delete this post'})
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Post deleted successfully.."})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};