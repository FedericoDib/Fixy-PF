const { Router } = require("express");
const {checkUser} = require('../controllers/checkUser');

const router = Router();

router.get('/', async (req, res) => {

    try{   
        const userInfo = await checkUser(req.query.id);
        res.status(200).send(userInfo);
    } 
    catch(error) {
        res.status(404).send(error);
    }
});

module.exports=router;