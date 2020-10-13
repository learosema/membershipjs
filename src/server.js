const PORT = process.env.PORT || 1337;
const HOST = process.env.HOST || 'localhost';
const express = require('express');
const apiRoutes = require('./api-routes');
const app = express();

app.use(express.static('public'));
app.use('/api', apiRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}/`);
});
