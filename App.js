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
  const id = req.params.id
  let usercheck = false;
  data.forEach((e) => {
    if(id == e.id)
      usercheck = true
      res.json(e)
  });

  if(!usercheck){
    res.send("Fail")
  }

})

app.post('/api/users', (req, res) => {
  try{
    const news = req.body
    news.id = parseInt(data[(data.length)-1].id)+1
    data.push(news)
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send("Success")
  }
  catch(e){
    res.send("Fail")
  }
})

app.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  let usercheck = false;
  data.forEach((e,x) => {
    if(e.id == id){
      let usercheck = true;
      data[x].name = update.name
    }
  })
  if(usercheck){
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send("Susses")
  }
  else{
    res.send("Fail")
  }
  
})

app.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  let usercheck = false;
  data.forEach((e,x)=>{
    if(e.id === id){
      usercheck = true
      data.splice(x,1)
    }
  })
  if(usercheck){
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send("Susses")
  }
  else{
    res.send("Fail")
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});