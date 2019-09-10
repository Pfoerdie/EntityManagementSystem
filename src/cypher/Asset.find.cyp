MATCH
    (entity:ODRL:Asset)
WHERE
    all(
        key IN keys($param)
        WHERE entity[key] = $param[key]
    )
    AND NOT entity:blank

OPTIONAL MATCH 
    (entity)-[:partOf*]->(partOf:ODRL:AssetCollection),
    (entity)-[:hasPolicy]->(hasPolicy:ODRL:Policy)

WITH
    properties(entity) AS param,
    [entry IN collect(DISTINCT partOf) WHERE NOT entry:blank | entry.uid] AS partOf,
    [entry IN collect(DISTINCT hasPolicy) WHERE NOT entry:blank | entry.uid] AS hasPolicy

RETURN
    param,
    partOf,
    hasPolicy
LIMIT 2