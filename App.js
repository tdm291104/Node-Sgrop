const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())

const data = JSON.parse(fs.readFileSync('data.json'))

app.get('/', (req, res) => {
  res.send("Hello World!!!!!!!!")
})

app.get('/api/users', (req, res) => {
  res.json(data);
})
app.get('/api/users/:id', (req, res) => {
  // what if id is not a number?
  const id = parseInt(req.params.id)
  // what if this id doesn't exist in data?
  data.forEach((e) => {
    if(id == e.id)
      res.json(e)
    });
})

app.post('/api/users', (req, res) => {
  // what if user provide data not following your the schema?
  req.body.id = parseInt(data[(data.length)-1].id)+1
  data.push(req.body)
  fs.writeFileSync('data.json', JSON.stringify(data))
  // What if the write operation fail?
  res.send("Success")
})

app.put('/api/users/:id', (req, res) => {
  // what if id is not a number?
  const id = parseInt(req.params.id)
  const update = req.body
  // what if this id doesn't exist in data?
  data.forEach((e,x) => {
    if(e.id == id){
      data[x].name = update.name
    }
  })
  fs.writeFileSync('data.json', JSON.stringify(data))
  // What if the write operation fail?
  res.send("Susses")
})

app.delete('/api/users/:id', (req, res) =>{
  // what if id is not a number?
  const id = parseInt(req.params.id);
  // what if this id doesn't exist in data?
  data.forEach((e,x)=>{
    if(e.id === id){
      data.splice(x,1)
    }
  })
  fs.writeFileSync('data.json', JSON.stringify(data))
  // What if the write operation fail?
  res.send("Susses")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});