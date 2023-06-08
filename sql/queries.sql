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

-- Update developer by Id:
UPDATE
    developers
SET
    (% I) = ROW(% L)
WHERE
    id = $ 1 RETURNING *;

-- Delete developer by Id:
DELETE FROM
    clients
WHERE
    id = $ 1;

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

-- Select developerInfos
SELECT
    "dev"."id" AS "developerId",
    "dev"."name" AS "developerName",
    "dev"."email" AS "developerEmail",
    "infos"."developerSince" AS "developerInfoDeveloperSince",
    "infos"."preferredOS" AS "developerInfoPreferredOS"
FROM
    "developerInfos" AS "infos"
    JOIN developers AS "dev" ON "infos"."developerId" = "dev"."id"
WHERE
    "infos"."id" = $ 1;

-- Select project by id:
SELECT
    *
FROM
    projects
WHERE
    id = $ 1;

-- Select project by projectId:
SELECT
    "pro"."id" "projectId",
    "pro"."name" "projectName",
    "pro"."description" "projectDescription",
    "pro"."repository" "projectRepository",
    "pro"."startDate" "projectStartDate",
    "pro"."endDate" "projectEndDate",
    "dev"."name" "projectDeveloperName"
FROM
    developers "dev"
    LEFT OUTER JOIN projects AS "pro" ON "pro"."developerId" = "dev"."id"
WHERE
    "pro"."id" = $ 1;