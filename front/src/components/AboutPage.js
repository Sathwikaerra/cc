// AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen text-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">Terms and Conditions</h1>

        {/* Introduction Section with White Background */}
        <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Introduction</h2>
          <p className="text-sm">We, the students of Rajiv Gandhi University of Knowledge Technologies, Basar, have developed this website with sincere intentions and a noble purpose. We trust it will prove to be mutually beneficial.</p>

          <p className="text-sm leading-relaxed text-gray-700 mb-4">
            Thank You.
          </p>
        </section>

        {/* Usage Section with Light Gray Background */}
        <section className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Usage of Services</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            You agree to use our services only for lawful purposes. You are prohibited from violating any applicable laws or engaging in any activities that could harm our platform or its users.
          </p>
        </section>

        {/* Responsibilities Section with White Background */}
        <section className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">User Responsibilities</h2>
          <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700">
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account information and password.</li>
            <li><strong>Compliance:</strong> You agree to comply with all relevant laws and regulations while using our services.</li>
            <li><strong>Content:</strong> You are responsible for any content you upload or share on our platform.</li>
          </ul>
        </section>

        {/* Limitation of Liability Section with Light Gray Background */}
        <section className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Limitation of Liability</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            We are not liable for any damages, including indirect or consequential losses, arising from the use of our services.
          </p>
        </section>
        <section className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Creators</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            <div className='flex flex-col justify-center items-center gap-4'>
              <p className='flex justify-center items-center gap-[60px]'><img className='w-[100px] h-[100px] rounded-[80px]' src='https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/07/muzan-kibutsuji-demon-slayer.jpeg'/><b>Aerra Sathwik(CSE)</b></p>
              <p className='flex justify-center items-center gap-6'><img className='w-[100px] h-[100px] rounded-[80px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHLKGQnQs38aPAXy1D9R2_eO4I6NXkcmJM8Q&s'/><b>Ciriguri Prasadkumar(EEE)</b></p>
              <p className='flex justify-center items-center gap-4'><img className='w-[100px] h-[100px] rounded-[80px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Prime_Minister_of_India_Narendra_Modi.jpg/640px-Prime_Minister_of_India_Narendra_Modi.jpg'/><b>Sirimangali Bhageshwar(EEE)</b></p>

            </div>
          </p>
        </section>

        {/* Contact Information Section with White Background */}
        <section className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-500 mb-2">Contact Information</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            If you have any questions regarding these terms and conditions, please contact us at <b>campusconnect322@gmail.com.</b>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
