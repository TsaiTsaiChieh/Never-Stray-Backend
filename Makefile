up:
	docker-compose up
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
down:
	docker-compose down -v
rmi:
	docker rmi ns_node-app
rebuild:
	docker-compose build