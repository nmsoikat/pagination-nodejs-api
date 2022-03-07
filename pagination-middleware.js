const express = require('express')

const app = express()

const usersModel = [
  {
    id: 1,
    name: "A"
  },
  {
    id: 2,
    name: "B"
  },
  {
    id: 3,
    name: "C"
  },
  {
    id: 4,
    name: "D"
  },
  {
    id: 5,
    name: "E"
  },
  {
    id: 6,
    name: "F"
  },
  {
    id: 7,
    name: "G"
  },
  {
    id: 8,
    name: "H"
  },
  {
    id: 9,
    name: "I"
  },
  {
    id: 10,
    name: "J"
  },
]

const postsModel = [
  {
    id: 1,
    body: "A ddd"
  },
  {
    id: 2,
    body: "B ddd"
  },
  {
    id: 3,
    body: "C ddd"
  },
  {
    id: 4,
    body: "D ddd"
  },
  {
    id: 5,
    body: "E ddd"
  },
  {
    id: 6,
    body: "F ddd"
  },
  {
    id: 7,
    body: "G ddd"
  },
  {
    id: 8,
    body: "H ddd"
  },
  {
    id: 9,
    body: "I ddd"
  },
  {
    id: 10,
    body: "J ddd"
  },
]

app.get('/users', paginatedResult(usersModel), (req, res) => {
  res.send(res.paginatedResult)
})

app.get('/posts', paginatedResult(postsModel), (req, res) => {
  res.send(res.paginatedResult)
})


function paginatedResult(model) {
  return (req, res, next) => {
    // page and limit from query url
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // calculate start and end index
    const startIndex = (page - 1) * limit; //data arr index start from 0
    const endIndex = page * limit;
    //page 3 and limit 5
    //startIndex 2 * 5 = 10
    //endIndex 3 * 5 = 15
    //start from 10 and end to 15


    // previous
    if (startIndex > 0) {
      const previous = {
        page: page - 1,
        limit: limit
      }
      console.log({ previous });
    }

    // next
    if (endIndex < model.length) {
      const next = {
        page: page + 1,
        limit: limit
      }
      console.log({ next });
    }


    const data = model.slice(startIndex, endIndex)

    res.paginatedResult = data;
    next();
  }
}

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`)
})