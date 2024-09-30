/* eslint-disable max-classes-per-file */
class Channel {
  constructor(initialValue = {}) {
    this.listeners = {};
    this.data = initialValue;
  }

  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => listener(data));
    }
  }

  off(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== callback);
    }
  }

  set(key, value) {
    if (this.data[key] !== value) {
      this.data[key] = value;
      this.emit('dataChange', { key, value });
    }
  }

  get(key) {
    return this.data[key];
  }
}

class EventEmitter {
  channels = {};

  getChannel = (channelName) => {
    if (!this.channels[channelName]) {
      this.channels[channelName] = new Channel();
    }
    return this.channels[channelName];
  };
}

export default new EventEmitter();
