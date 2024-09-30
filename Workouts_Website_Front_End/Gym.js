// Gym.js

// Example function to handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  
  if (form) {
      form.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent form from submitting the traditional way
          
          // Basic form validation
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const status = document.getElementById('status').value;
          const gender = document.querySelector('input[name="gender"]:checked');

          let isValid = true;

          // Clear previous error messages
          document.getElementById('nameErrMsg').textContent = '';
          document.getElementById('emailErrMsg').textContent = '';
          document.getElementById('phoneErr').textContent = '';

          if (name === '') {
              document.getElementById('nameErrMsg').textContent = 'Name is required.';
              isValid = false;
          }

          if (email === '') {
              document.getElementById('emailErrMsg').textContent = 'Email is required.';
              isValid = false;
          }

          if (phone === '') {
              document.getElementById('phoneErr').textContent = 'Phone number is required.';
              isValid = false;
          }

          if (!gender) {
              alert('Please select your gender.');
              isValid = false;
          }

          if (isValid) {
              // Normally, you would send the form data to the server here
              alert('Form submitted successfully!');
              form.reset(); // Clear the form after successful submission
          }
      });
  }
});
