const config = require('config');

const stateManagementService = require('../service/state_management');
const plantManagementService = require('../service/plant_management');
const { PlantState } = require('../enum');

const mqtt = require('mqtt');
const debug = require('debug')('app:controller');
const axios = require('axios');

class MqttConnectionController {
    constructor() {

        // Set up MQTT client
        const mqttOptions = {
            host: config.get('mqtt.connection.host'),
            port: config.get('mqtt.connection.port'),
            username: config.get('mqtt.connection.username'),
            password: config.get('mqtt.connection.password')
        };
        this.client = mqtt.connect(mqttOptions);

        this.client.on('connect', () => {
            debug('* MQTT client connected *');

            // Subscribe to a topic
            this.client.subscribe('controller/door_status', (err) => {
                if (err) {
                    debug('Error subscribing to MQTT topic', err);
                } else {
                    debug('Subscribed to MQTT topic: controller/door_status');
                }
            });
            this.client.subscribe('controller/plant_status', (err) => {
                if (err) {
                    debug('Error subscribing to MQTT topic', err);
                } else {
                    debug('Subscribed to MQTT topic: controller/plant_status');
                }
            });
            this.client.subscribe('controller/pickup_status', (err) => {
                if (err) {
                    debug('Error subscribing to MQTT topic', err);
                } else {
                    debug('Subscribed to MQTT topic: controller/pickup_status\n');
                }
            });
        });

        // Handle incoming messages
        this.client.on('message', this.handleMessage.bind(this));

        // Handle errors
        this.client.on('error', (err) => {
          debug('Error with MQTT client', err);
        });
    }

    async handleMessage(topic, message) {
        try {
            debug('\nReceived MQTT topic:', topic.toString());
            debug('Received MQTT message:', message.toString());

            // receive door status from controller (mqtt)
            if (topic.toString() === 'controller/door_status') {
                debug('Received MQTT signal in topic: controller/door_status');

                // get an mqtt payload
                const payload = JSON.parse(message);
                const { slot_code, plant_id, status } = payload;

                // check if data missing
                if (!slot_code || !plant_id || !status) {
                    debug('Received MQTT but data in the payload is missing');
                    return null;
                }

                if (status == "opened") {
                    // update plant state
                    // READY --> DISABLED
                    const updatedData = await plantManagementService.requestChangePlantState(plant_id, PlantState.DISABLED.id, PlantState.READY.id);
                    console.log(updatedData);

                    // updated failed
                    if (!updatedData) {
                        debug('--> Updated Plant State: failed');
                        return null;
                    }
                    debug('Updated Plant State');

                } else if (status == "closed") {
                    const plant = await stateManagementService.getPlantState(plant_id);

                    // 'plant state' is PENDING or DISABLED
                    if ((plant.plant_state_id == PlantState.PENDING.id) || (plant.plant_state_id == PlantState.DISABLED.id)) {
                        // check plant existance
                        this.client.publish('server/check_plant', JSON.stringify({ slot_code, plant_id }));
                    }
                } else {

                    // Wrong Format
                    return null;
                }

                // send a webhook
                const baseUrl = config.get('webhook.client_base_url');
                const webhookUrl = `${baseUrl}/webhook/door_status/${plant_id}`;
                const webhookBody = { slot_code, status };

                axios.post(webhookUrl, webhookBody)
                    .then(() => {
                        debug('Webhook sent successfully');
                    })
                    .catch((error) => {
                        debug('Error sending webhook:', error.message);
                    });

            } else if (topic.toString() === 'controller/plant_status') {
                debug('Received MQTT signal in topic: controller/plant_status');

                // get an mqtt payload
                const payload = JSON.parse(message);
                const { slot_code, plant_id, plant_detected } = payload;

                // check if data missing
                if (!slot_code || !plant_id) {
                    debug('Received MQTT but data in the payload is missing');
                    return null;
                }


                if (plant_detected == true) {
                    // update plant state
                    // PENDING --> READY
                    let updatedData = await plantManagementService.requestChangePlantState(plant_id, PlantState.READY.id, PlantState.PENDING.id);
                    console.log(updatedData);

                    // updated failed
                    if (!updatedData) {
                        debug('--> Updated Plant State: failed');
                        return null;
                    }
                    debug('Updated Plant State');

                    // update plant state
                    // DISABLED --> READY
                    updatedData = await plantManagementService.requestChangePlantState(plant_id, PlantState.READY.id, PlantState.DISABLED.id);
                    console.log(updatedData);

                    // updated failed
                    if (!updatedData) {
                        debug('--> Updated Plant State: failed');
                        return null;
                    }
                    debug('Updated Plant State');
                }

                // send a webhook
                const baseUrl = config.get('webhook.client_base_url');
                const webhookUrl = `${baseUrl}/webhook/plant_state/${plant_id}`;
                const webhookBody = { slot_code, plant_detected };

                axios.post(webhookUrl, webhookBody)
                    .then(() => {
                        debug('Webhook sent successfully');
                    })
                    .catch((error) => {
                        debug('Error sending webhook:', error.message);
                    });

            } else if (topic.toString() === 'controller/pickup_status') {
                debug('Received MQTT signal in topic: controller/door_status');

                // get an mqtt payload
                const payload = JSON.parse(message);
                const { slot_code, plant_id, status } = payload;

                // check if data missing
                if (!slot_code || !plant_id || !status) {
                    debug('Received MQTT but data in the payload is missing');
                    return null;
                }

                if (status == "success") {
                    // update plant state
                    // RESERVED --> SOLD
                    const updatedData = await plantManagementService.requestChangePlantState(plant_id, PlantState.SOLD.id);
                    console.log(updatedData);

                    // updated failed
                    if (!updatedData) {
                        debug('--> Updated Plant State: failed');
                        return null;
                    }
                    debug('Updated Plant State');
                }

                // send a webhook
                const baseUrl = config.get('webhook.client_base_url');
                const webhookUrl = `${baseUrl}/webhook/pickup_status/${plant_id}`;
                const webhookBody = { slot_code, status };

                axios.post(webhookUrl, webhookBody)
                    .then(() => {
                        debug('Webhook sent successfully');
                    })
                    .catch((error) => {
                        debug('Error sending webhook:', error.message);
                    });
            }

        } catch(error) {
            debug('Error parsing MQTT message:', error.message);
        }
    }
}

module.exports = new MqttConnectionController();
