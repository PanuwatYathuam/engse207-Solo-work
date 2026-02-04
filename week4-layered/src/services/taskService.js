const Task = require('../models/Task');
const repo = require('../repositories/taskRepository');

class TaskService {
    async getAll() {
        return repo.findAll();
    }

    async getById(id) {
        const task = await repo.findById(id);
        if (!task) throw new Error('ไม่พบ task');
        return task;
    }

    async create(data) {
        const task = new Task(data);
        const v = task.isValid();
        if (!v.valid) throw new Error(v.errors.join(', '));

        if (task.priority === 'HIGH' && !task.description)
            throw new Error('HIGH ต้องมี description');

        return repo.create(task);
    }

    async update(id, data) {
        const old = await this.getById(id);
        return repo.update(id, { ...old, ...data });
    }

    async delete(id) {
        await this.getById(id);
        return repo.delete(id);
    }
}

module.exports = new TaskService();
