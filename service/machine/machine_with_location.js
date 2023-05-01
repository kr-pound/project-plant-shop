const machineService = require('../machine/machine');
const locationService = require('../machine/location');
const slotManagementService = require('../slot_management');

const debug = require('debug')('app:service');

class MachineWithLocationService {
    async createMachineWithLocation(machineWithLocation) {

        const { name, description, capacity, staff_id } = machineWithLocation;

        // Create 'location'
        const location = { name, description };

        const createdLocation = await locationService.createLocation(location);
        if (!createdLocation) {
            return null;
        }

        // Create 'machine'
        const { id } = createdLocation;
        const machine = { id, capacity, staff_id };

        const createdMachine = await machineService.createMachine(machine);
        if (!createdMachine) {
            locationService.softDeleteLocation(id);
            return null;
        }

        // Create slots for the new machine
        await slotManagementService.createSlotsForLocation(id, capacity);

        // Combine 'createdMachine' and 'createdLocation' into 'machineWithLocation'
        return { ...createdMachine, ...createdLocation };
    }

    async getAllMachinesWithLocations(filter = {}, sort = { field: 'name', order: 'asc' }, keyword = '') {

        debug(`MachineWithLocation: get filter : ${JSON.stringify(filter, null, 2)}`);
        debug(`MachineWithLocation: get sort : ${JSON.stringify(sort, null, 2)}`);
        debug(`MachineWithLocation: get search keyword : ${JSON.stringify(keyword, null, 2)}`);

        const locations = await locationService.getAllLocations();
        const machines = await machineService.getAllMachines();

        debug(`MachineWithLocation: matching..`);

        // Matching 'Machine' and 'Location', then combine the results
        const machinesWithLocations = machines
            .filter(machine => {
                // If a 'staff_id' filter is provided, only include machines that match the 'staff_id'
                if (filter.staff_id && machine.staff_id !== filter.staff_id) {
                    return false;
                }

                // If a 'search keyword' is provided, filter the results based on the keyword
                if (keyword) {
                    const location = locations.find(loc => loc.id === machine.id);
                    const lowercasedKeyword = keyword.toLowerCase();
                    return location.name.toLowerCase().includes(lowercasedKeyword);
                }

                // If no 'staff_id' filter and no 'search keyword' are provided, include all machines
                return true;
            })
            .map(machine => {
                const location = locations.find(loc => loc.id === machine.id);
                return {
                    id: machine.id,
                    name: location.name,
                    description: location.description,
                    capacity: machine.capacity,
                    plant_amount: machine.plant_amount,
                    staff_id: machine.staff_id
                };
            });

        debug(`MachineWithLocation: matched? : pass`);
        debug(`MachineWithLocation: sorting..`);

        // Sort the results based on the specified sort field and order
        machinesWithLocations.sort((a, b) => {
            const field = sort.field || 'name';
            const order = sort.order || 'asc';

            if (a[field] < b[field]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        debug(`MachineWithLocation: sorted? : pass`);
        return machinesWithLocations;
    }
    async getMachineWithLocation(id) {

        // Read 'location'
        const location = await locationService.getLocation(id);
        if (!location) {
            return null;
        }

        // Read 'machine'
        const machine = await machineService.getMachine(id);
        if (!machine) {
            return null;
        }

        return {
            id: machine.id,
            name: location.name,
            description: location.description,
            capacity: machine.capacity,
            plant_amount: machine.plant_amount,
            staff_id: machine.staff_id
        };
    }

    async updateMachineWithLocation(id, machineWithLocation) {

        const { name, description, capacity } = machineWithLocation;

        // Update 'location'
        const location = { name, description };

        const updatedLocation = await locationService.updateLocation(id, location);
        if (!updatedLocation) {
            return null;
        }

        // Update 'machine'
        const machine = { capacity };

        const updatedMachine = await machineService.updateMachine(id, machine);
        if (!updatedMachine) {
            return null;
        }

        // Combine 'updatedMachine' and 'updatedLocation' into 'machineWithLocation'
        return { ...updatedMachine, ...updatedLocation };
    }

    async softDeleteMachineWithLocation(id) {

        // Check if 'plant_amount' is 0
        const machine = await machineService.getMachine(id);
        if (machine.plant_amount != 0) {
            console.log(`Machine ${machine.id} has plant_amount ${machine.plant_amount}.`);
            return null;
        }

        // Soft Delete 'location'
        const softDeletedLocation = await locationService.softDeleteLocation(id);
        if (!softDeletedLocation) {
            return null;
        }

        // Soft Delete 'machine'
        const softDeletedMachine = await machineService.softDeleteMachine(id);
        if (!softDeletedMachine) {
            return null;
        }

        // Soft Delete 'slots' based on 'location_id'
        const softDeletedSlots = await slotManagementService.softDeleteSlotsByLocationId(id);
        if (!softDeletedSlots) {
            return null;
        }

        return { ...softDeletedMachine, ...softDeletedLocation };
    }
    async softDeleteAllMachinesWithLocations() {

        // Check if 'plant_amount' of every machines are 0
        const machines = await machineService.getAllMachines();

        for (let i = 0; i < machines.length; i++) {
            const machine = machines[i];
            if (machine.plant_amount != 0) {
                // Delete only when 'plant_amount' is 0
                console.log(`Machine ${machine.id} has plant_amount ${machine.plant_amount}.`);
                return;
            }
        }

        // Soft Delete all 'locations'
        const softDeletedLocations = await locationService.softDeleteAllLocations();
        if (!softDeletedLocations) {
            return null;
        }

        // Soft Delete all 'machines'
        const softDeletedMachines = await machineService.softDeleteAllMachines();
        if (!softDeletedMachines) {
            return null;
        }

        // Soft Delete all 'slots'
        const softDeletedSlots = await slotManagementService.softDeleteAllSlots();
        if (!softDeletedSlots) {
            return null;
        }

        // Merge softDeletedMachines and softDeletedLocations
        const deletedData = softDeletedMachines.map((machine, index) => {
            const location = softDeletedLocations[index];
            return {
                id: machine.id,
                name: location.name,
                description: location.description,
                capacity: machine.capacity,
                plant_amount: machine.plant_amount,
                staff_id: machine.staff_id,
            };
        });

        return deletedData;
    }
}

module.exports = new MachineWithLocationService();
