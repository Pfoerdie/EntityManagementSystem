MATCH 
    (entity:ODRL:Asset {uid: $param.uid, type: $param.type})
SET 
    entity = $param

// TODO