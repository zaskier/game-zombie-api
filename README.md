# Description of game-zombie-api
API for game CRUD operations on zombies and their inventory and transaction related to their item exchange
It is using.

Aplication calculates total value of items for every zombie in: USD, Eu, pln.
Application gets items price in pln from API https://zombie-items-api.herokuapp.com/api/items
Application gets currency rates from API http://api.nbp.pl/api/exchangerates/tables/C/today/
- app can work locally or be hosted on Cloud Services
- application works with CRUD operations using MongoDB
- application is formated wit ESLint


# Assummption of Initial state of working application

- authentication is not provided for this state(usually i would do it for App Engine with Identity Aware Proxy(GCP))
- The zombie can have a maximum of 5 items. If there are more item in the request i POST request it will be not accepted. (TO DO PATCH, PUT)
- If featched zombie-items-api or exchangerates would not workproperly new entry cannot be created.(TODO)
# To run locally aplication:
```
git clone  https://github.com/zaskier/game-zombie-api.git
⦁ cd game-zombie-api
⦁ npm install 
⦁ mongod //this command should be done in another terminal, to add mongod perform this tutorial https://www.youtube.com/watch?v=FwMwO8pXfq0 
⦁ node app.js
```
# To run upload on GCP App Engine project commands
```
⦁ git clone  https://github.com/zaskier/game-zombie-api.git
⦁ cd game-zombie-api
⦁ gcloud config set project {project-id}
⦁ gcloud app deploy
```


# TO TEST HTTP CRUD API Actions


  - [POST /zombie](#post-zombie) - Add new entry 
    - request body
   ```
    {
     "name": "not.surname@test.com",   
     "creationDate": "01.01.2021" ,
      "valueOfItems" :  {
             "pln": 21,
             "usd": 34,
             "eu": 41
           },
    "items":[
        {"id":1,"name":"Diamond Sword","price":100},
        {"id":2,"name":"Trident","price":200},
        {"id":3,"name":"Wooden Hoe","price":50},
        {"id":4,"name":"Fishing Rod","price":150},
        {"id":5,"name":"Elytra","price":110}
    ]
}

   ```
   - example request response 
   ```
    {
    "_id": "60abd9b28ea12d536869c47e",
    "name": "not.surname@test.com",
    "creationDate": "01.01.2021",
    "valueOfItems": [
        {
            "_id": "60abd9b28ea12d536869c47f",
            "pln": 21,
            "usd": 34,
            "eu": 41
        }
    ],
    "items": [
        {
            "_id": "60abd9b28ea12d536869c480",
            "id": 1,
            "name": "Diamond Sword",
            "price": 100
        },
        {
            "_id": "60abd9b28ea12d536869c481",
            "id": 2,
            "name": "Trident",
            "price": 200
        },
        {
            "_id": "60abd9b28ea12d536869c482",
            "id": 3,
            "name": "Wooden Hoe",
            "price": 50
        },
        {
            "_id": "60abd9b28ea12d536869c483",
            "id": 4,
            "name": "Fishing Rod",
            "price": 150
        },
        {
            "_id": "60abd9b28ea12d536869c484",
            "id": 5,
            "name": "Elytra",
            "price": 110
        }
    ]
}
   ```
  - [GET /zombie/[?name=name]](#get-name) - get's all elements but it can be also filtered by optional URL parameter "name"
   ## Operation on specified record  {http://localhost:8080}/api/weather/{_id} 
  - [GET /weather/[entryID]](#get-entryID) -  gets entry 
  - [PUT /weather/[entryID]](#put-entryID)  - modifies entry
      - request body
  ```

TO BE ADDED
   ```
  - [PATCH /zombie/[entryID]](#patch-entryID) - modify specified params of body
  - [DELETE /zombie/[entryID]](#delete-entryID) - delete record

  - [POST /zombie/iventory](#post-zombie) - Add new item 
  - [DELETE /zombie/inventory](#post-zombie) - remove new item 

# TESTS
- example unit tests are made with Mocha
- Integration Test's are made with Supertest to start them type in terminal
```
TO BE ADDED

```