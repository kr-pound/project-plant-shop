const categoryDAO = require('../../dao/category');

const debug = require('debug')('app:service');

class CategoryService {
    async getAllCategories() {
        debug(`Category: getting..`);
        return categoryDAO.getAllCategories();
    }
    async getCategory(id) {
        debug(`Category: get id : ${id}`);
        debug(`Category: getting..`);
        return categoryDAO.getCategory(id);
    }
}

module.exports = new CategoryService();
