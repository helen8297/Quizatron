import React from "react";

function IncorrectResponse({ correctAnswer }) {
  return (
    <div>
      <p>❌ Wrong! </p>
      <p>The correct answer was: {correctAnswer}</p>
    </div>
  );
}

export default IncorrectResponse;
