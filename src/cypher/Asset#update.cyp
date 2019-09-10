MATCH 
    (entity:ODRL:Asset {uid: $param.uid})
SET 
    entity = $param

// TODO