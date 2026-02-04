const service = require('../services/taskService');

class TaskController {
    async getAll(req, res, next) {
        try {
            res.json(await service.getAll());
        } catch (e) { next(e); }
    }

    async get(req, res, next) {
        try {
            res.json(await service.getById(+req.params.id));
        } catch (e) { next(e); }
    }

    async create(req, res, next) {
        try {
            res.status(201).json(await service.create(req.body));
        } catch (e) { next(e); }
    }

    async update(req, res, next) {
        try {
            res.json(await service.update(+req.params.id, req.body));
        } catch (e) { next(e); }
    }

    async delete(req, res, next) {
        try {
            await service.delete(+req.params.id);
            res.json({ success: true });
        } catch (e) { next(e); }
    }
}

module.exports = new TaskController();
