-- POST/developers:
INSERT INTO
    developers (% I)
VALUES
    (% L) RETURNING *;

-- Read all developers:
SELECT
    *
FROM
    developers;

-- POST / developers / :id / infos:
INSERT INTO
    "developerInfos" (% I)
VALUES
    (% L) RETURNING *;

-- Vincular o developer a "developerInfos"
UPDATE
    developers
SET
    "developerInfos" = $ 1
WHERE
    id = $ 2;

-- Listar todas as "developerInfos"
SELECT
    *
FROM
    "developerInfos";

-- Unificar as tabelas developers e "developerInfos"
SELECT
    *
FROM
    developers AS "dev"
    JOIN "developerInfos" AS "infos" ON "dev"."id" = "infos"."developerId";