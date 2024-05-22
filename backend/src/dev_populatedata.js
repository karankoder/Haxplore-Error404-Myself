import Event from "./models/eventModel.js";
import Slot from "./models/slotModel.js";
import Ticket from "./models/ticketModel.js";

// use this to populate the database with some dummy data for tests
export default async () => {
	console.log("Populating data");
	await Event.find().deleteMany();
	await Slot.find().deleteMany();
	//create an event
	const event = new Event({
		name: "Maha Puja",
		description:
			"Mahapuja daily occurs 3 times a day. Book a slot to attend.",
		mode: "daily",
	});

	await event.save();

	//create three slots
	const slot1 = new Slot({
		startTime: new Date("2021-09-01T09:00:00"),
		endTime: new Date("2021-09-01T10:00:00"),
		MAX_ATTENDEES: 4,
		event: event._id,
		ticketCost: 1009,
	});
	await slot1.save();
	const slot2 = new Slot({
		startTime: new Date("2021-09-01T10:00:00"),
		endTime: new Date("2021-09-01T11:00:00"),
		MAX_ATTENDEES: 10,
		event: event._id,
		ticketCost: 1010,
	});
	await slot2.save();
	const slot3 = new Slot({
		startTime: new Date("2021-09-01T11:00:00"),
		endTime: new Date("2021-09-01T12:00:00"),
		MAX_ATTENDEES: 10,
		event: event._id,
		ticketCost: 1020,
	});
	await slot3.save();
};
