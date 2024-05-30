import React from 'react';
import { FaLaptopMedical, FaStethoscope, FaNotesMedical, FaSyringe, FaMicroscope, FaPills, FaCut, FaHospitalAlt, FaUserMd, FaDog, FaHome } from 'react-icons/fa';

const HomePage = () => {
  const sections = [
    { name: 'Consulta Virtual', icon: <FaLaptopMedical />, color: 'bg-red-400' },
    { name: 'Consulta Médica', icon: <FaStethoscope />, color: 'bg-pink-400' },
    { name: 'Consulta Rápida', icon: <FaNotesMedical />, color: 'bg-red-400' },
    { name: 'Control Consulta', icon: <FaNotesMedical />, color: 'bg-yellow-400' },
    { name: 'Exámenes', icon: <FaMicroscope />, color: 'bg-yellow-400' },
    { name: 'Vacunación', icon: <FaSyringe />, color: 'bg-teal-400' },
    { name: 'Desparasitacion', icon: <FaPills />, color: 'bg-green-400' },
    { name: 'Baño o Corte', icon: <FaCut />, color: 'bg-blue-400' },
    { name: 'Guardería', icon: <FaHome />, color: 'bg-blue-400' },
    { name: 'Cirugía', icon: <FaUserMd />, color: 'bg-yellow-400' },
    { name: 'Hospitalización', icon: <FaHospitalAlt />, color: 'bg-yellow-400' },
    { name: 'Certificado Médico', icon: <FaDog />, color: 'bg-green-400' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">¿Qué deseas hacer hoy?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {sections.map((section, index) => (
          <div key={index} className={`flex flex-col items-center p-4 ${section.color} text-white rounded-full shadow-lg`}>
            <div className="text-4xl mb-2">{section.icon}</div>
            <div className="text-center">{section.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

