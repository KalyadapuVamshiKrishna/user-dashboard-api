import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email']
    },
    phone: { type: String, required: [true, 'Phone is required'] },
    company: { type: String, required: [true, 'Company is required'] },
    website: { type: String }, // Added field
    address: {
      street: { type: String, required: true },
      suite: { type: String }, // Added field
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      geo: {
        lat: { type: String, default: "0.0" },
        lng: { type: String, default: "0.0" }
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);