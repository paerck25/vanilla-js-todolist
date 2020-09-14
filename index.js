const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const saveTodoJson = (todo,callback) => {
    fs.writeFile(`./public/data/${todo.date}.json`, JSON.stringify(todo.todos), callback);
}

const deleteTodoJson = (date,callback) => {
    fs.unlink(`./public/data/${date}.json`,callback);
}

app.post('/todo',(req,res)=>{
    console.log(req.body);
    saveTodoJson(req.body,(err)=>{
        if(err) return console.log(err);
        res.send('저장 완료');
    })
})

app.post('/delete',(req,res)=>{
    console.log(req.body);
    deleteTodoJson(req.body.date,(err)=>{
        if(err) return console.log(err);
        res.send('삭제');
    })
})

app.listen(4000,()=>{
    console.log('Server is Running.. http://localhost:4000');
})