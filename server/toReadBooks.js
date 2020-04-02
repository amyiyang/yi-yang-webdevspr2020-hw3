const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const toReadList = [
    {
        "id": "6pImDwAAQBAJ",
        "title": "Food",
        "authors": [
            "Mark Hyman"
        ]
    },
    {
        "id": "utugT5lFRQoC",
        "title": "In Defence of Food",
        "authors": [
            "Michael Pollan"
        ]
    },
    {
        "id": "It6ySlOx8b8C",
        "title": "Jane Brody's Good Food Book",
        "authors": [
            "Jane E. Brody"
        ]
    },
    {
        "id": "BEYOAAAACAAJ",
        "title": "Dr. Gabe Mirkin's Good Food Book: Live Better and Longer with Nature's Best Foods",
        "authors": [
            "Gabe Mirkin",
            "Diana Mirkin"
        ]
    }
]

router.get('/', function (req, res) {
    res.send(toReadList);
});

router.post('/', (req, res) => {
    const body = req.body;
    toReadList.push({
        id: body.id,
        title: body.title,
        authors: body.authors,
    });
    res.status(200).send({message: 'Success!', id: body.id});
});


router.delete('/:id', function (req, res) {
    const bookId = req.params.id;
    for (var i = toReadList.length - 1; i >= 0; i--) {
        if (toReadList[i].id === bookId) {
            toReadList.splice(i, 1);
        }
    }
    res.status(200).send('Success!');
});

module.exports = router;