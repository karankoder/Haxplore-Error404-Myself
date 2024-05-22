import Event from "../models/eventModel.js";
import Slot from "../models/slotModel.js";

export const createSlots = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'You do not have permission to create slots'
            });
        }
        const { eventId, defaultMaxAttendees, defaultCost, startDate, endDate } = req.body;
        const event = await Event.findById(eventId);
        let currentDate = new Date(startDate);
        let slots = [];
        for (let currentDate = new Date(startDate); currentDate <= new Date(endDate); currentDate.setDate(currentDate.getDate() + 1)) {
            for (const slotRange of event.slotRanges) {
                const slot = await Slot.create({
                    startTime: slotRange.startTime,
                    endTime: slotRange.endTime,
                    date: currentDate,
                    MAX_ATTENDEES: defaultMaxAttendees,
                    ticketCost: defaultCost,
                    event: eventId
                });
                slots.push(slot);
            }
        }
        res.status(201)
        .json(slots);
    } catch (error) {
        next(error);
    }
}

export const updateSlot = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'You do not have permission to create slots'
            });
        }
        const slotId = req.params.id;
        const { maxAttendees, ticketCost } = req.body;
        let slot = await Slot.findById(slotId);
        if (maxAttendees) slot.MAX_ATTENDEES = maxAttendees;
        if (ticketCost) slot.ticketCost = ticketCost;
        await slot.save();
        res.status(200).json(slot);
    } catch (error) {
        next(error);
    }
}

export const getSlots = async (req, res, next) => {
    try {
        const { eventId, date } = req.body;
        const slots = await Slot.find({
            event: eventId,
            date: new Date(date)
        })
        res.status(200).json(slots);
    } catch (error) {
        next(error);
    }
}

export const getSlot = async (req, res, next) => {
    try {
        const slot = await Slot.findById(req.params.id);
        res.status(200).json(slot);
    } catch (error) {
        console.error(error);
    }
}