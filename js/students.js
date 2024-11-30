// script.js

import  { saveTeacher, getTeachers } from "/db/localStorage.js";
//import localStorage from `../db/localStorage.js`;




  const teachersTableHead = document.getElementById("teachersTableHead");
const teachersTable = document.querySelector("#teachersTableBody");

const addTeacherBtn = document.getElementById("addTeacherBtn");
const addTeacherForm = document.getElementById("addTeacherForm");
const teacherForm = document.getElementById("teacherForm");
const cancelAddTeacher = document.getElementById("cancelAddTeacher");



  // Render schedule table

  function renderTeachers() {

    teachersTable.innerHTML = "";

    // get all teachers from localStorage
    const teachers = getTeachers();

    teachers.forEach((teacher) => {
      console.log(teacher) 

      const row = teachersTable.insertRow();
      const cellName = row.insertCell(0);
      const cellSubject = row.insertCell(1);

      cellName.textContent = teacher.name;
      cellSubject.textContent = teacher.subject;
    });

  }




  // Show the add teacher form
  addTeacherBtn.addEventListener("click", () => {
    addTeacherForm.style.display = "block";
  });

  // Cancel form (hide it)
  cancelAddTeacher.addEventListener("click", () => {
    teacherForm.reset();
    addTeacherForm.style.display = "none";
  });


  // Add new teacher
  teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const teacherName = document.getElementById("teacherName").value;
    const teacherSubject = document.getElementById("teacherSubject").value;

    console.log("мі сохраняем")

    // create object teacher
    const teacher ={
      name: teacherName,
      subject: teacherSubject,
    }

    // call function from localStorage to save dates
    saveTeacher(teacher);





    // Add the new teacher to the schedule (you could extend this as needed)
    scheduleData.push({
      teacher: teacherName,
      subject: teacherSubject,
      student: "No Student",
      time: "TBA",
    });



    // Clear form fields
    teacherForm.reset();


    // Hide form after submission
    addTeacherForm.style.display = "none";

    // Re-render the schedule table when the Page loads
    renderTeachers();
  });



  // Initial render
  renderTeachers();