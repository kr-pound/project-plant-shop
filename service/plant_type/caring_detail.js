const caringDetailDAO = require('../../dao/caring_detail');

const debug = require('debug')('app:service');

class CaringDetailService {
    async createCaringDetail(caring_detail) {
        debug(`CaringDetail: get the body : ${JSON.stringify(caring_detail, null, 2)}`);
        const { preset_id, watering_period, next_due, document_name, document } = caring_detail;
        debug(`CaringDetail: creating..`);
        return caringDetailDAO.createCaringDetail(preset_id, watering_period, next_due, document_name, document);
    }

    async getAllCaringDetails() {
        debug(`CaringDetail: getting..`);
        return caringDetailDAO.getAllCaringDetails();
    }
    async getCaringDetail(id) {
        debug(`CaringDetail: get id : ${id}`);
        debug(`CaringDetail: getting..`);
        return caringDetailDAO.getCaringDetail(id);
    }

    async updateCaringDetail(id, caring_detail) {
        debug(`CaringDetail: get id : ${id}`);
        debug(`CaringDetail: get the body : ${JSON.stringify(caring_detail, null, 2)}`);
        const { preset_id, watering_period, next_due, document_name, document } = caring_detail;
        debug(`CaringDetail: updating..`);
        return caringDetailDAO.updateCaringDetail(id, preset_id, watering_period, next_due, document_name, document);
    }

    async softDeleteCaringDetail(id) {
        debug(`CaringDetail: get id : ${id}`);
        debug(`CaringDetail: soft deleting..`);
        return caringDetailDAO.softDeleteCaringDetail(id);
    }
    async softDeleteAllCaringDetails() {
        debug(`CaringDetail: soft deleting..`);
        return caringDetailDAO.softDeleteAllCaringDetails();
    }
}

module.exports = new CaringDetailService();
