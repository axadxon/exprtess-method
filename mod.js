const express = require("express")
// const path = require("path")
// const fs = require("fs")
const mod = express()
const port = 8080

mod.use(express.json());
mod.use(express.urlencoded({ extended: true }));


/////   CRUD

const cars = [
    { name: "onix", author: "GM-Uz", id: 1 },
    { name: "Nexia", author: "GM-Uz", id: 2 },
    { name: "Spark", author: "GM-Uz", id: 3 },
]

////// get metodi

mod.get('/', (req, res) => {
    res.send('GM-Uzbekistan Avtomabillari savdosiga "Xush kelibliz!" ');
});

mod.get('/cars', (req, res) => {
    res.send(cars);
});

mod.get("/car/:id", (req, res) => {
    const car = cars.filter((val) => {
        return val.id === +req.params.id;
    })[0];
    res.send(car);
})

///// post metodi

mod.post("/car/cre", (req, res) => {
    const length = cars.length;

    const car = {
        name: req.body.name,
        author: req.body.author,
        id: length + 1,
    };

    cars.push(car);
    res.send("Amalyot muovfaqqiyatli bajarildi");

})

///// put metodi

mod.put('/car/put/:id', (req, res) => {
const { id } = req.params;
const { name, author } = req.body;

    const project = cars.find(p => p.id == id);

    project.name = name;
    project.author = author;

    return res.json(project);
});

//// delete metodi
mod.delete("/car/rem/:id", (req, res) => {
    const { id } = req.params;

    const projectIndex = cars.findIndex(p => p.id == id);

    cars.splice(projectIndex, 1);

    return res.send("remove boldi");
});


mod.listen(port, () => {
    console.log("server ishlammoqda" + " " + port);
});
