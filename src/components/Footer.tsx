import React from "react";
import { Shield } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </h3>
            <p className="text-gray-300 text-sm">
              Your uploaded images are not stored or shared
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Supported Cancer Types
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Acute Lymphoblastic Leukemia</li>
              <li>• Brain Cancer</li>
              <li>• Breast Cancer</li>
              <li>• Cervical Cancer</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Technology</h3>
            <p className="text-gray-300 text-sm">
              We have used higly trained models on big datasets.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm"></div>
      </div>
    </footer>
  );
};

export default Footer;
