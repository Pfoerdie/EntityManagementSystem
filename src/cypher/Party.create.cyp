MERGE 
    (entity:ODRL:Party:blank {uid: $param.uid})
SET 
    entity = $param
REMOVE
    entity:blank
RETURN
    true AS created