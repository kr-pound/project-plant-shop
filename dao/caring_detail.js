const db = require('../db/db');

const debug = require('debug')('app:dao');

class CaringDetailDAO {
    async createCaringDetail(preset_id, watering_period, next_due, document_name, document) {
        const [createdCaringDetail] = await db('caring_details').insert({
            preset_id,
            watering_period,
            next_due,
            document_name,
            document
        })
        .returning('*');

        if (!createdCaringDetail) {
            debug(`--> CaringDetail: created? : failed`);
            return;
        }
        debug(`CaringDetail: created? : pass`);
        return createdCaringDetail;
    }

    async getAllCaringDetails() {

        // select all
        const query = await db('caring_details')
            .where('deleted_at', null)
            .select('id', 'preset_id', 'watering_period', 'next_due', 'document_name', 'document');

        return query;
    }
    async getCaringDetail(id) {
        const [caringDetail] = await db('caring_details')
            .select('id', 'preset_id', 'watering_period', 'next_due', 'document_name', 'document')
            .where('id', id)
            .andWhere('deleted_at', null);

        if (!caringDetail) {
            debug(`--> CaringDetail: get? : failed`);
            return;
        }
        debug(`CaringDetail: get? : pass`);
        return caringDetail;
    }

    async updateCaringDetail(id, preset_id, watering_period, next_due, document_name, document) {
        let updatedCaringDatail = null;

        if (document) {     // with document
            [updatedCaringDatail] = await db('caring_details')
            .where('id', id)
            .update({
                preset_id, watering_period, next_due, document_name, document, updated_at: db.fn.now()
            })
            .returning('*');
        } else {        // without document
            [updatedCaringDatail] = await db('caring_details')
            .where('id', id)
            .update({
                preset_id, watering_period, next_due, updated_at: db.fn.now()
            })
            .returning('*');
        }

        if (!updatedCaringDatail) {
            debug(`--> CaringDetail: updated? : failed`);
            return;
        }
        debug(`CaringDetail: updated? : pass`);
        return updatedCaringDatail;
    }

    async softDeleteCaringDetail(id) {
        const [softDeletedCaringDetail] = await db('caring_details')
            .where('id', id)
            .update({ deleted_at: new Date() })
            .returning('*');

        if (!softDeletedCaringDetail) {
            debug(`--> CaringDetail: soft deleted? : failed`);
            return;
        }
        debug(`CaringDetail: soft deleted? : pass`);
        return softDeletedCaringDetail
    }
    async softDeleteAllCaringDetails() {
        return await db('caring_details')
            .where('deleted_at', null)
            .update({ deleted_at: new Date() })
            .returning('*');
    }
}

module.exports = new CaringDetailDAO();
