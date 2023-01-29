import React from "react";

function QuestionItem({ question,onItemDelete,onPatchQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onItemDelete(question));
  }

  // function handleAnswerChange() {
  //   fetch(`http://localhost:4000/items/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       "correctIndex": correctIndex
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedItem) => console.log(updatedItem));
  // }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => onPatchQuestion(id, { correctIndex: e.target.value })}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
