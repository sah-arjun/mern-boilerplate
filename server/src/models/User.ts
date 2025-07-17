import mongoose from "mongoose";
import { toJSONPlugin } from "../plugins/toJSON.plugin";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },        
    },
    { timestamps: true }
);

UserSchema.plugin(toJSONPlugin);

export default mongoose.model('User', UserSchema);