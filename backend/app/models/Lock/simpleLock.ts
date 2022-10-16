class SimpleLock {
    private locked: boolean;
    constructor() {
        this.locked = false;
    }

    // To acquire the lock, lock must be available.
    // Make sure to release it after the process is done.
    acquire() {
        if (this.locked) return false;
        this.locked = true;
        return true;
    }

    release() {
        this.locked = false;
    }

    // Whether or not this lock is available to
    // be acquired.
    isLocked() {
        return this.locked;
    };
}

export default SimpleLock;
