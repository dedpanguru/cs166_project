## Setup
1. Install Docker on your computer
2. Clone repository onto your computer
3. Optionally, configure the backend's secret key in the ```docker-compose.yml``` file
   * Default secret key is ```secretsecretsecret```
4. Backend will be running on http://0.0.0.0:8080 by default
   * Customize which *port* to run it on by setting your system's ```SERVER_PORT``` environment variable to the desired port number before running
   * If you are fine with that URL, then you don't have to do anything, just make sure that a different process isn't already bound to that URL on your system.
5. Run ```docker compose up```
6. That's it! Take a look inside the ```/backend``` folder to see which endpoints you can now request.
