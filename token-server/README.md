## Setup
1. Install Docker on your computer
2. Clone repository onto your computer
3. Optionally, configure the backend's secret key in the ```docker-compose.yml``` file
   * Default secret key is ```secretsecretsecret```
4. Backend will be running on http://0.0.0.0:8080 by default
   * Customize which *port* to run it on by setting your system's ```SERVER_PORT``` environment variable to the desired port number before running
5. Run ```docker compose up```
