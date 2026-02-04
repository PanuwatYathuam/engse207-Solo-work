const database = require('../../database/connection');
const Task = require('../models/Task');

class TaskRepository {
    async findAll() {
        const rows = await database.all('SELECT * FROM tasks');
        return rows.map(r => new Task(r));
    }

    async findById(id) {
        const row = await database.get('SELECT * FROM tasks WHERE id=?', [id]);
        return row ? new Task(row) : null;
    }

    async create(task) {
        const t = task.toDatabase();
        const result = await database.run(
            'INSERT INTO tasks(title,description,status,priority) VALUES(?,?,?,?)',
            [t.title, t.description, t.status, t.priority]
        );
        return this.findById(result.lastID);
    }

    async update(id, data) {
        await database.run(
            'UPDATE tasks SET title=?,description=?,status=?,priority=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',
            [data.title, data.description, data.status, data.priority, id]
        );
        return this.findById(id);
    }

    async delete(id) {
        await database.run('DELETE FROM tasks WHERE id=?', [id]);
        return true;
    }
}

module.exports = new TaskRepository();
