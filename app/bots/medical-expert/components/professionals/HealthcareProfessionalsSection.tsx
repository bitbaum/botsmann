import React from 'react';

/**
 * Healthcare Professionals Section
 * 
 * This component showcases how Imhotep helps healthcare professionals
 * by automating routine tasks, reducing errors, and enhancing patient care.
 * Emphasizes time savings, efficiency gains, and improved workflow for physicians.
 */
const HealthcareProfessionalsSection: React.FC = () => {
  return (
    <div className="my-16 scroll-mt-24 bg-gradient-to-r from-teal-50 to-blue-50 py-16 px-6 rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">For Healthcare Professionals</h2>
      <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
        Imhotep handles routine tasks so you can focus on what matters most: practicing medicine.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-xl font-semibold mb-2 text-green-700">More Time for Medicine</h3>
          <p className="text-gray-600">Reduce documentation burden by 40-60%. Focus on intellectual activities that drew you to medicine.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Reduce Errors</h3>
          <p className="text-gray-600">AI-assisted diagnosis and treatment verification to catch potential issues before they impact patients.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Cut Costs</h3>
          <p className="text-gray-600">Streamline operations and reduce administrative overhead by up to 30% with AI-powered workflow optimization.</p>
        </div>
      </div>
      
      {/* New section: Professional Integration */}
      <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Imhotep + You: Professional Integration</h3>
            <p className="text-gray-600 mb-6">
              When patients choose to connect with you through our platform, you'll gain powerful tools to enhance care delivery while 
              maintaining your central role in clinical decision-making.
            </p>
            
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">View comprehensive patient health data they choose to share</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">Customize the AI assistant to align with your treatment approach</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">Monitor patient progress and adherence between appointments</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700">Provide guidance that the AI reinforces with your patients</span>
              </div>
            </div>
            
            <div className="italic text-gray-600 border-l-4 border-blue-200 pl-4 py-1">
              "The future of healthcare is collaborative. AI assistants like Imhotep extend your reach and impact, 
              while your expertise ensures patients receive the highest standard of care."
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-blue-50 w-32 h-32 rounded-full flex items-center justify-center text-5xl">
              👨‍⚕️
            </div>
          </div>
        </div>
        
        <a href="#vision-and-join" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Join Professional Waitlist
        </a>
        <span className="ml-3 text-sm text-blue-600">Coming Q3 2024</span>
      </div>
      
      {/* Typical Workflow Example */}
      <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-bold text-center mb-6">Typical Clinical Workflow with Imhotep</h3>
        
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 font-bold">1</span>
              </div>
              {/* Line connecting to next step */}
              <div className="hidden md:block w-1 bg-blue-100 h-full"></div>
            </div>
            <div className="md:w-5/6">
              <h4 className="text-lg font-medium text-blue-800">Pre-Visit Preparation</h4>
              <p className="text-gray-600 mb-2">
                Patient interacts with Imhotep, answering detailed health questions and sharing concerns. The system 
                collects vital signs and data from connected devices if available.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>AI Tasks:</strong> Collects patient history, analyzes symptoms, prepares summary
                </p>
                <p className="text-sm text-green-700">
                  <strong>Physician Benefit:</strong> Arrives to appointment with comprehensive pre-visit summary
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 font-bold">2</span>
              </div>
              <div className="hidden md:block w-1 bg-blue-100 h-full"></div>
            </div>
            <div className="md:w-5/6">
              <h4 className="text-lg font-medium text-blue-800">During Visit</h4>
              <p className="text-gray-600 mb-2">
                Imhotep automatically transcribes and structures the appointment, highlighting key findings and possible diagnoses
                as you speak with the patient. AI generates documentation in real-time.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>AI Tasks:</strong> Real-time transcription, documentation, relevant medical reference retrieval
                </p>
                <p className="text-sm text-green-700">
                  <strong>Physician Benefit:</strong> Focus on patient instead of note-taking, reducing visit time by ~30%
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 font-bold">3</span>
              </div>
              <div className="hidden md:block w-1 bg-blue-100 h-full"></div>
            </div>
            <div className="md:w-5/6">
              <h4 className="text-lg font-medium text-blue-800">Treatment Planning</h4>
              <p className="text-gray-600 mb-2">
                AI suggests evidence-based treatment options for your review and approval. The system checks for potential 
                drug interactions and contraindications based on the patient's profile.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>AI Tasks:</strong> Treatment suggestion, interaction checking, personalization based on patient history
                </p>
                <p className="text-sm text-green-700">
                  <strong>Physician Benefit:</strong> Reduced research time, increased confidence in treatment decisions
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="text-blue-700 font-bold">4</span>
              </div>
            </div>
            <div className="md:w-5/6">
              <h4 className="text-lg font-medium text-blue-800">Post-Visit Monitoring</h4>
              <p className="text-gray-600 mb-2">
                Imhotep continues the care plan between visits, checking in with patients, providing reminders, and 
                collecting progress data. You receive alerts for concerning changes or non-adherence.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>AI Tasks:</strong> Daily check-ins, symptom tracking, medication adherence monitoring
                </p>
                <p className="text-sm text-green-700">
                  <strong>Physician Benefit:</strong> Continuous patient monitoring without additional workload, early intervention opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-bold text-center mb-6">How Imhotep Works in Your Practice</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium">Patient Intake & History</h4>
              <p className="text-gray-600">Automatically collect and summarize patient information before appointments, saving 10-15 minutes per visit.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium">Real-time Documentation</h4>
              <p className="text-gray-600">AI transcribes and structures clinical notes during patient encounters, allowing you to maintain eye contact.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium">Treatment Protocol Assistance</h4>
              <p className="text-gray-600">Access evidence-based guidelines and patient-specific recommendations in seconds, improving care quality.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-4">Join our early access program and shape the future of AI in healthcare.</p>
        <a href="#vision-and-join" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Request Access
        </a>
        <div className="border-t border-gray-100 pt-3 text-center mt-8">
          <p className="text-xs text-gray-500">Full platform launching 2026</p>
        </div>
      </div>
</div> 
  );
};

export default HealthcareProfessionalsSection; 