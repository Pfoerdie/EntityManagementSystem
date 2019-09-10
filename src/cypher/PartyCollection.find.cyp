MATCH 
    (entity:ODRL:PartyCollection)
WHERE 
    all(
        key IN keys($param) 
        WHERE entity[key] = $param[key]
    )
    AND NOT entity:blank

OPTIONAL MATCH 
    (entity)-[:partOf*]->(partOf:ODRL:PartyCollection)

WITH 
    properties(entity) AS param,
    [entry IN collect(DISTINCT partOf) WHERE NOT entry:blank | entry.uid] AS partOf

RETURN
    param,
    partOf
LIMIT 2