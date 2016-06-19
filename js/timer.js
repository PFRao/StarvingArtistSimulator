function Clock () {
  // 1. Create a Date object.
  this.currentTime = 60;

  // 3. Call printTime.
  this.printTime();

  // 4. Schedule the tick at 1 second intervals.
  setInterval(this._tick.bind(this), 1000);
}

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  // const timeString = [this.hours, this.minutes, this.seconds].join(":");

  // Use console.log to print it.
  console.log(this.currentTime);
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  this._incrementSeconds();

  // 2. Call printTime.
  this.printTime();
};

Clock.prototype._incrementSeconds = function () {
  // 1. Increment the time by one second.
  this.currentTime -= 1;
};

module.exports = Clock();
