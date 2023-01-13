class Observer {
  constructor() {
    this.message = {}
  };
  $on(type, callback) {
    if (!this.message[type]) {
      this.message[type] = [];
    }
    this.message[type].push(callback);
  }
  $off(type, callback) {
    if (!this.message[type]) {
      return;
    }
    if (!callback) {
      this.message[type] = undefined;
      return;
    }
    this.message[type] = this.message[type].filter((item) => item != callback);
  }
  $emit(type) {
    if (!this.message[type]) return;
    this.message[type].forEach(item => {
      item();
    });
  }
}