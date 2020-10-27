import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function () {
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};

UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

const User = model('User', UserSchema);
export default User;
