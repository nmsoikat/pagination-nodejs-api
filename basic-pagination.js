const express = require('express')

const app = express()

const users = [
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

app.get('/users', (req, res) => {
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
  if(startIndex > 0){
    const previous = {
      page: page - 1,
      limit: limit
    }
    console.log({previous});
  }
  
  // next
  if(endIndex < users.length){
    const next = {
      page: page + 1,
      limit: limit
    }
    console.log({next});
  }


  const data = users.slice(startIndex, endIndex)

  res.send(data)
})

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`)
})