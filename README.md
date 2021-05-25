# Description of game-zombie-api
API for game CRUD operations on zombies and their inventory and transaction related to their item exchange
It is using.

Aplication calculates total value of items for every zombie in: USD, Eu, pln.
Application gets items price in pln from API https://zombie-items-api.herokuapp.com/api/items
Application gets currency rates from API http://api.nbp.pl/api/exchangerates/tables/C/today/
- Rates for other currencies are calculated by 	Bid – calculated currency buy exchange rate 
- app can work locally or be hosted on Cloud Services
- application works with CRUD operations using MongoDB
- application is formated wit ESLint


# Assummption of Initial state of working application

- authentication is not provided for this state(usually i would do it for App Engine with Identity Aware Proxy(GCP))
- The zombie can have a maximum of 5 items. If there are more item in the request i POST request it will be not accepted. 
- If featched zombie-items-api or exchange rates would not workproperly new entry cannot be created.
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
⦁ <configure mongoDB>
⦁ gcloud app deploy
```


# TO TEST HTTP CRUD API Actions


  - [POST /zombie](#post-zombie) - Add new entry 
    - request body
   ```
    {
     "name": "ZombiWojtek357",   
      "valueOfItems" :  {
             "pln": 21,
             "usd": 34,
             "eur": 41
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
    "name": "ZombiWojtek357",
    "creationDate": "01.01.2021",
    "valueOfItems": [
        {
            "_id": "60abd9b28ea12d536869c47f",
            "pln": 21,
            "usd": 34,
            "eur": 41
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
   ## Operation on specified record  {http://localhost:8080}/api/zombie/{_id} 
  - [GET /zombie/[entryID]](#get-entryID) -  gets entry 
  - [PUT /zombie/[entryID]](#put-entryID)  - modifies entry
      - request body
  ```
    {
	  "_id":"60abcc9547d22b7890d69c6b",
      "valueOfItems" :  {
             "pln": 29,
              "usd": 9999,
              "eur": 9799          
            }
	}
   ```
  - [PATCH /zombie/[entryID]](#patch-entryID) - modify specified params of body
  - [DELETE /zombie/[entryID]](#delete-entryID) - delete record
 


   ## Operation on specified zombie Inventory {http://localhost:8080}/api/zombie/{_id}/inventory
  - [POST /zombie/:_id/iventory](#post-zombie) - Add new item 
   ```
  {
    "id":1,
    "name":"Diamond Sword",
    "price":100
}
 ```
  - [DELETE /zombie/:_id/inventory](#post-zombie) - remove item 
 ```
    {
	 "_id":"60ad4a25f50e8d62140d0611",
     "name":"Diamond Sword",
	}
 ```
# TESTS
- example unit tests are made with Mocha
- Integration Test's are made with Supertest to start them type in terminal
```
⦁ npm test
```