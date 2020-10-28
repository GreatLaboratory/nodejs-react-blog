import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: ObjectId,
        username: String,
    }
});

const Post = model('Post', PostSchema);
export default Post;
