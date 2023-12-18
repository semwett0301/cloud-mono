import mongoose from 'mongoose';

export type WithMongooseId<T> = T & { _id: mongoose.Types.ObjectId };
