# Session Server

## Setup
1. Ensure you have Docker and Docker Compose installed on your computer
2. Run `docker compose up`
    - If you need to edit the code, you'll have to build new images to see the changes. Do this by running `docker compose down` to kill the currently running containers (which will wipe the data in the database). Then run `docker compose build` to add the new changes to the build. Then finally run `docker compose up` to run the new code.
3. Server should be running on http://localhost:8888

## The API
1. `/` = test endpoint
     - takes GET requests only
     - returns status code 200 and `'Hello World'` everytime
     - Use this to verify that the server is indeed running

2. `/register` = registration endpoint -> creates a user profile and their account
     - only takes POST requests
     - requires JSON body of 
    ```
        {
            "username":"username",
            "email":"email@email.com",
            "password":"password"
        }
    ```
     - Returns status code 400 if the username or email is taken
     - Returns status code 422 if the JSON body doesn't fit the format
     - Returns status code 500 on server error
     - Returns status code 201 on success 

3. `/login` = login endpoint -> establishes the session
     - takes POST requests only
     - requires JSON body of 
     ```
        {
            "username":"username",
            "password":"password"
        }
        OR
        {
            "email":"email@email.com",
            "password":"password"
        }
     ```
     - Returns status code 400 if the username or email isn't found
     - Returns status code 401 if the password is incorrect
     - Returns status code 422 if the JSON body doesn't fit the format
     - Returns status code 500 on server error
     - Returns status code 200 on success

4. `/logout` = logout endpoint -> destroys the session
     - Only takes POST requests
     - Returns status code 401 if the user isn't logged in
     - Returns status code 200 on success

5. `/myaccount` = account endpoint -> displays account data
     - Only takes GET requests
     - Returns status code 401 if the user isn't logged in 
     - Returns status code 500 if on server error 
     - Returns status code 200 if on success alongside JSON data in the format of
     ```
        {
            "username":"username",
            "accountID":"acountID",
            "balance":number,
        }
     ```

6. `/deposit` = deposit endpoint -> adds account balance 
     - Only takes POST requests
     - Requires 1 query parameter: `amount` (which is the amount you want to deposit)
          - e.g http://localhost:8888/deposit?amount=1000
     - Returns status code 400 if the `amount` query parameter is missing
     - Returns status code 401 if the user isn't logged in
     - Returns status code 500 on server error
     - Returns status code 200 on success
     
7. `/transfer` = transfer endpoint -> transfers a specified amount of money from the current user logged in
     - Only takes POST requests
     - Requires 2 query parameters: `receiver` (the **username** of the account you want to transfer money to) and `amount` (the amount you want to transfer)
          - e.g. http://localhost:8888/deposit?receiver=totalNotAnAttacker&amount=1000
     - Returns status code 403 if receiver's username is the same as the current user's username or if the user cannot afford the transfer
          - JSON error message will specifiy which 
     - Returns status code 401 if user isn't logged in
     - Returns status code 400 if receiver's username isn't found in the database or if any of the query parameters are missing 
          - JSON error message will specifiy which 
     - Returns status code 500 on server error
     - Returns status code 200 on success
