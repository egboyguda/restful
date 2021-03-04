const { Console } = require('console');
const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')// n ini cya mao

//use
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))


//set
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

const comments = [{
    id:uuid(),
    username:'todd',
    comment:'asdasdasdasd'
},
{   id:uuid(),
    username:'tqwe',
    comment:'3423rsdfsd'
},
{
    id:uuid(),
    username:'gboy',
    comment:'3423rsdfsd'
}
]

//n dd pag an request localhost:3000/comments
//response sin an index.ejs
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})
app.get('/comments/new',(req,res)=>{
    res.render('comments/form')
})

// in ini man na route para n sa form an an
// method post nadto sa action na /comments
app.post('/comments',(req,res)=>{
    const{name, comment} = req.body;
    comments.push({"username":name, "comment":comment, 'id':uuid()})
    res.redirect('/comments')
})

// ini na router para n may ngadto sa user.ejs
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params // in dd kukuwaon la an id na gn type sa url
    if(checkParam(id)!==null){
        res.render('comments/user',{userBody:checkParam(id)})
    }
})

// ini na route an response 
// sin form kun kun nanu na comment an m ig eedit
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    if(checkParam(id)!==null){
        res.render('comments/update',{userBody:checkParam(id)})
    }
})

//dd gn gamit an patch na method
app.patch('/comments/:id',(req,res)=>{
        const {id} = req.params;
        const newComment = req.body.comment;
        const foundComment =   checkParam(id)
        foundComment.comment = newComment
        res.redirect('/comments')
      
        
})


//ini na punction ma check n kun an                       
// id nya ada sa data tas ma return object
const checkParam=(id)=>{
    //const {id} = req.params // in dd kukuwaon la an id na gn type sa url
    if(comments.filter(e => e.id===id)){
        return comments.find(obj => obj.id === id);
    }else{
        return null;
    }
}

//app.get('/comments/:id',(req,res)=>{
//    const {id} = req.params // in dd kukuwaon la an id na gn type sa url
    // dd man ig chechek kun itun na id ada sa comments
//    if(comments.filter(e => e.username===`${id}`)){
        // n dd . itun na comments fiter kun  gn return la
        // an object sa id  an return sun {username, comments}
//        const userBody = comments.filter(obj => {
//            return obj.username === `${id}`
//        })
//       const username = userBody.map(a => a.username)
//       const comment = userBody.map(a => a.comment)
//        console.log(username)
//        res.render('comments/user',{username,comment})
//    }
//})




app.listen(3000,()=>{
    console.log("app is running port 3000")
})