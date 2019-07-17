const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');

const connectionString = process.env.DATABASE_URL ||
                        'postgres://taco:guest@localhost:5432/taco';
const connection = new ORM(connectionString, { logging: false });

const { Menuitem, Archivemenuitem, Comment } = require('./models')(connection, ORM);

app.use( express.json() );

connection.authenticate()
  .then(()=> console.log('success'))
  .catch((err)=> console.error(err));

require('./api')(app, { Menuitem, Archivemenuitem, Comment });

app.get('/hydrate', (req, res, next)=>{
  // middleware
  ( req.get('Authentication') === 'pizdetz' ) ? next() :
    res.status(401).json({ message: 'unauthenticated' });

}, (req, res)=> {
  // routehandler
  Menuitem.sync({ force: true })
    .then(()=> Menuitem.bulkCreate( require('./mockdata').menuitems ))
    .then(()=> Comment.sync({ force: true }))
    .then(()=> Archivemenuitem.sync({ force: true }))
    .then(()=> res.json({ message: 'database tables creation succeeded' }))
    .catch(err=> res.status(500).json({ message : 'database table creation failed' }))
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
