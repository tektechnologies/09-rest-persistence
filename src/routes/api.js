'use strict';

const router = require('../lib/router');
const cowsay = require('cowsay');
router.get('/api/cowsay', (req, res) => {
  json(res, 
    { content: cowsay.say(req.query) },
  );
});


router.delete('/api/cowsay', (req, res) => {
  json(res, {
    message: `Cow number ${req.query.id} is deleted`,
  });
});

function json(res, object) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(object));
  res.end();
}

