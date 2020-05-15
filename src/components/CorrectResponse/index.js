import React from "react";

function CorrectResponse({ correctAnswer }) {
  return (
    <div>
      <p>✅ Correct!</p>
      <p>Your answer was: {correctAnswer}</p>
    </div>
  );
}

export default CorrectResponse;
