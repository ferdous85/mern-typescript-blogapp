import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please add your name'],
    trim: true,
    maxLength:[20, 'Your name is upto 20 chars long.']
  },
  account:{
    type: String,
    required: [true, 'Please add your email'],
    trim: true,
    unique:true
  },
  password:{
    type: String,
    required: [true, 'Please add password'],
    trim: true,
    unique:true
  },
  avatar:{
    type: String,
    default: 'https://www.tecnomint.com/images/brand/5.jpg'
  },
  type:{
    type:String,
    default:'normal' // fast
  }
},

{
  timestamps:true
})

export default mongoose.model ("User", userSchema)