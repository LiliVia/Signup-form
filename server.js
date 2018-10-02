const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.post('/auth', (req, res) => {
    res.send('OK');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
