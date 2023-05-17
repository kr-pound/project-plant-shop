const config = require('config');

const axios = require('axios');

class WebhookListenerService {

    async confirm_transaction(transaction_id) {

        const baseUrl = config.get('webhook.client_base_url');
        const webhookUrl = `${baseUrl}/webhook/payment_status/${transaction_id}`;
        const requestBody = {
            status: 'success'
        };

        try {
            const response = await axios.post(webhookUrl, requestBody);
            return response.data;
        } catch (error) {
            console.error(`Error sending webhook: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new WebhookListenerService();