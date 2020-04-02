const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');


// const haveReadList = [{id: "10", title: '2', authors: ['3'], ratings: 2},
//     {id: "4", title: 'T5', authors: ['6'], ratings: 3}]

const haveReadList = [
    {
        "id": "gdEBDAAAQBAJ",
        "title": "Storm Front",
        "authors": [
            "John Sandford"
        ],
        "ratings": '3'
    },
    {
        "id": "dD9_uTXl7roC",
        "title": "The Language of Flowers",
        "authors": [
            "Vanessa Diffenbaugh"
        ],
        "ratings": '4'
    },
    {
        "id": "FmmtDwAAQBAJ",
        "title": "Kid Food",
        "authors": [
            "Bettina Elias Siegel"
        ],
        "ratings": '5'
    }
];

router.get('/', function (req, res) {
    res.send(haveReadList);
});

router.post('/', (req, res) => {
    const body = req.body;
    haveReadList.push({
        id: body.id,
        title: body.title,
        authors: body.authors,
    });
    res.status(200).send({message: 'Success!', id: body.id});
});


router.delete('/:id', function (req, res) {
    const bookId = req.params.id;
    for (var i = haveReadList.length - 1; i >= 0; i--) {
        if (haveReadList[i].id === bookId) {
            haveReadList.splice(i, 1);
        }
    }
    res.status(200).send('Success!');
});

router.put('/update/:id', function (req, res) {
    const bookId = req.params.id;
    const body = req.body;
    const found = haveReadList.find((book) => book.id === bookId);
    if (!found) {
        res.status(404);
        return res.send({error: 'not found!'});
    }
    found.ratings = body.ratings;
    res.status(200).send(found);
});


module.exports = router;