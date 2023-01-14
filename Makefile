include .env
export $(shell sed 's/=.*//' .env)

DC=docker compose -f production.yaml

backup-database:
	@echo "Backing up database...";
	${DC} exec -i database \
		/bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} pg_dump --username ${DATABASE_USERNAME} ${DATABASE_NAME}" > ./backups/$(shell date +backup_%Y%m%d_%H%M%S.sql)
	@echo "Backed up!";

restore-database:
	@echo "Restoring database...";
	${DC} exec -T database \
		/bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} psql --username ${DATABASE_USERNAME} ${DATABASE_NAME}" < backups/$(shell dir -1tr backups/ | tail -n 1 | awk '{print $$NF}')
	@echo "Restored!";

dump-backend-config:
	@echo "Dumping config...";
	${DC} run --rm -i backend sh -c "npm run strapi -- configuration:dump" | tail -n1 > ./config/strapi-config.json
	@echo "Dumped!";

restore-backend-config:
	@echo "Restoring config...";
	${DC} run --rm -T backend sh -c "npm run strapi -- configuration:restore" < ./config/strapi-config.json
	@echo "Restored!";

build:
	${DC} build

start:
	${DC} up -d

update: backup-database build start restore-database restore-backend-config
