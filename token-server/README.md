# JSON Web Token Server
## Setup
1. 
2. 
## 4 endpoints:
1. **/api/register** = registration endpoint
   * Requires JSON body with the following format:
    ```
    {
      "username":"username",
      "password":"password"
    }
    ```
    * Only takes POST requests
    * Responds with response code 201 and the token string as plaintext on success, 422 on JSON input error, 405 for HTTP Method errors, and 500 on any server-side failure
 2. 
