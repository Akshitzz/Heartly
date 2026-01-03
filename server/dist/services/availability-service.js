import { Availability } from "../models/availability";
export class AvailabilityService {
    async checkAvailability(doctorId, date, timeSlot) {
        const availability = await Availability.findOne({
            doctorId,
            date: {
                $gte: new Date(date.setHours(0, 0, 0, 0)),
                $lt: new Date(date.setHours(23, 59, 59, 999))
            }
        });
        if (!availability) {
            return false;
        }
        const slot = availability.timeSlots.find((s) => s.time === timeSlot);
        return slot ? !slot.isBooked : false;
    }
    async blockTimeSlot(doctorId, date, timeSlot) {
        await Availability.updateOne({
            doctorId,
            date: {
                $gte: new Date(date.setHours(0, 0, 0, 0)),
                $lt: new Date(date.setHours(23, 59, 59, 999))
            },
            'timeSlots.time': timeSlot
        }, {
            $set: { 'timeSlots.$.isBooked': true }
        });
    }
    async releaseTimeSlot(doctorId, date, timeSlot) {
        await Availability.updateOne({
            doctorId,
            date: {
                $gte: new Date(date.setHours(0, 0, 0, 0)),
                $lt: new Date(date.setHours(23, 59, 59, 999))
            },
            'timeSlots.time': timeSlot
        }, {
            $set: { 'timeSlots.$.isBooked': false }
        });
    }
}
