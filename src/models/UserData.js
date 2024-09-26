import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    items: [{
        image: { type: String },
        name: { type: String },
    }]
}, { timestamps: true });

export const UserData = mongoose.models.userData || mongoose.model('userData', UserSchema)
