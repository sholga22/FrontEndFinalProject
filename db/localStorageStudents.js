// Module to handle teacher data in LocalStorage


// Save a teacher to LocalStorage
export function saveTeacher(teacher) {
    // Get the current list of teachers from LocalStorage, or initialize it as an empty array if it doesn't exist
    let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    
    // Add the new teacher to the list
    teachers.push(teacher);
    
    // Save the updated list of teachers back to LocalStorage
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }
  
  // Get all teachers from LocalStorage
  export function getTeachers() {
    // Retrieve the list of teachers from LocalStorage
    let teachers = JSON.parse(localStorage.getItem('teachers'));
    
    // If there are no teachers stored, return an empty array
    if (!teachers) {
      return [];
    }
    
    return teachers;
  }
  
  // Get a teacher by ID
  export function getTeacherById(id) {
    // Retrieve the list of teachers from LocalStorage
    let teachers = JSON.parse(localStorage.getItem('teachers'));
    
    // Find the teacher with the specified ID
    return teachers ? teachers.find(teacher => teacher.id === id) : null;
  }
  
  // Remove a teacher from LocalStorage by ID
  export function removeTeacher(id) {
    // Retrieve the list of teachers from LocalStorage
    let teachers = JSON.parse(localStorage.getItem('teachers'));
    
    // If the list exists, filter out the teacher with the specified ID
    if (teachers) {
      teachers = teachers.filter(teacher => teacher.id !== id);
      
      // Save the updated list of teachers back to LocalStorage
      localStorage.setItem('teachers', JSON.stringify(teachers));
    }
  }
  
  // Update teacher data in LocalStorage
  export function updateTeacher(id, updatedTeacher) {
    // Retrieve the list of teachers from LocalStorage
    let teachers = JSON.parse(localStorage.getItem('teachers'));
    
    // If the list exists, find the teacher by ID and update their data
    if (teachers) {
      const teacherIndex = teachers.findIndex(teacher => teacher.id === id);
      
      if (teacherIndex !== -1) {
        teachers[teacherIndex] = { ...teachers[teacherIndex], ...updatedTeacher };
        
        // Save the updated list of teachers back to LocalStorage
        localStorage.setItem('teachers', JSON.stringify(teachers));
      }
    }
  }

