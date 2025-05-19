import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import SaraburiTypography from "./saraburiTypography";

interface FAQItemProps {
    question: string;
    answer: string | React.ReactNode;
}

const SaraburiDropdown = ({ question, answer } : FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center py-4 text-left"
        >
            <SaraburiTypography
                variant="h3"
                className="font-semibold"
            >
                {question}
            </SaraburiTypography>
          {isOpen ? (
            <HiChevronDown className="w-5 h-5 transition-transform duration-300 rotate-180" />
          ) : (
            <HiChevronDown className="w-5 h-5 transition-transform duration-300" />
          )}
        </button>
  
        {/* Collapsible Content with Smooth Transition */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 text-gray-600">
            {answer}
          </div>
        </div>
      </div>
    );
  };

export default SaraburiDropdown;