const config = require('config');

const MqttHandlingService = require('../service/mqtt_handling');
const plantService = require('../service/plant/plant');

// Validation Module
const uuid = require('uuid');
const debug = require('debug')('app:controller');

class HttpToMqttController {

    constructor() {
        this.mqttService = this.setupMqttClient();
        this.requestOpen = this.requestOpen.bind(this);
        this.requestClose = this.requestClose.bind(this);
        this.requestPickup = this.requestPickup.bind(this);
    }

    setupMqttClient() {
        console.log('Setting up MQTT client...');

        // Set up MQTT client
        const mqttOptions = {
            host: config.get('mqtt.connection.host'),
            port: config.get('mqtt.connection.port'),
            username: config.get('mqtt.connection.username'),
            password: config.get('mqtt.connection.password'),
            protocol: 'mqtt'
        };

        console.log(mqttOptions);

        return new MqttHandlingService(mqttOptions);
    }

    async requestOpen(req, res) {
        try {
            debug(`=== Patch Request ===`);
            debug(`HttpToMqtt: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.plant_id)) {
                debug(`--> HttpToMqtt: plant_id uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`HttpToMqtt: plant_id uuid validation : pass`);

            // Check if the plant_id exists and handle errors
            if (req.params.plant_id) {
                const plant = await plantService.getPlant(req.params.plant_id);
                if (!plant) {
                    debug(`--> HttpToMqtt: 'plant_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_id' });
                }
            }
            debug(`HttpToMqtt: 'plant_id' validation : pass`);

            // Processing the Request
            const result = await this.mqttService.requestOpen(req.params.plant_id);
            if (!result) {
                debug(`--> HttpToMqtt: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`HttpToMqtt: successfully? : pass`);

            // Return the response object
            res.status(200).json(result);
            debug(`\nHttpToMqtt: response back to client : ${JSON.stringify(result, null, 2)}`);

        } catch (err) {
            debug(`--> HttpToMqtt: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async requestClose(req, res) {
        try {
            debug(`=== Patch Request ===`);
            debug(`HttpToMqtt: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.plant_id)) {
                debug(`--> HttpToMqtt: plant_id uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`HttpToMqtt: plant_id uuid validation : pass`);

            // Check if the plant_id exists and handle errors
            if (req.params.plant_id) {
                const plant = await plantService.getPlant(req.params.plant_id);
                if (!plant) {
                    debug(`--> HttpToMqtt: 'plant_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_id' });
                }
            }
            debug(`HttpToMqtt: 'plant_id' validation : pass`);

            // Processing the Request
            const result = await this.mqttService.requestClose(req.params.plant_id);
            if (!result) {
                debug(`--> HttpToMqtt: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`HttpToMqtt: successfully? : pass`);

            // Return the response object
            res.status(200).json(result);
            debug(`\nHttpToMqtt: response back to client : ${JSON.stringify(result, null, 2)}`);

        } catch (err) {
            debug(`--> HttpToMqtt: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }

    async requestPickup(req, res) {
        try {
            debug(`=== Patch Request ===`);
            debug(`HttpToMqtt: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.plant_id)) {
                debug(`--> HttpToMqtt: plant_id uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`HttpToMqtt: plant_id uuid validation : pass`);

            // Check if the plant_id exists and handle errors
            if (req.params.plant_id) {
                const plant = await plantService.getPlant(req.params.plant_id);
                if (!plant) {
                    debug(`--> HttpToMqtt: 'plant_id' validation : failed`);
                    return res.status(404).json({ exception: 'Foreign ID not found: plant_id' });
                }
            }
            debug(`HttpToMqtt: 'plant_id' validation : pass`);

            // Processing the Request
            const result = await this.mqttService.requestPickup(req.params.plant_id);
            if (!result) {
                debug(`--> HttpToMqtt: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`HttpToMqtt: successfully? : pass`);

            // Return the response object
            res.status(200).json(result);
            debug(`\nHttpToMqtt: response back to client : ${JSON.stringify(result, null, 2)}`);

        } catch (err) {
            debug(`--> HttpToMqtt: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new HttpToMqttController();
