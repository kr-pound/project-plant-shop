const plantDetailDAO = require('../../dao/plant_detail');

const debug = require('debug')('app:service');

class PlantDetailService {
    async createPlantDetail(plant_detail) {
        debug(`PlantDetail: get the body : ${JSON.stringify(plant_detail, null, 2)}`);
        const { price, image_name, image } = plant_detail;
        debug(`PlantDetail: creating..`);
        return plantDetailDAO.createPlantDetail(price, image_name, image);
    }

    async getAllPlantDetails() {
        debug(`PlantDetail: getting..`);
        return plantDetailDAO.getAllPlantDetails();
    }
    async getPlantDetail(id) {
        debug(`PlantDetail: get id : ${id}`);
        debug(`PlantDetail: getting..`);
        return plantDetailDAO.getPlantDetail(id);
    }

    async updatePlantDetail(id, plant_detail) {
        debug(`PlantDetail: get id : ${id}`);
        debug(`PlantDetail: get the body : ${JSON.stringify(plant_detail, null, 2)}`);
        const { price, image_name, image } = plant_detail;
        debug(`PlantDetail: updating..`);
        return plantDetailDAO.updatePlantDetail(id, price, image_name, image);
    }

    async softDeletePlantDetail(id) {
        debug(`PlantDetail: get id : ${id}`);
        debug(`PlantDetail: soft deleting..`);
        return plantDetailDAO.softDeletePlantDetail(id);
    }
    async softDeleteAllPlantDetails() {
        debug(`PlantDetail: soft deleting..`);
        return plantDetailDAO.softDeleteAllPlantDetails();
    }
}

module.exports = new PlantDetailService();
