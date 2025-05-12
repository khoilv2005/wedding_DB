// components/DreamItDoItSection.tsx
import React from 'react';

interface DreamItDoItSectionProps {
  scriptPart1?: string;
  mainTextPart1?: string;
  scriptPart2?: string;
}

const DreamItDoItSection: React.FC<DreamItDoItSectionProps> = ({
  scriptPart1 = "If ",
  mainTextPart1 = "you can dream it, we can do",
  scriptPart2 = "it!",
}) => {
  return (
    <div className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-gray-800 leading-tight"
          style={{ fontFamily: "'Lora', serif" }}
        >
          <span
            // Áp dụng font Caveat cho phần script
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[7rem] mr-1 sm:mr-2 align-baseline"
          >
            {scriptPart1}
          </span>
          <span
            className="align-baseline"
            style={{ fontFamily: "'Lora', serif" }} // Áp dụng font Lora cho phần main text
          >
            {mainTextPart1}
          </span>
          <span
            // Áp dụng font Caveat cho phần script
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[7rem] ml-1 sm:ml-2 align-baseline"
          >
            {scriptPart2}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default DreamItDoItSection;