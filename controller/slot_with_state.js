const slotWithStateService = require('../service/slot/slot_with_state');

// Validation Module
const uuid = require('uuid');

const debug = require('debug')('app:controller');

class SlotWithStateController {
    async getAllSlotsWithStates(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`SlotWithState: get the request query : ${JSON.stringify(req.query, null, 2)}`);

            // Use the filter from the request object (get from Middleware)
            // Use the search keyword from the query
            const slotsWithStates = await slotWithStateService.getAllSlotsWithStates(req.filter);
            if (!slotsWithStates) {
                debug(`--> SlotWithState: get successfully? : failed`);
                return res.status(404).json({ exception: 'Unable to get SlotsWithStates.' });
            }
            debug(`SlotWithState: get successfully? : pass`);

            res.json(slotsWithStates);
            debug(`\nSlotWithState: response back to client : ${JSON.stringify(slotsWithStates, null, 2)}`);

        } catch (err) {
            debug(`--> SlotWithState: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }

    }
    async getSlotWithState(req, res) {
        try {
            debug(`=== GET Request ===`);
            debug(`SlotWithState: get the request params : ${JSON.stringify(req.params, null, 2)}`);
            // Check if the request parameter is a valid UUID
            if (!uuid.validate(req.params.id)) {
                debug(`--> SlotWithState: uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`SlotWithState: uuid validation : pass`);

            // Check if the slotWithState exists and handle errors
            const slotWithState = await slotWithStateService.getSlotWithState(req.params.id);
            if (!slotWithState) {
                debug(`--> SlotWithState: id exist? : failed`);
                return res.status(404).json({ exception: 'SlotWithState not found.' });
            }
            debug(`SlotWithState: id exist? : pass`);

            res.json(slotWithState);
            debug(`\nSlotWithState: response back to client : ${JSON.stringify(slotWithState, null, 2)}`);

        } catch (err) {
            debug(`--> SlotWithState: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new SlotWithStateController();
