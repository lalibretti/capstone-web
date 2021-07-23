//import logo from './logo.svg';
import "antd/dist/antd.css";
import "./App.css";
import { Modal, Collapse } from "antd";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

function Callback() {
  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  //  const [selectedAnswer, setSelectedAnswer] = useState();

  const [questions, setQuestion] = useState();
  const [answers, setAnswers] = useState({});

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const [questionTxt, setQuestionTxt] = useState("");
  const [answerTxt, setAnswerTxt] = useState();

  const fetchCategories = async () => {
    let res = await fetch("http://localhost:3000/api/v1/category");
    let json = await res.json();
    console.log("json", json);
    setCategory(json);
  };

  useEffect(() => {
    console.log("run this only once when the page loads up");
    fetchCategories();
  }, []);

  const fetchQuestions = async (category) => {
    console.log("category", category);
    // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
    let res = await fetch(
      `http://localhost:3000/api/v1/category/${category.id}/questions`
    );
    let data = await res.json();
    console.log("data", data);
    setQuestion(data);
  };
  const fetchAnswers = async (question) => {
    if (question) {
      console.log("fetch Answer", question);
      //console.log(`http://localhost:3000/api/v1/questions/${q.id}/answers`);
      let res = await fetch(
        `http://localhost:3000/api/v1/questions/${question.id}/answers`
      ); //
      let data = await res.json();
      console.log("answer data", data);
      //setAnswers(data)
      setAnswers({ ...answers, [question.id]: data });
    }
  };

  const switchCategory = async (category) => {
    console.log("the selcted category is", category);
    setSelectedCategory(category);

    fetchQuestions(category);
  };
  const createQuestion = async () => {
    console.log("questionTxt", questionTxt);
    console.log("selectedCategory", selectedCategory);
    let res = await fetch(
      `http://localhost:3000/api/v1/category/${selectedCategory.id}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionTxt: questionTxt }),
      }
    );
    let data = await res.json();
    console.log("data", data);
    fetchQuestions(selectedCategory);
    setQuestionTxt("");
    setShowQuestionForm(false);
  };
  const onPanelChange = async (questionId) => {
    console.log("the questionId:", questionId);
    let q;
    questions.map((question) => {
      if (question.id == questionId) {
        q = question;
      }
    });
    console.log("q", q);
    setSelectedQuestion(q);
    fetchAnswers(q);
    console.log("panel was clicked");
  };
  const createAnswer = async () => {
    console.log("answerTxt", answerTxt);
    console.log("selectedQuestion", selectedQuestion);
    let res = await fetch(
      `http://localhost:3000/api/v1/questions/${selectedQuestion.id}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answerTxt: answerTxt }),
      }
    );
    let data = await res.json();
    console.log(data);
    fetchAnswers(selectedQuestion);
    setAnswerTxt("");
    setShowAnswerForm(false);
  };

  return (
    <div>
      <div
        className={
          "flex justify-center p-6 border-b-4 border-gray-900 font-mono"
        }
      >
        <h1
          className={
            " sm:text-5xl md:text-6xl uppercase font-bold tracking-wider"
          }
        >
          Create A Quiz
        </h1>
      </div>
      {/*New Question Modal */}
      <Modal
        title="New Question"
        visible={showQuestionForm}
        closable={false}
        footer={null}
      >
        {selectedCategory && (
          <div className={"w-full p-2"}>
            <textarea
              value={questionTxt}
              onChange={(ev) => setQuestionTxt(ev.currentTarget.value)}
              type="text"
              rows={4}
              className={"border-gray-900 p-1 w-full mb-4"}
              placeholder={"Enter the question text..."}
            />

            <button
              className={"px-4 py-3 bg-blue-500 text-white rounded mr-4"}
              onClick={createQuestion}
            >
              Create Question
            </button>
            <button
              className={"px-4 py-3 bg-red-500 text-white rounded"}
              onClick={() => setShowQuestionForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>

      <div className={"grid grid-cols-12 font-sans border-gray-900"}>
        <div className={"col-span-12 md:col-span-2 scale-200"}>
          <h1
            className={
              "font-bold tracking-wider uppercase justify-center text-1xl"
            }
          >
            Categories
          </h1>
          {/* <Button type="danger" ghost>Primary Button</Button> */}
          <ul className={"border-gray-900"}>
            {category &&
              category.map((category) => {
                return (
                  <li
                    key={category.id}
                    onClick={() => switchCategory(category)}
                    className={
                      selectedCategory && selectedCategory.id === category.id
                        ? "p-4 border-b text-10xl bg-gray-200 uppercase"
                        : "p-6 border-b text-2 font-bold hover:bg-blue-200 uppercase"
                    }
                  >
                    {category.name}
                  </li>
                );
              })}
          </ul>
        </div>

        <div
          className={
            "col-span-12 border-gray-900 md:col-span-10 h-96 bg-gray-300"
          }
        >
          <h1
            className={
              "font-bold tracking-wider justify-center text-1xl uppercase"
            }
          >
            Questions and Answers{" "}
          </h1>

          {selectedCategory && (
            <div className={"p-4"}>
              <button
                className={
                  "px-2 py-1 bg-blue-500 text-white text-bold rounded hover:bg-blue-900"
                }
                onClick={() => setShowQuestionForm(true)}
              >
                New Question
              </button>
            </div>
          )}

          {selectedCategory ? (
            <h1 className={"text-center text-l uppercase"}></h1>
          ) : (
            <h1
              className={"text-center text-4xl mt-20 uppercase text-white-200"}
            >
              Select a Category to enter a question!
            </h1>
          )}

          {selectedCategory && questions && questions.length > 0 && (
            <div className={"flex justify-center px-24 w-full"}>
              <Collapse
                accordion
                className={"w-full text-bold border-black-900 uppercase"}
                onChange={onPanelChange}
              >
                {questions &&
                  questions.map((question) => {
                    return (
                      <Panel header={question.questionTxt} key={question.id}>
                        {/* <p>{JSON.stringify(selectedQuestion)}</p> */}

                        {/* LL attempt 1 */}
                        {/* {selectedQuestion && answers && answers && <div className={'flex justify-center px-24 w-full'}></div>
                      }
                      <ul>
                      {answers[question.id] && answers[question.id].map((answer) => { 
                        return <p key={answer.id}>{answer.answerTxt}</p>
                      })}
                      </ul> */}

                        {/* <p>{JSON.stringify(answers)}</p> 
                  {/* {answers && answers.map((answer) => {
                        return <p header={answer.answerTxt} key={answer.id}>{answer.answerTxt}</p>
                      })} */}
                        <ul>
                          {answers &&
                            answers[question.id] &&
                            answers[question.id].map((answer) => {
                              return (
                                <li key={answer.id}>{answer.answerTxt}</li>
                              );
                            })}
                        </ul>
                        <button
                          onClick={() => setShowAnswerForm(true)}
                          className={
                            "px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-900"
                          }
                        >
                          Add Answer
                        </button>

                        {/* Add Answer Form */}
                        <Modal
                          title="New Answer"
                          visible={showAnswerForm}
                          closable={false}
                          footer={null}
                        >
                          {selectedCategory && selectedQuestion && (
                            <div className={"w-full p-2"}>
                              <textarea
                                value={answerTxt}
                                onChange={(ev) =>
                                  setAnswerTxt(ev.currentTarget.value)
                                }
                                type="text"
                                rows={4}
                                className={"border p-1 w-full mb-4"}
                                placeholder={"Enter the answer text..."}
                              />

                              <button
                                className={
                                  "px-4 py-3 bg-blue-500 text-white rounded mr-4"
                                }
                                onClick={createAnswer}
                              >
                                Add Answer
                              </button>
                              <button
                                className={
                                  "px-4 py-3 bg-red-500 text-white rounded"
                                }
                                onClick={() => setShowAnswerForm(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </Modal>
                      </Panel>
                    );
                  })}
              </Collapse>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Callback;
