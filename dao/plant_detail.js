const db = require('../db/db');

const debug = require('debug')('app:dao');

class PlantDetailDAO {
    async createPlantDetail(price, image_name, image) {
        const [createdPlantDetail] = await db('plant_details').insert({
            price,
            image_name,
            image
        })
        .returning('*');

        if (!createdPlantDetail) {
            debug(`--> PlantDetail: created? : failed`);
            return;
        }
        debug(`PlantDetail: created? : pass`);
        return createdPlantDetail;
    }

    async getAllPlantDetails() {

        // select all
        const query = await db('plant_details')
            .where('deleted_at', null)
            .select('id', 'price', 'image_name', 'image');

        return query;
    }
    async getPlantDetail(id) {
        const [plantDetail] = await db('plant_details')
            .select('id', 'price', 'image_name', 'image')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!plantDetail) {
            debug(`--> PlantDetail: get? : failed`);
            return;
        }
        debug(`PlantDetail: get? : pass`);
        return plantDetail;
    }

    async updatePlantDetail(id, price, image_name, image) {
        let updatedPlantDatail = null;

        if (image) {     // with image
            [updatedPlantDatail] = await db('plant_details')
            .where('id', id)
            .update({
                price, image_name, image
            })
            .returning('*');
        } else {        // without image
            [updatedPlantDatail] = await db('plant_details')
            .where('id', id)
            .update({
                price
            })
            .returning('*');
        }

        if (!updatedPlantDatail) {
            debug(`--> PlantDetail: updated? : failed`);
            return;
        }
        debug(`PlantDetail: updated? : pass`);
        return updatedPlantDatail;
    }

    async softDeletePlantDetail(id) {
        const [softDeletedPlantDetail] = await db('plant_details')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedPlantDetail) {
            debug(`--> PlantDetail: soft deleted? : failed`);
            return;
        }
        debug(`PlantDetail: soft deleted? : pass`);
        return softDeletedPlantDetail
    }
    async softDeleteAllPlantDetails() {
        return await db('plant_details')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new PlantDetailDAO();
