MATCH 
    (entity:ODRL:Asset)
WHERE 
    all(
        key IN keys($param) |
        entity[key] = $param[key]
    )
OPTIONAL MATCH 
    (entity)-[rel]->(:ODRL)
WITH 
    collect(rel) AS rels, 
    collect(type(rel)) AS relTypes, 
    properties(entity) AS result
FOREACH (
    type IN relTypes | 
    SET result[type] = []
)
FOREACH (
    rel IN rels | 
    WITH result[type(rel)] AS list 
    SET list[size(list)] = endNode(rel).uid
)
RETURN 
    result AS param
LIMIT
    2