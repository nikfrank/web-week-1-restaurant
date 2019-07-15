const crypto = require('crypto');

module.exports = (app, { Menuitem })=>{

  app.post('/menuitem', (req, res, next)=> {
    // middleware
    if(req.get('Authentication') === 'pizdetz') next();
    else res.status(401).json({ message: 'unauthenticated' });

  }, (req, res)=> {
    // routehandler
    Menuitem.create(req.body)
      .then(response => res.status(201).json({ createdId: response.dataValues.id }))
      .catch(err => res.status(500).json({ message: 'failed to create menuitem' }));
  });


  app.get('/menuitem', (req, res)=>{
    Menuitem.findAll()
      .then(response=> res.json(response.map(r => r.dataValues)))
      .catch(err=> res.status(500).json({ message: 'failed to read menuitems' }))
  });
};
