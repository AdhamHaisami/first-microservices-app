const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('israel') ? 'Rejected' : 'Approved';
    console.log('HELLOOOOOOOOO');
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: data.id,
      postId: data.postId,
      status,
      content: data.content,
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
