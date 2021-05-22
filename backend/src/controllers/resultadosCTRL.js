const db = require('./database');

const estudiantesControl = {};

 

estudiantesControl.getEstudiantes = (req,res)=>{

    res.json(db.estudiantes);

}

estudiantesControl.postEstudiante = (req,res)=>{

    const {id, nombre,apellido} = req.body;

    if(!id || !nombre || !apellido){

        res.status(400).send("Datos incompletos {id, nombre, apellido}");
        return;
    }

    const estudiante = {
        id,
        nombre,
        apellido
    }
 
    console.log('Petición POST recibida desde un cliente')
    console.log(estudiante)
    const estudiante_igual = db.estudiantes.find(
        (est) => est.id == estudiante.id
    );
    const validacion1 = estudiante_igual == null
    if (validacion1) {
        console.log("permitido");
        db.estudiantes.push(estudiante);
        console.log(db);
        db.updateDB();      
        res.json({ mensaje: 'Estudiante ingresado con éxito' });
    } else { 
        res.status(400).send("Numero de matricula ya existe");
        return;
    }

}

estudiantesControl.getEstudiante = (req,res)=>{

    const estudiante = db.estudiantes.find(

        (est)=>est.id == req.params.id

    );

 

    res.json(estudiante);

}

estudiantesControl.putEstudiante = (req,res)=>{
    console.log('Petición PUT recibida desde un cliente');
    const indice_estudiante = db.estudiantes.findIndex(
        (est) => est.id == req.params.id
    );
    validacion2 = indice_estudiante != -1;
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
        res.status(400).send("Datos incompletos {nombre, apellido}");
        console.log("Datos incompletos {nombre, apellido}")
        return;
    }
    if (validacion2) {
        console.log(indice_estudiante, "indice")
        db.estudiantes[indice_estudiante].nombre = nombre;
        db.estudiantes[indice_estudiante].apellido = apellido;
        console.log(db);
        db.updateDB();
        res.json({ mensaje: 'Estudiante modificado' });
 
    } else {
        res.status(400).send("El numero de matricula no esta registrado");
        return;
    }

}

estudiantesControl.deleteEstudiante = (req,res)=>{
    console.log('Petición DELETE recibida desde un cliente');
    const indice_estudiante2 = db.estudiantes.findIndex(
        (est) => est.id == req.params.id
    );
    validacion2 = indice_estudiante2 != -1;
    if (validacion2) {
        console.log(indice_estudiante2, "indice")
        console.log(req.params);
        console.log(req.body);
        db.estudiantes.splice(indice_estudiante2, 1);
        db.updateDB();
        res.json({ mensaje: 'Estudiante eliminado' });
 
    } else {
        res.status(400).send("El numero de matricula no esta registrado");
        return;
    }
}

 
module.exports = estudiantesControl;