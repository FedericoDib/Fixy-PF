const { Router } = require("express");
const {checkUser} = require('../controllers/checkUser');

const router = Router();

router.get('/', async (req, res) => {
  console.log('hola2')

    try{   
        const userInfo = await checkUser(req.query.id);
        console.log(userInfo)
        res.status(200).send(userInfo);

    } 
    catch(error) {
        res.status(404).send(error);
    }
});

module.exports=router;