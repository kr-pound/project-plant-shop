const db = require('../db/db');

const debug = require('debug')('app:dao');

class PlantDAO {
    async createPlant(id, plant_type_id, plant_state_id, slot_id, location_id) {
        const [createdPlant] = await db('plants').insert({
            id,
            plant_type_id,
            plant_state_id,
            slot_id,
            location_id
        })
        .returning('*');

        if (!createdPlant) {
            debug(`--> Plant: created? : failed`);
            return;
        }
        debug(`Plant: created? : pass`);
        return createdPlant;
    }

    async getAllPlants() {

        // select all
        const query = await db('plants')
            .where('deleted_at', null)
            .select('id', 'plant_type_id', 'plant_state_id', 'slot_id', 'location_id', 'created_at');

        return query;
    }
    async getPlant(id) {
        const [plant] = await db('plants')
            .select('id', 'plant_type_id', 'plant_state_id', 'slot_id', 'location_id')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!plant) {
            debug(`--> Plant: get? : failed`);
            return;
        }
        debug(`Plant: get? : pass`);
        return plant;
    }

    async updatePlant(id, plant_type_id, slot_id, location_id) {
        const [updatedPlant] = await db('plants')
            .where('id', id)
            .update({
                plant_type_id, slot_id, location_id, updated_at: db.fn.now()
            })
            .returning('*');

        if (!updatedPlant) {
            debug(`--> Plant: updated? : failed`);
            return;
        }
        debug(`Plant: updated? : pass`);
        return updatedPlant;
    }
    async updatePlantState(id, plant_state_id) {
        const [updatedPlant] = await db('plants')
            .where('id', id)
            .update({
                plant_state_id, updated_at: db.fn.now()
            })
            .returning('*');

        if (!updatedPlant) {
            debug(`--> Plant: updated? : failed`);
            return;
        }
        debug(`Plant: updated? : pass`);
        return updatedPlant;
    }

    async softDeletePlant(id) {
        const [softDeletedPlant] = await db('plants')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedPlant) {
            debug(`--> Plant: soft deleted? : failed`);
            return;
        }
        debug(`Plant: soft deleted? : pass`);
        return softDeletedPlant
    }
    async softDeleteAllPlants() {
        return await db('plants')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new PlantDAO();
