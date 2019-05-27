#API Call Examples

## Person Http API calls
```
POST http://localhost:8000/persons
{
	"fullname":"Prad K",
	"email":"pk@tk.com",
	"password": "123",
	"dateofbirth": "2010-05-01"
}


PUT http://localhost:8000/persons/1
{
	"fullname":"Prad K",
	"email":"pk@tk.com",
	"password": "123",
	"dateofbirth": "2010-05-01"
}

GET http://localhost:8000/persons
GET http://localhost:8000/persons/1
DELETE http://localhost:8000/persons/1
```


## Address Http API calls
```
POST http://localhost:8000/address
{
	"street":"Trif 67",
	"city":"Berlin",
	"country": "German",
	"postcode": 13353
}

PUT http://localhost:8000/address/1
{
	"street":"Trift 67",
	"city":"Berlin",
	"country": "German",
	"postcode": 12345
}

GET http://localhost:8000/address
GET http://localhost:8000/address/1
DELETE http://localhost:8000/address/1
```



## Packages/Orders Http API calls
```
POST http://localhost:8000/packages
{
	"pickaddressid":1,
	"dropaddressid":2,
	"pickdate": "2018-05-05",
	"arrivaldate": null,
	"personid":1
}

PUT http://localhost:8000/packages/1
{
	"pickaddressid":1,
	"dropaddressid":2,
	"pickdate": "2018-05-07",
	"arrivaldate": null,
	"personid":1
}

GET http://localhost:8000/packages
GET http://localhost:8000/packages/1
DELETE http://localhost:8000/packages/1
```

## GET user packages
GET http://localhost:8000/userpackages/1