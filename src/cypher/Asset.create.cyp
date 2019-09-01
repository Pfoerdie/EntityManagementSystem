MERGE 
    (entity:ODRL:Asset:blank {uid: $param.uid})
SET 
    entity = $param
REMOVE
    entity:blank

FOREACH(
    target IN $rels.partOf |
    MERGE (entity)-[:partOf]->(node:ODRL:AssetCollection {uid: target})
    ON CREATE SET node:blank
)

FOREACH(
    target IN $rels.hasPolicy |
    MERGE (entity)-[:hasPolicy]->(node:ODRL:Policy {uid: target})
    ON CREATE SET node:blank
)