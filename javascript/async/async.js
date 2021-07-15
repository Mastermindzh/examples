/**
 * log a message with an iso datetime
 * @param {*} msg msg to log
 */
const log = (msg) => {
  console.log(msg, new Date().toISOString());
};

/**
 * sleep for a certain amount of ms
 * @param {*} ms ms to sleep
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * "asyncForEach" method on every array, allowing for async functionality on any array
 */
if (!Array.prototype.asyncForEach) {
  Array.prototype.asyncForEach = async function (func) {
    "use strict";

    if (this == null) {
      throw new TypeError(
        "Array.prototype.asyncForEach called on null or undefined"
      );
    }

    if (typeof func !== "function") {
      throw new TypeError();
    }

    var t = Object(this);

    return await Promise.allSettled(
      t.map(async (item) => {
        return await func(item);
      })
    );
  };
}

// array is not in order, this will be used to test
const items = [200, 1000, 400, 300];

// starting test
log("Starting async test");

// because of the sleep we expect the responses from small -> large
items.asyncForEach(async (item) => {
  await sleep(item);
  log(item);
});

// because the previous foreach is async we expect this to run immediately.
log("after async foreach (or before? because async..)");

async function testWithAwait() {
  await items.asyncForEach(async (item) => {
    // this will sleep for whatever the largest amount in items is + currentItem.
    // this will make sure test items are displayed AFTER the first batch of items.
    // this doesn't impact the result because the code IN the foreach will still run async (just with a delayed console.log)
    await sleep(Math.max(...items) + item);
    log(`Async with wait: ${item}`);
  });

  // because of the await on line 60 this will only run AFTER the async foreach has been handled
  log("after testWithAwait");
}

testWithAwait();
