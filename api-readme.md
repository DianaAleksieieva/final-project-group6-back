## getYearlyTransactionsByType

### getYearlyTransactionsByType request

//type: 'income' or 'expense'

```
GET /api/transactions/year/:year/:type
Authorization: "Bearer {{token}}"
```

### getYearlyTransactionsByType error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

### getYearlyTransactionsByType unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### getYearlyTransactionsByType Not Found error

```
Status: 404 Not found
Content-Type: application/json
ResponseBody: {
  "message": "Not found"
}
```

### getYearlyTransactionsByType success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "type" : 'income',
  "year" : 2019,
  "sum" : 8330,
  "result": {
    1: 2533,
    2: 334,
    3: 5463,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
  },
}
```

## getAllMonthlyTransactions

### getAllMonthlyTransactions request

```
GET /api/transactions/month/:month/:year
Authorization: "Bearer {{token}}"
```

### getAllMonthlyTransactions error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

### getAllMonthlyTransactions unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### getAllMonthlyTransactions Not Found error

```
Status: 404 Not found
Content-Type: application/json
ResponseBody: {
  "message": "Not found"
}
```

### getAllMonthlyTransactions success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "total" : 6,
  'month' : 5,
  'year' : 2015,
  "sumExpenses" : 290,
  "sumIncoms" : 450,
  "result": [
    {
    _id: id,
    date: '21.11.2019',
    amount: 15,
    type: 'income'
    category:'salary'
    },
    {
    _id: id,
    date: '21.11.2019',
    amount: 45,
    type: 'expense'
    category:'goods'
    },
    {
    _id: id,
    date: '22.11.2019',
    amount: 25,
    type: 'expense'
    category:'health'
    },
    {
    _id: id,
    date: '23.11.2019',
    amount: 435,
    type: 'income'
    category:'freelance'
    },
    {
    _id: id,
    date: '28.11.2019',
    amount: 145,
    type: 'expense'
    category:'house'
    },
    {
    _id: id,
    date: '29.11.2019',
    amount: 75,
    type: 'expense'
    category:'utilities'
    }
  ]
}
```

## getAllMonthlyByCategoryTransactions

### getAllMonthlyByCategoryTransactions request

```
GET /api/transactions/category/:month/:year
Authorization: "Bearer {{token}}"
RequestBody: {
    categories: ['goods', 'health']
}
```

### getAllMonthlyByCategoryTransactions error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

### getAllMonthlyByCategoryTransactions unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### getAllMonthlyByCategoryTransactions Not Found error

```
Status: 404 Not found
Content-Type: application/json
ResponseBody: {
  "message": "Not found"
}
```

### getAllMonthlyByCategoryTransactions success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "total" : 2,
  'month' : 5,
  'year' : 2015,
  "category" : ['goods', 'health'],
  'sum' : 70,
  "result": [
    {
    _id: id,
    date: '21.11.2019',
    amount: 45,
    type: 'expense'
    category:'goods'
    },
    {
    _id: id,
    date: '22.11.2019',
    amount: 25,
    type: 'expense'
    category:'health'
    },
  ]
}
```

## getAllMonthlyByTypeTransactions

### getAllMonthlyByTypeTransactions request

```
GET /api/transactions/type/:month/:year
Authorization: "Bearer {{token}}"
RequestBody: {
    type: 'income'
}
```

### getAllMonthlyByTypeTransactions error

```
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки валидации>
```

### getAllMonthlyByTypeTransactions unauthorized error

```
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### getAllMonthlyByTypeTransactions Not Found error

```
Status: 404 Not found
Content-Type: application/json
ResponseBody: {
  "message": "Not found"
}
```

### getAllMonthlyByTypeTransactions success response

```
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "total" : 2,
  'month' : 5,
  'year' : 2015,
  "type" :  'income',
  'sum' : 450,
  freelance : 435
  "result": {
     goods:    {
     {
    _id: id,
    date: '21.11.2019',
    amount: 15,
    type: 'expense'
    category:'goods'
    },
     {
    _id: id,
    date: '21.11.2019',
    amount: 15,
    type: 'expense'
    category:'goods'
    },
     {
    _id: id,
    date: '21.11.2019',
    amount: 15,
    type: 'expense'
    category:'goods'
    },
    house : {

    }
     }
     {
    _id: id,
    date: '21.11.2019',
    amount: 15,
    type: 'income'
    category:'salary'
    }
    {
    _id: id,
    date: '23.11.2019',
    amount: 435,
    type: 'income'
    category:'freelance'
    }
  }
}
```
