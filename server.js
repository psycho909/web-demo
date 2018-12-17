import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const dbUrl="mongodb://localhost/"

const validate=(data)=>{
    let errors={}
    if(data.title === '') errors.title="Cant be empty"
    if(data.cover === '') errors.title="Cant be empty"
    
    const isValid=Object.keys(errors).length === 0

    return {errors,isValid}
}

// app.get('/api/games', function(req, res) {
//     mongodb.MongoClient.connect(dbUrl,(err, client)=>{
//         if (err) throw err
//         const db = client.db('crud')
//         db.collection('games').find({}).toArray(function(err, games){
//             res.json({games})
//         })
//     })
// })
mongodb.MongoClient.connect(dbUrl,(err, client)=>{
    if (err) throw err
    const db = client.db('crud')

    app.get('/api/games', function(req, res) {
        db.collection('games').find({}).toArray(function(err, games){
            res.json({games})
        })
        
    })

    app.get('/api/games/:_id',(req,res)=>{
        db.collection('games').findOne({_id:new mongodb.ObjectId(req.params._id)},(err,game)=>{
            res.json({game})
        })
    })

    app.delete('/api/games/:_id',(req,res)=>{
        db.collection('games').deleteOne({_id:new mongodb.ObjectId(req.params._id)},(err,game)=>{
            if(err){
                res.status(500).json({errros:{global:"mongodb error!!"}})
            }else{
                res.json({})
            }
        })
    })

    app.put('/api/games/:_id',(req,res)=>{
        const {errors,isValid}=validate(req.body)
        if(isValid){
            const {title,cover}=req.body
            db.collection('games').findOneAndUpdate(
                {_id:new mongodb.ObjectId(req.params._id)},
                {$set:{title,cover}},
                {returnOriginal:true},
                (err,result)=>{
                    if(err) {res.status(500).json({errors:{global:err}}); return; }
                    res.json({game:result.value})
                }
            )
        }else{
            res.status(400).json({errors})
        }
    })
    app.post('/api/games',(req,res)=>{
        const {errors,isValid}=validate(req.body)
    
        if(isValid){
            const {title,cover}=req.body
            db.collection('games').insert({title,cover},(err,result)=>{
                if(err){
                    res.status(500).json({errros:{global:"mongodb error!!"}})
                }else{
                    res.json({game:result.ops[0]})
                }
            })
        }else{
            res.status(400).json({errors})
        }
    })
    app.use((req,res)=>{
        res.status(404).json({
            errors:{
                global:"Still working on it.Pls try again"
            }
        })
    })
})






app.listen(8080,()=>{
    console.log("Express runing in 8080")
})