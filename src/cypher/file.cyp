MATCH (entity:ODRL {uid: $uid, type: $type})
OPTIONAL MATCH (entity)-[rel]->(:ODRL)
WITH collect(rel) AS rels, collect(type(rel)) AS relTypes, labels(entity) AS types, properties(entity) AS param
FOREACH (type IN relTypes | SET param[type] = [])
FOREACH (rel IN rels | WITH param[type(rel)] AS list SET list[size(list)] = endNode(rel).uid)
RETURN param, types