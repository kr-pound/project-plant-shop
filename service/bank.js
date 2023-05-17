const plantDetailService = require('./plant/plant_detail');

const config = require('config');
const debug = require('debug')('app:service');

const axios = require('axios');

class BankService {

    async request_purchase(plant_id) {
        debug(`Bank: fetching 'plant detail' data..`);
        const plant_detail = await plantDetailService.getPlantDetail(plant_id);
        const price = plant_detail.price;

        const requestBody = {
            price
        };

        try {
            const baseUrl = config.get('http_signal.bank_base_url');
            const response = await axios.post(`${baseUrl}/api/payment_detail`, requestBody);
            debug(`Bank: successfully get data from bank..`);
            return response.data;
        } catch (error) {
            debug(`Error sending purchase request: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new BankService();