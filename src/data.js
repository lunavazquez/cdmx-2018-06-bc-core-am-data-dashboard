// primera funcion
window.computeStudentsStats = (laboratoria) => {
  // arreglo de estudiantes
  let studentsArray = [];

  // console.log(laboratoria);
  // se itera cada sede del objeto laboratoria
  for (let sede in laboratoria) {
    // console.log(laboratoria[sede]);
    const generaciones = laboratoria[sede].generacion;
    // se itera cada generacion del objeto generaciones
    for (let generacion in generaciones) {
      // console.log(generaciones[generacion]);

      let estudiantes = generaciones[generacion].estudiantes;
      // console.log(estudiantes);
      // se itera estudiante del ARREGLO de estudiantes
      for (let estudiante of estudiantes) {
        // console.log(estudiante);
        // se crea el objeto student
        let student = {
          name: estudiante.nombre,
          email: estudiante.correo,
          campus: sede,
          generation: generacion,
          stats: {}
        };

        student.completedPercentage = estudiante.progreso.porcentajeCompletado;
        // se compara el estatus de la alumna de acuerdo al porcentaje
        if (student.completedPercentage <= 60) {
          student.stats.status = 'Debajo';
        } else if (student.completedPercentage >= 90) {
          student.stats.status = 'Superandolo';
        } else {
          student.stats.status = 'Media';
        }

        student.stats.topics = {};
        const temas = estudiante.progreso.temas;
        for (let tema in temas) {
          // console.log(temas[tema]);
          student.stats.topics[tema] = {
            completedPercentage: temas[tema].porcentajeCompletado,
            percentageDuration: temas[tema].duracionTema,
            subtopics: temas[tema].subtemas
          };
        }

        studentsArray.push(student);
      }
    }
    // console.log(generaciones);
  }
  // console.log(studentsArray);
  return studentsArray;
};
// segunda funcion
window.computeGenerationsStats = (laboratoria) => {
  // console.log(laboratoria);
  let generationsArray = [];

  for (let sede in laboratoria) {
    // console.log(sede);
    const generaciones = laboratoria[sede].generacion;
    // console.log(generaciones);
    for (let generacion in generaciones) {
      // console.log(generacion);
      let generation = {
        campus: sede,
        generation: generacion
      };
      let estudiantes = generaciones[generacion].estudiantes;
      generation.count = estudiantes.length;
      generation.average = estudiantes.reduce((acumulador, estudiante) => {
        return acumulador + estudiante.progreso.porcentajeCompletado;
      }, 0);
      // math.round- redondea el numero
      generation.average = Math.round(generation.average / generation.count);
      generationsArray.push(generation);
    }
  }

  return generationsArray;
};

window.computeStudentsByCampus = (campus) => {
  const studentsByCampus = window.computeStudentsStats(window.laboratoria).filter(student => student.campus === campus);
  return studentsByCampus;
};

// TODO - corregir la funcion de filtrado
window.filterStudents = (students, search) => {
  // return students.filter(student => student.name.indexOf(search) > -1);
  console.log(students);
  console.log(search);
};
