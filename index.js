const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Task = require('./models/task');

app.use(express.json());
mongoose.connect('mongodb+srv://theoschweizer:'+ 
    process.env.MONGO_ATLAS_PW + 
    '@cluster0.kmmz6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useMongoClient: true
    });

// const tasks = [
//     {id: 1,
//         text: 'Doctors Appointment', 
//         day: 'Feb 5',
//         reminder: true},
//     {id: 2,
//         text: 'Grocery Shopping', 
//         day: 'Feb 5',
//         reminder: true},
//     {id: 3,
//         text: 'Something else', 
//         day: 'Feb 5',
//         reminder: true}
// ]

// app.get('/', (req, res) => {
//     res.send('Hello World!!!');
// });

app.get('/api/tasks', (req, res) => {
    Task.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
    //res.send(tasks);
});

app.post('/api/tasks', (req, res) =>{  
    const task = new Task({
        _id: new mongoose.Types.ObjectId(), 
        text: req.body.text, 
        day: req.body.day,
        reminder: req.body.reminder
    });
    task
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
              });
        });
    
    // const { error } = validateTask(req.body);
    // if (error) return res.status(400).send(result.error.details[0].message);
    // const task = {
    //     id: req.body.id, 
    //     text: req.body.text, 
    //     day: req.body.day,
    //     reminder: req.body.reminder
    // };
    //tasks.push(task);
    res.send(task);   
});

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    Task.updateOne({ _id: id }, { $set: {reminder: req.body.reminder}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    
    //res.send(Task);
    
    // const task = tasks.find(c => c.id === parseInt(req.params.id));
 
    // if (!task) return res.status(404).send('The task with the given ID was not found.')

    // const { error } = validateTask(req.body);
    // console.log(error)
    // if (error) return res.status(400).send(result.error.details[0].message);

    // task.text = req.body.text;
    // task.day = req.body.day;
    // task.reminder = req.body.reminder;
    
    
});


// function validateTask (task) {
//     const schema = Joi.object ({
//         id: Joi.number().integer().required(),
//         text: Joi.string().min(3).required(),
//         day: Joi.string().min(1).required(),
//         reminder: Joi.boolean().required()
//     });
//     return schema.validate(task);
// }


app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
  Task.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

    
    // const task = tasks.find(c => c.id === parseInt(req.params.id));
    // if (!task) return res.status(404).send('The task with the given ID was not found.');

    // const index = tasks.indexOf(task);
    //tasks.splice(index, 1);

    //res.send(task);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
    
    // const task = tasks.find(c => c.id === parseInt(req.params.id));
    // if (!task) return res.status(404).send('The task with the given ID was not found.');
    // res.send(task);
})


app.listen(5000, () => console.log(`listening on port 5000...`));