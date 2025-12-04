import React, { useState } from 'react';

export default function AdminDashboard() {
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResumeFile(event.target.files[0]);
      alert(`Resume "${event.target.files[0].name}" selected. (Not actually uploaded)`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>

      {/* Manage Contents Placeholder */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-white">Manage Contents (Placeholder)</h2>
        <p className="text-gray-400 mb-6">
          This section demonstrates where content editing interfaces would be.
          Changes here are for display purposes only and are not saved.
        </p>
        <div className="space-y-6">
          {/* Example editable field: Hero Title */}
          <div>
            <label htmlFor="heroTitle" className="block text-gray-300 text-sm font-bold mb-2">Hero Title</label>
            <input
              type="text"
              id="heroTitle"
              defaultValue="이상훈"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
              readOnly // Read-only for placeholder
            />
          </div>
          {/* Example editable field: About Paragraph */}
          <div>
            <label htmlFor="aboutText" className="block text-gray-300 text-sm font-bold mb-2">About Section Paragraph</label>
            <textarea
              id="aboutText"
              defaultValue="생성형 AI와 데이터 분석 중심의 풀스택 개발자로, Python, Django, React, Streamlit을 기반으로 사용자 맞춤형 플랫폼을 개발하고 있습니다."
              rows="4"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white placeholder-gray-400"
              readOnly // Read-only for placeholder
            ></textarea>
          </div>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed">
            Save Changes (Not Functional)
          </button>
        </div>
      </section>

      {/* Manage Resume Placeholder */}
      <section className="bg-gray-800 p-8 rounded-lg shadow-xl dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-white">Manage Resume (Placeholder)</h2>
        <p className="text-gray-400 mb-6">
          This section allows you to manage your resume. Only client-side file selection is implemented.
        </p>
        <div className="flex items-center space-x-4">
          <label className="block">
            <span className="sr-only">Choose resume file</span>
            <input
              type="file"
              onChange={handleResumeUpload}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
          {resumeFile && (
            <span className="text-green-400 text-sm">{resumeFile.name} selected</span>
          )}
        </div>
        <div className="mt-6">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed mr-4">
                Upload to Server (Not Functional)
            </button>
            <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed">
                Delete Current (Not Functional)
            </button>
        </div>
      </section>
    </div>
  );
}
