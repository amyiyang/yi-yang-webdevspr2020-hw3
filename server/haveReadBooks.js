const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');


const haveReadList = [{id: "10", title: '2', authors: ['3']},
    {id: "4", title: 'T5', authors: ['6']}]

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

module.exports = router;