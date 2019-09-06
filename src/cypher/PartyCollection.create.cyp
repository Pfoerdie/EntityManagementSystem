MERGE 
    (entity:ODRL:PartyCollectionCollection:blank {uid: $param.uid})
SET 
    entity = $param
REMOVE
    entity:blank

FOREACH(
    target IN $rels.partOf |
    MERGE (entity)-[:partOf]->(node:ODRL:PartyCollectionCollection {uid: target})
    ON CREATE SET node:blank
)