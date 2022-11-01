const { PrismaClient } = require('@prisma/client');
const express = require('express')
const cors = require('cors')

//prisma client
const prisma = new PrismaClient();
const app = express();
const port = 8000;

//handle cors, form data and Json
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//REST Api Routes
app.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
    res.json(user);
})

app.post('/Todo', async (req, res) => {
    const {todolist} = req.body;
    const todos = await prisma.todo.create({
        data: todolist
    })
    res.json(todos);
})

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const users = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    res.json(users);
})

app.put('/', async (req, res) => {
    const {id, username} = req.body
    const updateUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            username: username,
        }
    })
    res.json(updateUser)
})

app.delete('/:id', async (req, res) =>{
    const id = req.params.id 
    const deletedUser = await prisma.user.delete({
        where: {
            id: id,
        },
    }) 
    res.json(deletedUser)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

//"test": "echo \"Error: no test specified\" && exit 1"