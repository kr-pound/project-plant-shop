const staffDAO = require('../dao/staff');

const debug = require('debug')('app:service');

class StaffService {

    async validateLogin(username, password) {
        debug(`Staff: validating..`);
        return staffDAO.validateLogin(username, password);
    }

    async getStaff(id) {
        debug(`Staff: get id : ${id}`);
        debug(`Staff: getting..`);
        return staffDAO.getStaff(id);
    }
}

module.exports = new StaffService();
