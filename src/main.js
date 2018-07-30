window.createTable = (students) => {
  const htmlTable = students.map((student, index) => {
    let trClass = '';

    if (student.completedPercentage <= 60) {
      trClass = 'table-danger';
    } else if (student.completedPercentage >= 90) {
      trClass = 'table-success';
    } else {
      trClass = 'table-warning';
    }

    return `
      <tr class="${trClass}">
        <th>${index + 1}</th>
        <td>${student.name.toUpperCase()}</td>
        <td>${student.email.toLowerCase()}</td>
        <td class="text-center">${student.completedPercentage}%</td>
        <td class="text-center">${student.stats.status.toUpperCase()}</td>
        <td class="text-center">${student.generation.toUpperCase()}</td>
        <td>${student.campus.toUpperCase()}</td>
      </tr>
    `;
  }).join('');
  document.getElementById('students').innerHTML = htmlTable;
};

// render by campus
window.render = (campus = 'lima') => {
  const students = window.computeStudentsByCampus(campus);
  window.createTable(students);
};

window.search = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const search = document.getElementById('input-search').value.toUpperCase();
  const students = window.computeStudentStats(window.laboratoria);
  const filteredStudents = window.filterStudents(students, search);
  console.log(filteredStudents);
  // window.createTable(filteredStudents);
};

//
window.onload = () => {
  fetch('https://raw.githubusercontent.com/lunavazquez/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json')
    .then(response => response.json())
    .then((laboratoria) => {
      window.laboratoria = laboratoria;
      return window.render('lima');
    });
};
