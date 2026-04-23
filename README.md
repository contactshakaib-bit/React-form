# React Registration Form with Validation

A responsive registration form built with React that captures user information and performs real-time validation. The form includes automatic age calculation based on date of birth and comprehensive error handling.

## Features

- Form Fields: First name, Last name, Email, Contact number, Gender, Date of Birth, About section
- Real-time Validation: Validates all fields before submission
- Auto Age Calculation: Automatically calculates and displays age when user selects date of birth
- Error Messages: Displays specific error messages for invalid or missing fields
- Reset Functionality: One-click reset to clear all form fields and errors
- Console Logging: Submits form data to console for debugging/integration

## Tech Stack

- Frontend: React (Hooks)
- State Management: useState Hook
- Styling: Custom CSS (App.css)

## Installation

### Prerequisites

- Node.js 
- npm

### Setup Instructions

1. Clone the repository
   git clone https://github.com/contactshakaib-bit/React-form.git
   cd React-form

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

4. Open  http://localhost:5173/ to view the form in action.

## Form Validation Rules

| Field | Validation Rule |
|-------|----------------|
| First Name | Required |
| Last Name | Required |
| Email | Required |
| Contact | Required & Minimum 11 digits |
| Gender | Optional |
| Date of Birth | Auto-calculates age |
| About | Optional |

## How It Works

### Age Calculation
When a user selects a date of birth, the form automatically:
1. Calculates the exact age based on the current date
2. Displays the age in a read-only textarea field
3. Updates in real-time when the date changes

### Validation Process
- Validation runs on form submission
- Error messages appear for each invalid field
- Form submits only when all required fields pass validation
- Success message appears on valid submission

### State Management
The form uses React's useState hook to manage:
- All form field values
- Validation error states
- Dynamic age calculation

## Project Structure

React-form/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main form component
│   ├── App.css         # Styling for the form
│   └── index.js        # Entry point
├── package.json
└── README.md

## Code Overview

### Key Functions

// Handles form input changes and age calculation
const handleChanges = (e) => {
  const { name, value } = e.target;
  if (name === "dob") {
    const age = calculateAge(value);
    setvalue({
      ...values,
      dob: value,
      age: `your age:${age} years`
    });
  } else {
    setvalue({ ...values, [name]: value });
  }
};

// Validates form fields before submission
const validate = () => {
  let newErrors = {};
  if (!values.firstname) newErrors.firstname = "First name is required";
  if (!values.lastname) newErrors.lastname = "Last name is required";
  if (!values.email) newErrors.email = "Email is required";
  if (!values.contact) newErrors.contact = "Contact number is required";
  if (values.contact && values.contact.length < 11) {
    newErrors.contact = "Contact must be at least 11 digits";
  }
  return newErrors;
};

// Calculates age from date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

## Styling

The form uses App.css for styling. Key classes include:
- .cont - Main container
- .in1 - Input fields
- .dob1 - Date of birth and age fields
- .tex1 - Textarea for About section
- .button1 - Button container

## Known Issues & Improvements

Potential improvements:
- Add email format validation (regex)
- Add age range validation (e.g., must be 18+)
- Add phone number format validation
- Add real-time validation (on blur instead of only on submit)
- Add success message display instead of alert

## Contact

Shakaib Sikandar - contact.shakaib@gmail.com

Project Link: https://github.com/contactshakaib-bit/React-form.git


