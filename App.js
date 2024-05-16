const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())
// app.use(bodyParser.json())

const data = JSON.parse(fs.readFileSync('data.json'))

app.get('/', (req, res) => {
  res.json(data);
})

app.post('/', (req, res) => {
  const a = req.body
  data.push(a)
  fs.writeFileSync('data.json', JSON.stringify(data))
  res.status(201)
  res.send("Thêm thành công")
})

app.get('/:id', (req, res) => {
  // console.log(req.params);
  const id = parseInt(req.params.id);
  const object = data.find((obj) => {
    if(id == obj.id)
      return obj
    else return null
  });
  // console.log(object)
  if (object) {
    res.json(object);
  } else {
    res.status(404)
  }
});

app.put('/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  const update = req.body
  const index = data.findIndex((obj)=>{
    if(id == obj.id)
      return obj
    else return null
  });
  if (index !== -1) {
    // data.id = update.id
    // data.title = update.title
    // data.author = update.author
    // data.year = update.year
    data[index] = { ...data[index], ...update };
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.send('Sửa thành công');
  }
})

app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = data.findIndex((obj)=>{
    if(id == obj.id)
      return obj
    else return null
  });
  if (index !== -1) {
    
    data.splice(index, 1);

    fs.writeFileSync('data.json', JSON.stringify(data));
    res.send('Xóa thành công');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});