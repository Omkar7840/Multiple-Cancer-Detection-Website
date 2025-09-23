import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClinicMedical,
  FaBrain,
  FaFemale,
  FaLungs,
  FaRibbon,
  FaSmile,
} from "react-icons/fa";
import { GiKidneys, GiVirus } from "react-icons/gi";
import { FaMicroscope, FaFileAlt } from "react-icons/fa";

interface CancerType {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface HomepageProps {
  cancerTypes: CancerType[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  all: <FaClinicMedical className="h-8 w-8 text-white" />,
  brain: <FaBrain className="h-8 w-8 text-white" />,
  breast: <FaRibbon className="h-8 w-8 text-white" />,
  cervical: <FaFemale className="h-8 w-8 text-white" />,
  kidney: <GiKidneys className="h-8 w-8 text-white" />,
  "lung-colon": <FaLungs className="h-8 w-8 text-white" />,
  lymphoma: <GiVirus className="h-8 w-8 text-white" />,
  oral: <FaSmile className="h-8 w-8 text-white" />,
};

const Homepage: React.FC<HomepageProps> = ({ cancerTypes }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered <span className="text-blue-600">Cancer Detection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload medical images for instant analysis across 8 different
              cancer types. Our advanced AI technology provides rapid screening
              results to assist healthcare professionals.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                Choose a cancer type below to begin analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cancer Detection Services
          </h2>
          <p className="text-lg text-gray-600">
            Select the cancer type you'd like to analyze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cancerTypes.map((cancer) => (
            <Link
              key={cancer.id}
              to={`/detect/${cancer.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
            >
              <div className="p-6">
                <div
                  className={`${cancer.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {iconMap[cancer.id]}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {cancer.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {cancer.description}
                </p>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  <span className="text-sm">Start Analysis</span>
                  <FaArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClinicMedical className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Analysis
              </h3>
              <p className="text-gray-600">
                Get results in seconds with our optimized AI models
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMicroscope className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                High Accuracy
              </h3>
              <p className="text-gray-600">
                Advanced deep learning models trained on medical data
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Detailed Reports
              </h3>
              <p className="text-gray-600">
                Comprehensive analysis with confidence scores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
