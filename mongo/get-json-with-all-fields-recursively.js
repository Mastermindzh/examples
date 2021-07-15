// This script will allow you to take an existing mongo collection
// with many documents that are all partials of a common schema
// and merge them together into a single instance, giving you a json schema

// check whether value is an object
function isObject(value) {
  return value && typeof value === "object";
}

function mergeDeep(...objects) {
  return objects.reduce((target, source) => {
    Object.keys(source).forEach((key) => {
      const targetKey = target[key];
      const sourceKey = source[key];

      if (Array.isArray(sourceKey)) {
        if (!Array.isArray(targetKey)) {
          target[key] = [];
        }

        // if array contains object
        if (isObject(sourceKey[0])) {
          if (!target[key][0]) {
            target[key] = [{}];
          }

          var reduced = sourceKey.reduce((oldObject, newObject) => {
            return mergeDeep(oldObject, newObject);
          });

          target[key] = [mergeDeep(target[key][0], reduced)];
        } else {
          // keep a single value
          target[key] = sourceKey.length > 1 ? sourceKey[0] : sourceKey;
        }
      } else if (isObject(targetKey) && isObject(sourceKey)) {
        target[key] = mergeDeep(targetKey, sourceKey);
      } else {
        target[key] = sourceKey;
      }
    });

    return target;
  }, {});
}
var dataStructure = {};

db.getCollection("test")
  .find({})
  .forEach(function (doc) {
    dataStructure = mergeDeep(dataStructure, doc);
  });

JSON.stringify(mergeDeep(dataStructure, { _id: "uniqueId" }), null, 2);

// EXAMPLE

// example input:
/* 1 */
// {
//   "_id" : ObjectId("60f00f55a142cf9637dd62f9"),
//   "complicatedArray" : [
//       {
//           "a" : "a"
//       }
//   ]
// }

// /* 2 */
// {
//   "_id" : ObjectId("60f00f5ea142cf9637dd630e"),
//   "complicatedArray" : [
//       {
//           "b" : "b"
//       },
//       {
//           "c" : "c"
//       }
//   ]
// }

// /* 3 */
// {
//   "_id" : ObjectId("60f01664a142cf9637dd654d"),
//   "complicatedArray" : [
//       {
//           "b" : "b"
//       },
//       {
//           "anotherNest" : {
//               "d" : "d",
//               "more nesting" : {
//                   "e" : "test"
//               }
//           }
//       }
//   ]
// }

// /* 4 */
// {
//   "_id" : ObjectId("60f02995a142cf9637dd6b08"),
//   "complicatedArray" : [
//       {
//           "anotherNest" : {
//               "f" : "f"
//           }
//       }
//   ],
//   "simpleArray" : [
//       0,
//       6,
//       7,
//       4
//   ],
//   "simpleArray2" : [
//       "string",
//       "string2"
//   ]
// }

// outputs
// {
//   "_id": "uniqueId",
//   "complicatedArray": [
//     {
//       "a": "a",
//       "b": "b",
//       "c": "c",
//       "anotherNest": {
//         "d": "d",
//         "more nesting": {
//           "e": "test"
//         },
//         "f": "f"
//       }
//     }
//   ],
//   "simpleArray": 0,
//   "simpleArray2": "string"
// }
