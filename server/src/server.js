const app = require('./App');

app.listen(process.env.SERVER_PORT || 4000, () => console.log('localhost:4000'));