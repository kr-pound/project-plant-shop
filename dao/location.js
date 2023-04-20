const db = require('../db/db');

const debug = require('debug')('app:dao');

class LocationDAO {
    async createLocation(name, description) {
        const [createdLocation] = await db('locations').insert({
            name,
            description
        })
        .returning('*');

        if (!createdLocation) {
            debug(`--> Location: created? : failed`);
            return;
        }
        debug(`Location: created? : pass`);
        return createdLocation;
    }

    async getAllLocations() {

        // select all
        const query = await db('locations')
            .where('deleted_at', null)
            .select('*');

        return query;
    }
    async getLocation(id) {
        const [location] = await db('locations')
            .select('*')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!location) {
            debug(`--> Location: get? : failed`);
            return;
        }
        debug(`Location: get? : pass`);
        return location;
    }

    async updateLocation(id, name, description) {
        const [updatedLocation] = await db('locations')
            .where('id', id)
            .update({
                name, description
            })
            .returning('*');

        if (!updatedLocation) {
            debug(`--> Location: updated? : failed`);
            return;
        }
        debug(`Location: updated? : pass`);
        return updatedLocation;
    }

    async softDeleteLocation(id) {
        const [softDeletedLocation] = await db('locations')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedLocation) {
            debug(`--> Location: soft deleted? : failed`);
            return;
        }
        debug(`Location: soft deleted? : pass`);
        return softDeletedLocation
    }
    async softDeleteAllLocations() {
        return await db('locations')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new LocationDAO();
