// script.js

import  { saveTeacher, getTeachers } from "/db/localStorageTeachers.js";

const teachersTableHead = document.getElementById("teachersTableHead");
const teachersTable = document.querySelector("#teachersTableBody");

const addTeacherBtn = document.getElementById("addTeacherBtn");
const addTeacherForm = document.getElementById("addTeacherForm");
const teacherForm = document.getElementById("teacherForm");
const cancelAddTeacher = document.getElementById("cancelAddTeacher");



//=== code related how to sort from head ===//
// string sort by onclick
function sortTableByColumn(columnIndex, ascending = true) {
  const table = document.getElementById("teachersTableHead");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.rows); // Get all rows in tbody

  console.log("сортируем");

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
const headers = ["Name", "Subject", "Photo", "Ort"]; // Добавлена колонка "Photo"

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

        // Skip adding arrows for the "Photo" column
        if (headerText === "Photo") {
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
                sortTableByColumn(index, "asc");
            };

            const downArrow = document.createElement("a");
            downArrow.textContent = "▼"; // Down arrow
            downArrow.style.cursor = "pointer";
            downArrow.style.fontSize = "12px"; // Adjust arrow size
            downArrow.onclick = () => {
                console.log(`Sorting ${headerText} in descending order`);
                sortTableByColumn(index, "desc");
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


createTableHeader("teachersTableHead");

//=== End of code related how to sort from head ===//

//=== code related how to use filter ===//
const subjectFilter = document.getElementById("subjectFilter");

//=== end of code related how to use filter ===//


  // Render schedule table

  function renderTeachers() {

    (document.querySelector("#teachersTableBody")).innerHTML = "";

    // get all teachers from localStorage
    const teachers = getTeachers();


    teachers.forEach((teacher) => {

      const row = (document.querySelector("#teachersTableBody")).insertRow();
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


    // create object teacher
    const teacher ={
      name: teacherName,
      subject: teacherSubject,
    }

    // call function from localStorage to save dates
    saveTeacher(teacher);





    // Add the new teacher to the schedule (you could extend this as needed)
    teachersTable.push({
      teacher: teacherName,
      subject: teacherSubject,
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