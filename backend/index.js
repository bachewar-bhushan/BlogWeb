const express = require('express')
const app = express()
const connectToMongo = require('./db');
const port = 5000
connectToMongo();
const cors = require('cors')
const router_blog = require('./routes/blog_route');
const router_auth = require('./routes/user_auth'); 

app.use(express.json());
app.use(cors())

app.use('/', router_blog)
app.use('/api', router_auth)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})