# Define the source file and target directory
ROOT_ENV_FILE := .env
TARGET_DIR := /squire-backend

# Define the target .env file
TARGET_ENV_FILE := $(TARGET_DIR)/test.py

# Define the make rule to create the .env file
all_credentials:
#  FOR PYTHON SERVER
	cd squire-backend && touch access_keys.py
	cp $(ROOT_ENV_FILE) ./squire-backend/access_keys.py
# FOR FRONTEND FUNCTIONS
	cd ./squire-frontend/functions && touch .env
	cp $(ROOT_ENV_FILE) ./squire-frontend/functions/.env

frontend:
	cd ./squire-frontend; \
	npm install; \
	npm start
	
emulators:
	cd ./squire-frontend/functions && npm run build
	cd ./squire-frontend && firebase emulators:start


backend:
	cd ./squire-backend; \
	pip3 install -r requirements.txt; \
	python3 app.py
	

	