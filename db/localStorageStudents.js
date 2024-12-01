// Module to handle student data in LocalStorage


// Save a student to LocalStorage
export function saveStudent(student) {
    // Get the current list of students from LocalStorage, or initialize it as an empty array if it doesn't exist
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Add the new student to the list
    students.push(student);
    
    // Save the updated list of students back to LocalStorage
    localStorage.setItem('students', JSON.stringify(students));
  }
  
  // Get all students from LocalStorage
  export function getStudents() {
    // Retrieve the list of students from LocalStorage
    let students = JSON.parse(localStorage.getItem('students'));
    
    // If there are no students stored, return an empty array
    if (!students) {
      return [];
    }
    
    return students;
  }
  
  // Get a student by ID
  export function getStudentById(id) {
    // Retrieve the list of students from LocalStorage
    let students = JSON.parse(localStorage.getItem('students'));
    
    // Find the student with the specified ID
    return students ? students.find(student => student.id === id) : null;
  }
  
  // Remove a student from LocalStorage by ID
  export function removeStudent(id) {
    // Retrieve the list of students from LocalStorage
    let students = JSON.parse(localStorage.getItem('students'));
    
    // If the list exists, filter out the student with the specified ID
    if (students) {
      students = students.filter(student => student.id !== id);
      
      // Save the updated list of students back to LocalStorage
      localStorage.setItem('students', JSON.stringify(students));
    }
  }
  
  // Update student data in LocalStorage
  export function updateStudent(id, updatedstudent) {
    // Retrieve the list of students from LocalStorage
    let students = JSON.parse(localStorage.getItem('students'));
    
    // If the list exists, find the student by ID and update their data
    if (students) {
      const studentIndex = students.findIndex(student => student.id === id);
      
      if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...updatedstudent };
        
        // Save the updated list of students back to LocalStorage
        localStorage.setItem('students', JSON.stringify(students));
      }
    }
  }

