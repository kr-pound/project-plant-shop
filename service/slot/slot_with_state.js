const slotService = require('../slot/slot');
const slotStateService = require('../slot/slot_state');

const debug = require('debug')('app:service');

class SlotWithStateService {
    async getAllSlotsWithStates(filter = {}, sort = { field: 'slot_code', order: 'asc' }) {

        debug(`SlotWithState: get filter : ${JSON.stringify(filter, null, 2)}`);
        debug(`SlotWithState: get sort : ${JSON.stringify(sort, null, 2)}`);

        const states = await slotStateService.getAllSlotStates();
        const slots = await slotService.getAllSlots();

        debug(`SlotWithState: matching..`);

        // Matching 'Slot' and 'State', then combine the results
        const slotWithStates = slots
            .filter(slot => {
                // If a 'location_id' filter is provided, only include slots that match the 'location_id'
                if (filter.location_id && slot.location_id !== filter.location_id) {
                    return false;
                }

                // If no 'location_id' filter is provided, include all slots
                return true;
            })
            .map(slot => {
                const state = states.find(state => state.id === slot.slot_state_id);
                return {
                    id: slot.id,
                    slot_code: slot.slot_code,
                    slot_state: state,
                    location_id: slot.location_id
                };
            });

        debug(`SlotWithState: matched? : pass`);
        debug(`SlotWithState: sorting..`);

        // Sort the results based on the specified sort field and order
        slotWithStates.sort((a, b) => {
            const field = sort.field || 'slot_code';
            const order = sort.order || 'asc';

            if (a[field] < b[field]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        debug(`SlotWithState: sorted? : pass`);
        return slotWithStates;
    }
    async getSlotWithState(slot_id) {

        // Read 'slot'
        const slot = await slotService.getSlot(slot_id);
        if (!slot) {
            return null;
        }

        // Read 'state' using the 'slot_state_id' from the 'slot' object
        const state = await slotStateService.getSlotState(slot.slot_state_id);
        if (!state) {
            return null;
        }

        return {
            id: slot.id,
            slot_code: slot.slot_code,
            slot_state: {
                id: state.id,
                name: state.name,
                description: state.description
            },
            location_id: slot.location_id
        };
    }
}

module.exports = new SlotWithStateService();
