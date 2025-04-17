import React from "react";

const Suggestions = ({ suggestions }) => {
  console.log(suggestions)
  return (
    <div>
      {suggestions.length > 0 && (
        <ul className="text-sm -mt-4 ml-2 text-blue-500">
          <p className="text-black">Username already exists? Try these -</p>
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;
