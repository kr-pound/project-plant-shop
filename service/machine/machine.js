const machineDAO = require('../../dao/machine');

const debug = require('debug')('app:service');

class MachineService {
    async createMachine(machine) {
        debug(`Machine: get the body : ${JSON.stringify(machine, null, 2)}`);
        const { id, capacity, staff_id } = machine;
        debug(`Machine: creating..`);
        return machineDAO.createMachine(id, capacity, 0, staff_id);
    }

    async getAllMachines() {
        debug(`Machine: getting..`);
        return machineDAO.getAllMachines();
    }
    async getMachine(id) {
        debug(`Machine: get id : ${id}`);
        debug(`Machine: getting..`);
        return machineDAO.getMachine(id);
    }

    async updateMachine(id, machine) {
        debug(`Machine: get id : ${id}`);
        debug(`Machine: get the body : ${JSON.stringify(machine, null, 2)}`);
        const { capacity } = machine;
        debug(`Machine: updating..`);
        return machineDAO.updateMachine(id, capacity);
    }

    async softDeleteMachine(id) {
        debug(`Machine: get id : ${id}`);
        debug(`Machine: soft deleting..`);
        return machineDAO.softDeleteMachine(id);
    }
    async softDeleteAllMachines() {
        debug(`Machine: soft deleting..`);
        return machineDAO.softDeleteAllMachines();
    }
}

module.exports = new MachineService();
