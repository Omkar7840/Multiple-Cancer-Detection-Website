import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Upload,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileImage,
  X,
} from "lucide-react";

interface CancerType {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface CancerDetectionProps {
  cancerTypes: CancerType[];
}

interface AnalysisResult {
  cancerDetected: boolean;
  cancerType: string;
  confidence: number;
  details: string;
}

const CancerDetection: React.FC<CancerDetectionProps> = ({ cancerTypes }) => {
  const { cancerType } = useParams<{ cancerType: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const currentCancer = cancerTypes.find((c) => c.id === cancerType);

  if (!currentCancer) {
    return <div className="p-8 text-center">Cancer type not found</div>;
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !currentCancer) return;

    setIsAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `http://localhost:5000/analyze/${currentCancer.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult({
          cancerDetected: data.cancerDetected,
          cancerType: currentCancer.name,
          confidence: data.confidence,
          details: data.cancerDetected
            ? `Potential ${currentCancer.name} detected. Please consult with a doctor.`
            : "No cancer detected.",
        });
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error analyzing image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cancer Types
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div
                className={`${currentCancer.color} w-16 h-16 rounded-xl flex items-center justify-center text-white`}
              >
                <FileImage className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentCancer.name}
                </h1>
                <p className="text-gray-600">{currentCancer.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
            Upload Medical Image
          </h2>

          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                Please upload your MRI images
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
              >
                Choose File
              </label>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileImage className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedFile.type.startsWith("image/") && (
                <div className="mb-4">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg border border-gray-200"
                  />
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isAnalyzing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing Image...</span>
                  </div>
                ) : (
                  "Start AI Analysis"
                )}
              </button>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Analysis Results
            </h2>

            <div
              className={`border-2 rounded-xl p-6 ${
                result.cancerDetected
                  ? "border-red-200 bg-red-50"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <div className="flex items-start space-x-4">
                {result.cancerDetected ? (
                  <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                )}

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      result.cancerDetected ? "text-red-900" : "text-green-900"
                    }`}
                  >
                    {result.cancerDetected
                      ? "Cancer Detected"
                      : "No Cancer Detected"}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {result.details}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={resetAnalysis}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Analyze Another Image
              </button>
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Different Cancer Type
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancerDetection;
