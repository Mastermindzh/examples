var result = [];
db.getCollectionInfos().forEach(function(collection) {
    var collectionResult = {name: collection.name, count: db[collection.name].count()}
    result.push(collectionResult);
});
printjson(result); 

// resulting in:
// [
// 	{
// 		"name" : "test",
// 		"count" : 1
// 	},
// 	{
// 		"name" : "test2",
// 		"count" : 3
// 	}
// ]
