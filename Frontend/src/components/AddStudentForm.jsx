import React, { useState, useEffect } from 'react';

export default function AddStudentForm({
  studentForm,
  setStudentForm,
  handleAddStudent,
  studentError,
  studentSuccess,
  locationLoading
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fields = ['name','email','studentId','pincode','district','state','country'];

  const examples = {
    name: 'John Doe',
    email: 'Use a real email to receive messages',
    studentId: '123456',
    pincode: '110001',
    district: 'Central',
    state: 'Delhi',
    country: 'India'
  };

  // Calculate empty field errors only if user has tried submitting
  const emptyFieldErrors = hasSubmitted
    ? fields.reduce((acc, field) => {
        if (!studentForm[field]) {
          acc[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
        return acc;
      }, {})
    : {};

  // Reset form after successful submission
  useEffect(() => {
    if (studentSuccess) {
      setStudentForm({
        name: '',
        email: '',
        studentId: '',
        pincode: '',
        district: '',
        state: '',
        country: ''
      });
      setHasSubmitted(false); // clear validation messages after success
    }
  }, [studentSuccess, setStudentForm]);

  const handleSubmit = (e) => {
    e.preventDefault();  // prevent default form submission
    setHasSubmitted(true);
    handleAddStudent(e); // pass the event to original handler
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-xl shadow-xl max-w-3xl mx-auto flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-3 text-purple-400 text-center">
        Add New Student
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map(field => (
          <div
            key={field}
            className={`flex flex-col ${field === 'country' ? 'md:col-span-2' : ''} mb-3`}
          >
            <label className="mb-1 text-gray-300 font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={studentForm[field]}
              placeholder={!studentForm[field] ? examples[field] : ''}
              onChange={e =>
                setStudentForm({ ...studentForm, [field]: e.target.value })
              }
              className="p-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            {field === 'pincode' && locationLoading && (
              <p className="text-gray-400 mt-1 text-xs">Fetching location...</p>
            )}
            {emptyFieldErrors[field] && (
              <p className="text-red-500 mt-1 text-xs">{emptyFieldErrors[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Submit button and messages */}
      <div className="mt-3 flex flex-col items-center">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition duration-200 mb-2 text-sm"
        >
          Add Student
        </button>

        {studentError && <p className="text-red-500 text-sm">{studentError}</p>}
        {studentSuccess && <p className="text-green-400 text-sm">{studentSuccess}</p>}
      </div>
    </form>
  );
}
