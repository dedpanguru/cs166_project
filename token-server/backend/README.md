# Token Server Backend
## 4 endpoints:
1. **/api/register** = user registration endpoint
   * Requires JSON body with the following format:
    ```
    {
      "username":"username",
      "password":"password"
    }
    ```
    * Only takes POST requests
    * Responds with response code 201 and the token string as plaintext on success, 422 on JSON input error (i.e. format doesn't match), 405 for HTTP Method errors (this endpoint only allows POST requests), and 500 on any server-side error.
    * *Ideally, this endpoint is used to enter a new user into the database*
 2. **/api/login** = user login endpoint
    * Requires JSON body with the following format:
    ```
    {
      "username":"username",
      "password":"password"
    }
    ```
    * Only takes POST requests
    * Responds with status code 202 and a token in plaintext if the token associated with the user in the database is either expired or deleted, 400 if user credentials are not found in the database (i.e. user doesn't have an account yet), 422 if the JSON body doesn't follow the format, 401 if the input password was wrong or user already has a valid token, 405 if the HTTP Method was not POST, and 500 for any server-side error.
    * *Ideally, this endpoint is requested when a user already has a account but their token expired or was deleted*
 3. **/api/logout** = user logout endpoint
    * Requires JSON body with the following format:
    ```
    {
      "username":"username",
      "password":"password"
    }
    ```
    * Also requires a bearer token in the Authorization header, should look like ```Authorization: Bearer <token>```
    * Only takes POST requests
    * Responds with status code 202 on success with no request body, 401 on invalid username or password, 422 if the JSON body doesn't follow the format, and 500 for any server-side error
    * *Ideally, this endpoint is requested when a user wants to delete their token to prevent someone else from using it*
 4. **/api/assets/:resource** = resource access endpoint
    * Requires JSON body with the following format:
    ```
    {
      "username":"username",
      "password":"password"
    }
    ```
    * Also requires a bearer token in the Authorization header, should look like ```Authorization: Bearer <token>```
    * The ```:resource``` part of the request url should be a filename (e.g. ```/api/assets/treasure.png```)
    * Only takes GET requests
    * Responds with status code 202 and requested file on success, 401 for invalid username, password, or token (response body will tell which one is invalid), 403 if the user is already logged out, 404 if the file isn't found, and 500 for any server-side error
    * *Ideally, this endpoint is requested to test a user's credentials*

