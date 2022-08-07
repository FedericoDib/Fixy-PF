const { Router } = require('express');
const { Client, Professional,Notification } = require('../../db');

const router = Router();

//TRAE TODAS LAS NOTIF NO VISTAS POR EL CLIENTE
router.get('/client/notSeen', async (req,res) => {
    const {googleId} = req.query;

    try{
        const userNotifications = await Notification.findAll({
            where:{
                clientId:googleId,
                status:'not_seen'
            }
        });
    } catch(e) {
        console.log(e);
    }

    res.status(200).send(userNotifications);
});

// TRAE TODAS LAS NOTIF VISTAS O NO POR EL CLIENTE

router.get('/client/all', async (req,res) => {
    const {googleId} = req.query;

    try{
        const userNotifications = await Notification.findAll({
            where:{
                clientId:googleId,
            }
        });
    } catch(e) {
        console.log(e);
    }

    res.status(200).send(userNotifications);
});





//TRAE TODAS LAS NOTIF NO VISTAS POR EL PROFESIONAL
router.get('/professional/notSeen', async (req,res) => {
    const {googleId} = req.query;

    try{
        const userNotifications = await Notification.findAll({
            where:{
                professionalId:googleId,
                status:'not_seen'
            }
        });
    } catch(e) {
        console.log(e);
    }

    res.status(200).send(userNotifications);
});

// TRAE TODAS LAS NOTIF VISTAS O NO POR EL PROFESIONAL

router.get('/professional/all', async (req,res) => {
    const {googleId} = req.query;

    try{
        const userNotifications = await Notification.findAll({
            where:{
                professionalId:googleId,
            }
        });
    } catch(e) {
        console.log(e);
    }

    res.status(200).send(userNotifications);
});




// PASA A "seen" TODAS LAS NOTIF DEL CLIENTE

router.put('/', async (req,res) => {
    const {googleId} = req.query;

    try{

        const readNotif = await Notification.update({status:'seen'},{where:{clientId:googleId}})

    }catch(e){
        console.log(e);
    }
});

// PASA A "seen" TODAS LAS NOTIF DEL PROFESIONAL

router.put('/', async (req,res) => {
    const {googleId} = req.query;

    try{

        const readNotif = await Notification.update({status:'seen'},{where:{professionalId:googleId}})

    }catch(e){
        console.log(e);
    }
});