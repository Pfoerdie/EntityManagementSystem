MERGE 
    (entity:ODRL:Asset:blank {uid: $param.uid})
SET 
    entity = $param
REMOVE
    entity:blank
RETURN
    true AS created