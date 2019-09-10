MERGE 
    (entity:ODRL:PartyCollectionCollection:blank {uid: $param.uid})
SET 
    entity = $param
REMOVE
    entity:blank
RETURN 
    true AS created