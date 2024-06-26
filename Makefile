-include .env

start:
	docker compose up -d --build

stop:
	docker compose down

django-migrate:
	docker exec -it ${NOMBRE_APP}_websrv python manage.py makemigrations
	docker exec -it ${NOMBRE_APP}_websrv python manage.py migrate	
	
django-createsuperuser:
	docker exec -it ${NOMBRE_APP}_websrv python manage.py createsuperuser

	

	

	
	