db = db.getSiblingDB("admin");
dbs = db.runCommand({ listDatabases: 1 }).databases;

var indexList = {};

dbs.forEach(function (database) {
  db = db.getSiblingDB(database.name);
  db.getCollectionNames().forEach(function (collection) {
    indexes = db[collection].getIndexes();
    indexList[`${database.name}/${collection}`] = indexes;
  });
});

printjson(indexList);
