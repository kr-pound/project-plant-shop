const locationDAO = require('../../dao/location');

const debug = require('debug')('app:service');

class LocationService {
    async createLocation(location) {
        debug(`Location: get the body : ${JSON.stringify(location, null, 2)}`);
        const { name, description } = location;
        debug(`Location: creating..`);
        return locationDAO.createLocation(name, description);
    }

    async getAllLocations() {
        debug(`Location: getting..`);
        return locationDAO.getAllLocations();
    }
    async getLocation(id) {
        debug(`Location: get id : ${id}`);
        debug(`Location: getting..`);
        return locationDAO.getLocation(id);
    }

    async updateLocation(id, location) {
        debug(`Location: get id : ${id}`);
        debug(`Location: get the body : ${JSON.stringify(location, null, 2)}`);
        const { name, description } = location;
        debug(`Location: updating..`);
        return locationDAO.updateLocation(id, name, description);
    }

    async softDeleteLocation(id) {
        debug(`Location: get id : ${id}`);
        debug(`Location: soft deleting..`);
        return locationDAO.softDeleteLocation(id);
    }
    async softDeleteAllLocations() {
        debug(`Location: soft deleting..`);
        return locationDAO.softDeleteAllLocations();
    }
}

module.exports = new LocationService();
