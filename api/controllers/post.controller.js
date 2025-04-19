import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";
import SavedPost from "../models/savedPost.model.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const filters = {
      ...(query.city ? { city: query.city } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.property ? { property: query.property } : {}),
      ...(query.bedroom ? { bedroom: parseInt(query.bedroom) } : {}),
      ...(query.minPrice || query.maxPrice
        ? { price: { ...(query.minPrice ? { $gte: parseInt(query.minPrice) } : {}), ...(query.maxPrice ? { $lte: parseInt(query.maxPrice) } : {}) } }
        : {}),
    };
    
    const posts = await Post.find(filters);
    
    res.status(200).json(posts);
    
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to get posts" });
  }
}

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id }).populate({
      path: "userId",
      select: "username avatar",
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.jwt;
    let isSaved = false;

    if(token){
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await SavedPost.findOne({
          postId: id,
          userId: payload.id,
        });

        isSaved = !!saved;
    }
    
    res.status(200).json({ ...post.toObject(), isSaved: isSaved });

  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = new Post({
      ...body,
      userId: tokenUserId,
    })

    await newPost.save();

    res.status(200).json(newPost);

  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to create post" });
  }
}
export const updatePost = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to update post" });
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    if (post.userId.toString() !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
