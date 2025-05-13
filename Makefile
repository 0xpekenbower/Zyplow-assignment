DCM=docker compose -f docker-compose.yml

all: build up

build:
	$(DCM) build

up:
	$(DCM) up -d

down:
	$(DCM) down

stop:
	$(DCM) stop

restart:
	$(DCM) restart

clean:
	$(DCM) down -v --rmi all --remove-orphans

logs:
	$(DCM) logs -f

.PHONY: build up down stop restart logs