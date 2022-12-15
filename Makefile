include .env
export $(shell sed 's/=.*//' .env)

backup-database:
	@echo "Backing up database...";
	docker-compose -f production.yaml exec -i database \
		/bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} pg_dump --username ${DATABASE_USERNAME} ${DATABASE_NAME}" > ./backups/$(shell date +backup_%Y%m%d_%H%M%S.sql)
	@echo "Backed up!";

restore-database:
	@echo "Restoring database...";
	docker-compose -f production.yaml exec -T database \
		/bin/bash -c "PGPASSWORD=${DATABASE_PASSWORD} psql --username ${DATABASE_USERNAME} ${DATABASE_NAME}" < backups/$(shell dir -tr backups/ | tail -n 1 | awk '{print $$NF}')
	@echo "Restored!";
