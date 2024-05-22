import Slot from "../models/slotModel.js";
import Ticket from "../models/ticketModel.js";
import mongoose from "mongoose";
import ErrorHandler from "../middlewares/error.js";

// mutually exclusive allotment of tickets
export async function bookTickets(req, res, next) {
	try {
		const { slotId, persons } = req.body;
		let slot = await Slot.findById(slotId);
		const availableTickets = slot.MAX_ATTENDEES - slot.currentReserved;
		if (persons.length > availableTickets) {
			return res.status(400).json({
				message: "Requested number of tickets not available"
			})
		}
		slot.currentReserved += persons.length;
		await slot.save();
		let tickets = [];
		for (let i=0; i<persons.length; i++) {
			const ticket = await Ticket.create({
				slot: slotId,
				booked_by: req.user._id,
				person: persons[i]
			});
			tickets.push(ticket);
		}
		res.status(201).json(tickets);
	} catch (error) {
		next(error);
	}
}

export const confirmTickets = async (req, res, next) => {
	try {
		const { slotId } = req.body;
		const updateResult = await Ticket.updateMany({
			slot: slotId,
			booked_by: req.user._id,
			status: 'pending'
		}, {
			$set: { status: 'confirmed' }
		});
		const { nModified } = updateResult;
		
		if (nModified > 0) {
			// If at least one ticket was modified, fetch and return the updated tickets
			const updatedTickets = await Ticket.find({
				slot: slotId,
				booked_by: req.user._id,
				status: 'confirmed'
			});
			return res.status(200).json(updatedTickets);
		} else {
			// If no tickets were modified, return a message indicating no changes
			return res.status(200).json({ message: 'No tickets were confirmed' });
		}
	} catch (error) {
		next(error);
	}
}


export const paymentFailed = async (req, res, next) => {
	try {
		const { slotId } = req.params;
		const updateResult = await Ticket.updateMany({
			slot: slotId,
			booked_by: req.user._id,
			status: 'pending'
		}, {
			$set: { status: 'cancelled' }
		});
		if (updateResult.ok === 1) {
			const cancelledCount = updateResult.nModified;
	
			// Decrement currentReserved in the corresponding slot
			await Slot.updateOne(
				{ _id: slotId },
				{ $inc: { currentReserved: -cancelledCount } }
			);
	
			res.status(200).json({
				message: "Tickets cancelled successfully"
			})
		} else {
			res.status(400).json({
				message: "Failed to cancel tickets"
			})
		}
	} catch (error) {
		next(error);
	}
}

export async function cancelTicket(req, res, next) {
	const { ticketId } = req.params;
	const ticket = await Ticket.findById(ticketId);
	const slot = await Slot.findById(ticket.slot);
	if (!ticket) {
		return res
			.status(404)
			.json({ message: "Ticket not found" });
	}
	if (ticket.booked_by !== req.user._id) {
		return next(new ErrorHandler("You can't cancel others' ticket", 403));
	}
	if (ticket.status === "cancelled") {
		return res
			.status(400)
			.json({ message: "Ticket already cancelled" });
	}
	ticket.status = "cancelled";
	await ticket.save();
	const currentDate = Date.now();
	const dateTimeString = `${slot.date}T${slot.startTime}`;
	const startTimeDate = new Date(dateTimeString);
	const cancellationAmount = ((currentDate - ticket.createdAt)/(startTimeDate - ticket.createdAt))*slot.ticketCost
	return res.status(200).json({
		cancellationAmount
	});
}
