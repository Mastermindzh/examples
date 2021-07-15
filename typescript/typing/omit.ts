// This example will show how you can create a new type by modifying an existing type and omitting certain keys.
// This is useful for when you have similar interfaces apart from a single key
// docs: https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

/**
 * Generic range type
 */
interface range {
  start: number;
  end: number;
}

/**
 * Your original interface, with all properties
 */
interface Test {
  a: range;
  b: number;
  c: boolean;
}

/**
 * The new interface, it extends the old interface (Test) but Omits (ignores) 1 property ("a")
 * Then we add 2 new properties.
 * Final structure is similar to:
 *
 * {
 *   b: number;
 *   c: boolean;
 *   start: number;
 *   end: number;
 * }
 */
interface MyTest extends Omit<Test, "a"> {
  start: number;
  end: number;
}

/**
 * Instance of our first interface
 */
const data: Test = {
  a: { start: 0, end: 5 },
  b: 5,
  c: true,
};

/**
 * Instance of our modified interface
 */
const data2: MyTest = {
  // properties from original interface
  // a: "test", // this is invalid, type doesn't contain a...
  b: data.b,
  c: data.c,

  // properties we added to myTest
  start: data.a.start,
  end: data.a.end,
};
