const mqtt = require('mqtt');

const plantService = require('./plant/plant');
const slotService = require('./slot/slot');

const debug = require('debug')('app:service');

class MqttHandlingService {
    constructor(options) {
        this.client = mqtt.connect(options.host, options);
    }

    // request to open the door
    async requestOpen(plant_id) {

        debug(`MqttHandling: fetching 'plant' and 'slot' data..`);
        const plant = await plantService.getPlant(plant_id);
        const slot = await slotService.getSlot(plant.slot_id);

        try {
            await this.publishJson('server/request_open', { slot_code: slot.slot_code, plant_id: plant.id });
            console.log('Message published successfully!');
            return { result: 'success' };
        } catch (err) {
            console.error('Error publishing message:', err);
            throw err;
        }
    }

    // request to close the door
    async requestClose(plant_id) {

        debug(`MqttHandling: fetching 'plant' and 'slot' data..`);
        const plant = await plantService.getPlant(plant_id);
        const slot = await slotService.getSlot(plant.slot_id);

        try {
            await this.publishJson('server/request_close', { slot_code: slot.slot_code, plant_id: plant.id });
            console.log('Message published successfully!');
            return { result: 'success' };
        } catch (err) {
            console.error('Error publishing message:', err);
            throw err;
        }
    }

    // request to pickup the plant
    async requestPickup(plant_id) {

        debug(`MqttHandling: fetching 'plant' and 'slot' data..`);
        const plant = await plantService.getPlant(plant_id);
        const slot = await slotService.getSlot(plant.slot_id);

        try {
            await this.publishJson('server/request_pickup', { slot_code: slot.slot_code, plant_id: plant.id });
            console.log('Message published successfully!');
            return { result: 'success' };
        } catch (err) {
            console.error('Error publishing message:', err);
            throw err;
        }
    }

    async publishJson(topic, json) {

        console.log(json);

        const payload = JSON.stringify(json);

        return new Promise((resolve, reject) => {
            this.client.publish(topic, payload, (err) => {
              if (err) {
                console.error(`Error publishing message to topic ${topic}:`, err);
                reject(err);
              } else {
                console.log(`Message published to topic ${topic}:`, payload);
                resolve();
              }
            });
        });
    }
}

module.exports = MqttHandlingService;
