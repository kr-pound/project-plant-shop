const db = require('../db/db');

const debug = require('debug')('app:dao');

class PlantTypeDAO {
    async createPlantType(id, name, description, category_id) {
        const [createdPlantType] = await db('plant_types').insert({
            id,
            name,
            description,
            category_id
        })
        .returning('*');

        if (!createdPlantType) {
            debug(`--> PlantType: created? : failed`);
            return;
        }
        debug(`PlantType: created? : pass`);
        return createdPlantType;
    }

    async getAllPlantTypes() {

        // select all
        const query = await db('plant_types')
            .where('deleted_at', null)
            .select('id', 'name', 'description', 'category_id');

        return query;
    }
    async getPlantType(id) {
        const [plant_type] = await db('plant_types')
            .select('id', 'name', 'description', 'category_id')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!plant_type) {
            debug(`--> PlantType: get? : failed`);
            return;
        }
        debug(`PlantType: get? : pass`);
        return plant_type;
    }

    async updatePlantType(id, name, description, category_id) {
        const [updatedPlantType] = await db('plant_types')
            .where('id', id)
            .update({
                name, description, category_id
            })
            .returning('*');

        if (!updatedPlantType) {
            debug(`--> PlantType: updated? : failed`);
            return;
        }
        debug(`PlantType: updated? : pass`);
        return updatedPlantType;
    }

    async softDeletePlantType(id) {
        const [softDeletedPlantType] = await db('plant_types')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedPlantType) {
            debug(`--> PlantType: soft deleted? : failed`);
            return;
        }
        debug(`PlantType: soft deleted? : pass`);
        return softDeletedPlantType
    }
    async softDeleteAllPlantTypes() {
        return await db('plant_types')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new PlantTypeDAO();
