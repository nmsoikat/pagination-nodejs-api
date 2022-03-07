const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('./User')



mongoose.connect('mongodb://localhost/pagination')
const db = mongoose.connection;
db.once('open', async () => {
  if(await User.countDocuments().exec() > 0) return;

  Promise.all([
    User.create({name: "user a"}),
    User.create({name: "user b"}),
    User.create({name: "user c"}),
    User.create({name: "user d"}),
    User.create({name: "user e"}),
    User.create({name: "user f"}),
    User.create({name: "user g"}),
    User.create({name: "user h"}),
    User.create({name: "user i"}),
    User.create({name: "user j"})
  ]).then(res => console.log("success"))
})

app.get('/users', paginatedResult(User), (req, res) => {
  res.send(res.paginatedResult)
})

// app.get('/posts', paginatedResult(postsModel), (req, res) => {
//   res.send(res.paginatedResult)
// })


function paginatedResult(model) {
  return async (req, res, next) => {
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


    // backend query
    try {
      const data = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult = data;
      next();
      
    } catch (error) {
      console.log(error);
    }

  }
}

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`)
})