import { sequelize } from './database'; // Adjust to your sequelize instance import
import User from './user_model.js';
import Student from './student_model.js';
import Staff from './staff_model.js';
import faker from 'faker';

const generateFakeData = async () => {
  try {
    // Create 20 fake users
    const users = [];
    for (let i = 0; i < 20; i++) {
      const user = await User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      users.push(user);
    }

    // Create fake students and staff linked to users
    for (let user of users) {
      if (Math.random() > 0.5) { // 50% chance to create a student or staff
        await Student.create({
          id: user.id,
          course: faker.random.arrayElement(['Mathematics', 'Science', 'Engineering', 'History']),
        });
      } else {
        await Staff.create({
          id: user.id,
          role: faker.random.arrayElement([
            'Professor', 
            'Teaching Assistant', 
            'Administrator', 
            'Dean', 
            'Counselor', 
            'Librarian', 
            'Lab Assistant', 
            'IT Support',
            'Cleaner',         
            'Technician',      
            'Security Officer', 
            'Receptionist',    
            'Nurse',           
            'Tutor',            
            'Event Coordinator'
          ]),
          course: faker.random.arrayElement(['Mathematics', 'Science', 'Engineering', 'History']),
        });
      }
    }

    console.log("Fake data generated successfully!");
  } catch (error) {
    console.error("Error generating fake data:", error);
  }
};

// Call the function to generate data
generateFakeData();
