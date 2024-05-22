import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	date: { type: String, required: true },
	event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
	MAX_ATTENDEES: { type: Number, required: true },
	currentReserved: { type: Number, default: 0 },
	ticketCost: { type: Number, required: true },
});

// create a Slot model using the slotSchema
const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
