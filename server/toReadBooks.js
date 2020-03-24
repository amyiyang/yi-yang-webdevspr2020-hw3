const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const toReadList = [{id: "gdEBDAAAQBAJ",title: 'Storm Front', authors: ['John Sandford']},
    {id: "dD9_uTXl7roC", title: 'The Language of Flowers', authors: ['Vanessa Diffenbaugh']},
    {id: "1",title: 'Storm 1', authors: ['John 1']}]

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