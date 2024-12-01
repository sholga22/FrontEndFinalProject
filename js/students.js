// script.js

import  { saveStudent, getStudents } from "/db/localStorageStudents.js";

const studentsTableHead = document.getElementById("studentsTableHead");
const studentsTable = document.querySelector("#studentsTableBody");

const addStudentBtn = document.getElementById("addStudentBtn");
const addStudentForm = document.getElementById("addStudentForm");
const studentForm = document.getElementById("studentForm");
const cancelAddStudent = document.getElementById("cancelAddStudent");

const subjectFilter = document.getElementById("subjectFilter");


//=== code related how to sort from head ===//
// string sort by onclick
function sortTableByColumn(columnIndex, ascending = true) {
  const table = document.getElementById("studentsTableHead");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.rows); // Get all rows in tbody


  // Determine if the column contains numbers
  const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText.trim());

  // Sort rows
  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].innerText.trim();
    const bText = b.cells[columnIndex].innerText.trim();

    let comparison;
    if (isNumeric) {
      comparison = parseFloat(aText) - parseFloat(bText); // Numeric comparison
    } else {
      comparison = aText.localeCompare(bText, undefined, { numeric: true }); // String comparison
    }

    return ascending ? comparison : -comparison; // Reverse if not ascending
  });

  // Clear tbody and append sorted rows
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}



// Data for headers
const headers = ["Name", "Subject", "Ort", "Telephone","Select"]; 

// Function to create the table header with sorting arrows
function createTableHeader(tableId) {
    // Find the table by its ID
    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID "${tableId}" not found.`);
        return;
    }

    // Create the <thead> element
    const thead = document.createElement("thead");

    // Create the header row
    const headerRow = document.createElement("tr");

    // Create cells for each header
    headers.forEach((headerText, index) => {
        const th = document.createElement("th");

        // Skip adding arrows for the "Select" column
        if (headerText === "Select") {
            const headerLabel = document.createElement("span");
            headerLabel.textContent = headerText;

            th.appendChild(headerLabel); // Just add the label without arrows
        } else {
            // Create a container for the header text and arrows
            const container = document.createElement("div");
            container.style.display = "inline-flex";
            container.style.alignItems = "center";
            container.style.gap = "5px"; // Small gap between text and arrows

            // Add the header text
            const headerLabel = document.createElement("span");
            headerLabel.textContent = headerText;

            // Add the sorting arrows
            const upArrow = document.createElement("a");
            upArrow.textContent = "▲"; // Up arrow
            upArrow.style.cursor = "pointer";
            upArrow.style.fontSize = "12px"; // Adjust arrow size
            upArrow.onclick = () => {
                console.log(`Sorting ${headerText} in ascending order`);
                sortTableByColumn(index, true);
            };

            const downArrow = document.createElement("a");
            downArrow.textContent = "▼"; // Down arrow
            downArrow.style.cursor = "pointer";
            downArrow.style.fontSize = "12px"; // Adjust arrow size
            downArrow.onclick = () => {
                console.log(`Sorting ${headerText} in descending order`);
                sortTableByColumn(index, false);
            };

            // Append the label and arrows to the container
            container.appendChild(headerLabel);
            container.appendChild(upArrow);
            container.appendChild(downArrow);

            // Append the container to the <th>
            th.appendChild(container);
        }

        // Append the <th> to the header row
        headerRow.appendChild(th);
    });

    // Add the row to <thead>
    thead.appendChild(headerRow);

    // Remove the old header (if it exists)
    if (table.querySelector("thead")) {
        table.removeChild(table.querySelector("thead"));
    }

    // Add the <thead> to the table
    table.appendChild(thead);
}


createTableHeader("studentsTableHead");

//=== End of code related how to sort from head ===//




//=== code related how to use filter ===//

// Event listener for the subject filter
document.getElementById('subjectFilter').addEventListener('change', (event) => {
  // Get the selected subject from the dropdown
  const selectedSubject = event.target.value;
  console.log("мы фильтруем")
  console.log(selectedSubject)
  
  // Clear form fields
  studentForm.reset();

  // Fetch filtered students and display them
  renderStudents(selectedSubject || null);
});

//=== end of code related how to use filter ===//


  // Render table students

  function renderStudents(filters = null) {

    (document.querySelector("#studentsTableBody")).innerHTML = "";

    // get all students from localStorage
    const students = getStudents(filters);

    console.log("отобрали учителей")
    console.log(filters)

    const checkBox = document.createElement

    students.forEach((student) => {
      
      const row = (document.querySelector("#studentsTableBody")).insertRow();
      const cellName = row.insertCell(0);
      const cellSubject = row.insertCell(1);
      const cellOrt = row.insertCell(2);
      const cellTelephone = row.insertCell(3);
      
      cellName.textContent = student.name;
      cellSubject.textContent = student.subject;
      cellOrt.textContent = student.ort;
      cellTelephone.textContent = student.telephone;

      // create cell for CheckBox
      const cellCheckBox = row.insertCell(4);

      const checkBox = document.createElement("input");
      checkBox.type = "checkBox";
      checkBox.className = "sudent-select";

      //insert CheckBox into cell
      cellCheckBox.appendChild(checkBox);

    });

  }




  // Show the add student form
  addStudentBtn.addEventListener("click", () => {
    addStudentForm.style.display = "block";
  });

  // Cancel form (hide it)
  cancelAddStudent.addEventListener("click", () => {
    studentForm.reset();
    addStudentForm.style.display = "none";
  });

  // Show the delete student button
  const studentsTableBody = document.getElementById("studentsTableBody");
  const deleteStudentBtn = document.querySelector("#deleteStudentBtn");

  console.log("studentsTableBody="+studentsTableBody)

  studentsTableBody.addEventListener("change", () => {
    
    // are CheckBoxes selected?
    const checkBoxesFromTable = document.querySelectorAll(".student-select");
    checkBoxesFromTable.forEach(element => {
      console.log("element="+element)
    })
    console.log("checkBoxesFromTable="+checkBoxesFromTable)
    const checkBoxes = Array.from(checkBoxesFromTable);
    checkBoxes.forEach(element => {
      console.log("element="+element)
    })
    const selectedCount = checkBoxes.filter(checkbox => checkbox.checked).length;
    
    console.log("selectedCount="+selectedCount)
    console.log("checkBoxes="+checkBoxes)
    // hide or show Button Delete Student
    deleteStudentBtn.style.display = selectedCount ? "inline-block" : "none";
  
  });



  // Add new student
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const studentName = document.getElementById("studentName").value;
    const studentSubject = document.getElementById("studentSubject").value;
    const studentOrt = document.getElementById("studentOrt").value;
    const studentTelephone = document.getElementById("studentTelephone").value;



    // create object student
    const student ={
      name: studentName,
      subject: studentSubject,
      ort: studentOrt,
      telephone: studentTelephone,
    }

    // call function from localStorage to save dates
    saveStudent(student);

    // Clear form fields
    studentForm.reset();

    // Hide form after submission
    addStudentForm.style.display = "none";

    // Re-render the schedule table when the Page loads
    renderStudents();
  });

  



// Initial render

renderStudents("all");

//localStorage.clear();
 console.log(localStorage.getItem('students'))