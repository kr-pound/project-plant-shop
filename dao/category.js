const db = require('../db/db');

const debug = require('debug')('app:dao');

class CategoryDAO {
    async getAllCategories() {

        // select all
        const query = await db('categories')
            .select('*');

        return query;
    }
    async getCategory(id) {
        const [category] = await db('categories')
            .select('*')
            .where('id', id)

        if (!category) {
            debug(`--> Category: get? : failed`);
            return;
        }
        debug(`Category: get? : pass`);
        return category;
    }
}

module.exports = new CategoryDAO();
