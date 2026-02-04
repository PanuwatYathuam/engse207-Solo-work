class Task {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.description = data.description || '';
        this.status = data.status || 'TODO';
        this.priority = data.priority || 'MEDIUM';
    }

    isValid() {
        const errors = [];
        if (this.title.length < 3) errors.push('Title ต้องยาวอย่างน้อย 3 ตัว');
        if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(this.status))
            errors.push('Status ไม่ถูกต้อง');
        if (!['LOW', 'MEDIUM', 'HIGH'].includes(this.priority))
            errors.push('Priority ไม่ถูกต้อง');

        return { valid: errors.length === 0, errors };
    }

    toDatabase() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority
        };
    }
}

module.exports = Task;
