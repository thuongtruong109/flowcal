import mongoose from "mongoose";
import { ENTITY } from "../constants";

const eventSchema: mongoose.Schema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ENTITY.USER,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  time: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  location: {
    type: String,
    default: "",
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ENTITY.USER,
      default: [],
    },
  ],
  color: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
}).set("timestamps", true);

// eventSchema.index({ organizer: 1, time: 1 }, { unique: true });
// eventSchema.index({ title: 1, time: 1 }, { unique: true });
// eventSchema.index({ attendees: 1, time: 1 }, { unique: true });

type IEventModel = mongoose.InferSchemaType<typeof eventSchema> & Document;
const EventModel = mongoose.model<IEventModel>(ENTITY.EVENT, eventSchema);

export default EventModel;
