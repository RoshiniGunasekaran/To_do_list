const { Router } = require('express');
const { gettodo, savetodo, updatetodo, deletetodo } = require('../controllers/todocontrollers');
const router = Router();

router.get('/', gettodo);
router.post('/save', savetodo);
router.put('/update', updatetodo);
router.delete('/delete', deletetodo);

module.exports = router;
