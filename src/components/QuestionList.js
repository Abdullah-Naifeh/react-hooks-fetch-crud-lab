import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [Questions,setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((response) => response.json())
    .then((questions) => setQuestions(questions))
  },[])

  function onItemDelete(deletedItem) {
    const updatedItems = Questions.filter((item) => item.id !== deletedItem.id);
    setQuestions(updatedItems);
  }

  const patchQuestion = async (id, updatedQuestion) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    });
    const updatedQuestionFromServer = await response.json();
    const updatedQuestions = Questions.map((question) =>
      question.id === id ? updatedQuestionFromServer : question
    );
    setQuestions(updatedQuestions);
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{Questions.map(question => <QuestionItem key={question.id} question={question} onItemDelete={onItemDelete} onPatchQuestion={patchQuestion}/>)}</ul>
    </section>
  );
}

export default QuestionList;
