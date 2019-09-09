export class Dispatcher {
  constructor() {
    this.events = {};
  }

  addListener(event, callback) {
    // check if the callback is not a function
    if (typeof callback !== "function") {
      console.error(
        `The listener callback must be a function, the given type is ${typeof callback}`
      );
      return false;
    }

    // check if the event is not a string
    if (typeof event !== "string") {
      console.error(
        `The event name must be a string, the given type is ${typeof event}`
      );
      return false;
    }

    // check to see if event exists
    if (this.events[event] === undefined) {
      this.events[event] = {
        listeners: []
      };
    }

    this.events[event].listeners.push(callback);
  }

  removeListener(event, callback) {
    // check to see if the event exists
    if (this.events[event] === undefined) {
      console.error(`This event: ${event} does not exist`);
      return false;
    }

    this.events[event].listeners = this.events[event].listeners.filter(
      listener => {
        return listener.toString() !== callback.toString();
      }
    );
  }

  dispatch(event, details) {
    // check to see if the event exists
    if (this.events[event] === undefined) {
      console.error(`This event: ${event} does not exist`);
      return false;
    }

    this.events[event].listeners.forEach(listener => {
      listener(details);
    });
  }
}
