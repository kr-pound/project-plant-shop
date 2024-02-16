const webhookListenerService = require('../service/webhook_listener');

// Validation Module
const uuid = require('uuid');
const debug = require('debug')('app:controller');

class WebhookListenerController {
    async confirm_transaction(req, res) {
        try {
            debug(`=== Webhook from Bank ===`);
            debug(`Webhook: get the request params : ${JSON.stringify(req.params, null, 2)}`);

            // Check if the ID parameter is a valid UUID
            if (!uuid.validate(req.params.transaction_id)) {
                debug(`--> Webhook: transaction_id uuid validation : failed`);
                return res.status(400).json({ exception: 'Invalid ID format.' });
            }
            debug(`Webhook: transaction_id uuid validation : pass`);

            // Processing the Request
            const result = await webhookListenerService.confirm_transaction(req.params.transaction_id);
            if (!result) {
                debug(`--> Webhook: successfully? : failed`);
                return res.status(500).json({ exception: 'Unable to process the request.' });
            }
            debug(`Webhook: successfully? : pass`);

            // Return success
            res.status(200).json({ result: 'success' });
            debug(`\nWebhook: response back to client : ${JSON.stringify(result, null, 2)}`);

        } catch (err) {
            debug(`--> Webhook: Exception Caught`);
            console.error(err);
            res.status(500).json({ exception: err.message });
        }
    }
}

module.exports = new WebhookListenerController();