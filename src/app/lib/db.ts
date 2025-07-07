import mongoose from 'mongoose';

export const connectDB = async () => {

  try {
    await mongoose.connect("mongodb+srv://uviom:61IffIhFAFYSFscp@cluster0.bm0eo.mongodb.net/time-manager");
    console.log('MongoDB connected');
  }
  catch (err) {
    console.error(err);
    process.exit(1);
    console.log(err)
  }
};
