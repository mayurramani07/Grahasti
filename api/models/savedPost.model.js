import mongoose from 'mongoose';

const SavedPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post', 
    },
  },
  {
    timestamps: true, 
  }
);

SavedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

const SavedPost = mongoose.model('SavedPost', SavedPostSchema);

export default SavedPost;
