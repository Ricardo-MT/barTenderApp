class SimpleLock {
    locked: boolean;
    constructor() {
        this.locked = false;
    }

    acquire() {
        if (this.locked) return false;
        this.locked = true;
        return true;
    }

    release() {
        this.locked = false;
    }
}

export default SimpleLock;
