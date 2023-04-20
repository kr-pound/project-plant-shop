const debug = require('debug')('app:service');

class DateHandlingService {
    calculateNextDue(currentDate, wateringPeriod) {
        debug(`DateHandling: Calculating next due date based on currentDate: ${currentDate} and wateringPeriod: ${wateringPeriod}`);
        const nextDueDate = new Date(currentDate.setDate(currentDate.getDate() + wateringPeriod));
        debug(`DateHandling: Calculated next due date: ${nextDueDate}`);
        return nextDueDate;
    }
}

module.exports = new DateHandlingService();