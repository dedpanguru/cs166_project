#!/bin/bash

mongosh admin --host localhost -u root -p root --eval "db.createUser({user:'username', pwd:'password', roles:[{role:'readWrite', db:'admin'}]});"