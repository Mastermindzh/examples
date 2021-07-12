db.getCollection('myCollection').update(
    {$or:[{"name":null},{"name":{$exists:false}}]},
    {$set:{"name":"default, value"}}, 
    {multi:true}
);
