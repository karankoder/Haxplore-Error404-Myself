import mongoose from "mongoose";

const slotRangeSchema = new mongoose.Schema({
	startTime: { type: String, required: true },
	endTime: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	slotRanges: [slotRangeSchema]
});

// create an Event model using the eventSchema
const Event = mongoose.model("Event", eventSchema);
export default Event;
