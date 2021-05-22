const router = Router();


const { getEstudiantes, postEstudiante, getEstudiante, putEstudiante, deleteEstudiante } = require('../controllers/estudiantesCTRL');


router.route('/')

    .get(getEstudiantes)
    .post(postEstudiante);



router.route('/:id')

    .get(getEstudiante)
    .put(putEstudiante)
    .delete(deleteEstudiante);


module.exports = router
