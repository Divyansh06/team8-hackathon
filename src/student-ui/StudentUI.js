import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./StudentUI.css";
import axios from "axios";
import QuizContainer from "../quiz/QuizContainer";
import CourseContainer from "../course-display/CourseContainer";
import { RingLoader } from "react-spinners";

const StudentUI = () => {
  const [introduction, setIntroduction] = useState("");
  const [courseName, setCourseName] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [addNewQuiz, setAddNewQuiz] = useState("");
  const [quiz, setQuiz] = useState();
  const [showFinalVersion, setShowFinalVersion] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [showQuizLoader, setShowQuizLoader] = useState(false);

  function submitHandler() {
    setShowLoader(true);
    axios
      .post(
        "https://springboardhackathon2023.onrender.com/call-gpt/intro",
        {
          course_name: courseName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShowLoader(false);
        setIntroduction(response.data.Introduction);
        setSubtopics(response.data.Subtopics);
      });
  }

  function textHandler(e) {
    setCourseName(e.target.value);
  }

  function subtopicCheck(index) {
    let subTopicsCheck = [...selectedSubtopics];
    subTopicsCheck = subTopicsCheck.concat(index);
    setSelectedSubtopics(subTopicsCheck);
  }

  function submitCheckbox() {
    let subTopicsDesc = [];

    selectedSubtopics.map((selectedSubtop) => {
      subTopicsDesc.push(subtopics[selectedSubtop].Name);
    });

    setShowQuizLoader(true);

    axios
      .post(
        "https://springboardhackathon2023.onrender.com/call-gpt/quiz",
        {
          topics: subTopicsDesc,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShowQuizLoader(false);
        setQuiz(response.data);
      });
  }

  function onChangeHandler(e) {
    setAddNewQuiz(e.target.value);
  }

  function addSubtopic() {
    let addedTopic = [...subtopics];
    addedTopic.push({ Name: addNewQuiz });
    setSubtopics(addedTopic);
    setAddNewQuiz("");
  }

  return (
    <div className="App">
      <img
        src="https://lever-client-logos.s3.us-west-2.amazonaws.com/d3dff7b3-cda9-4dea-8369-e4a757ec81a1-1680561878928.png"
        style={{ height: "165px", width: "430px", marginLeft: "350px" }}
        alt="Springboard logo"
      />
      <div
        className="course-input"
        style={{ marginLeft: "350px", marginTop: "50px" }}
      >
        <TextField
          value={courseName}
          label="Enter the course name"
          variant="outlined"
          onChange={(e) => textHandler(e)}
          style={{ width: "500px" }}
        />
        <button className="submit" onClick={() => submitHandler()}>
          Submit
        </button>
      </div>
      <br />
      {showLoader && (
        <div style={{ marginLeft: "650px", marginTop: "200px" }}>
          <RingLoader color="#36d7b7" size={100} />
        </div>
      )}
      {introduction && (
        <>
          <div style={{ marginLeft: "350px" }}>
            <div style={{ marginBottom: "-15px", marginTop: "20px" }}>
              <label for="courseIntro">Course Intro</label>
            </div>
            <textarea
              id="courseIntro"
              className="curriculum-content"
              value={introduction}
              rows="10"
              onChange={(e) => setIntroduction(e.target.value)}
              style={{
                marginTop: "30px",
                padding: "18px",
                borderRadius: "18px",
              }}
            />
          </div>
          <div style={{ marginLeft: "350px", marginTop: "40px" }}>
            <h3>Sub units</h3>
            {subtopics.map((subtopic, index) => {
              return (
                <div style={{ marginTop: "10px" }}>
                  <input type="checkbox" onClick={() => subtopicCheck(index)} />
                  &nbsp; &nbsp;
                  {subtopic.Name}
                  <div
                    style={{
                      marginTop: "8px",
                      marginLeft: "31px",
                      width: "66%",
                      fontStyle: "italic",
                    }}
                  >
                    {subtopic.Description}
                  </div>
                </div>
              );
            })}
            <br />
            <input
              value={addNewQuiz}
              onChange={(e) => onChangeHandler(e)}
              style={{
                borderRadius: "6px",
                borderWidth: "1px",
                borderColor: "grey",
                height: "30px",
                width: "150px",
              }}
            />
            &nbsp;&nbsp;{" "}
            <button className="submit" onClick={() => addSubtopic()}>
              Add Subtopic
            </button>
            <br />
            <br />
            <button
              className="submit"
              onClick={() => submitCheckbox()}
              style={{ marginLeft: "-7px" }}
            >
              Submit
            </button>
            <br />
            <br />
          </div>
        </>
      )}
      {showQuizLoader && (
        <div
          style={{
            marginLeft: "650px",
            marginTop: "80px",
            marginBottom: "150px",
          }}
        >
          <RingLoader color="#36d7b7" size={100} />
        </div>
      )}
      {quiz && (
        <div style={{ marginLeft: "313px", marginTop: "40px" }}>
          <h1 style={{marginLeft: '20px'}}>Quiz</h1>
          <QuizContainer data={quiz} />
          <button className="submit" onClick={() => setShowFinalVersion(true)}>
            Finalise
          </button>
        </div>
      )}
      {showFinalVersion && (
        <div style={{ marginLeft: "313px", marginTop: "60px" }}>
          <CourseContainer data={{ introduction, subtopics }} />
        </div>
      )}
    </div>
  );
};

export default StudentUI;
