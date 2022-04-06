## Setup
1. Install Docker on your computer
2. Clone repository onto your computer
3. Configure the backend's secret key the server in the ```docker-compose.yml``` file
  * default secret key is ```secretsecretsecret```
5. Run ```docker compose up``` 
6. Backend will be running on http://0.0.0.0:<port assigned to it by the docker compose file, defaults to 8080>
   * customize which port to run it on by setting your system's ```SERVER_PORT``` environment variable to the desired port number
