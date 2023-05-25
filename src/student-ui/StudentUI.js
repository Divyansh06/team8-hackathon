import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import "./StudentUI.css";
import { Data_Science_Course } from "./course1.ts";
import axios from "axios";
import { FormData } from "form-data";
import QuizContainer from "../quiz/QuizContainer";
import CourseContainer from "../course-display/CourseContainer";
import { RingLoader } from "react-spinners";

const StudentUI = () => {
  const [introduction, setIntroduction] = useState("");
  const [courseName, setCourseName] = useState("");
  const [continueAssignmnet, setContinueAssignmnet] = useState("");
  const [buildQuiz, setBuildQuiz] = useState("");
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [addNewQuiz, setAddNewQuiz] = useState("");
  const [quiz, setQuiz] = useState();
  const [showFinalVersion, setShowFinalVersion] = useState();
  const [showLoader, setShowLoader]= useState(false);
  const [showQuizLoader, setShowQuizLoader]= useState(false);

  // useEffect(()=>{
  //     removingTopics();
  // },[subtopics.length])

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
        // setCourseContent("ab");
      });

    //     setCourseContent(`  "Introduction": "Data Science is an interdisciplinary field that involves the application of statistical, computational, and machine learning techniques to extract insights from structured and unstructured data. This course aims to provide an overview of the key concepts, tools, and techniques used in data science.",
    //     "Subtopics": [
    //         "Data Wrangling and Exploration: This subtopic covers the process of cleaning, transforming, and visualizing data to gain insights and prepare it for analysis. It includes techniques for handling missing data, outlier detection, and data visualization.",
    //         "Machine Learning: This subtopic focuses on the application of statistical models and algorithms to make predictions or decisions based on data. It covers supervised and unsupervised learning techniques, such as linear regression, logistic regression, decision trees, and clustering."
    //     ]
    // }`);
  }

  function continueAssignmnetHandler() {
    setContinueAssignmnet("def");
  }

  function textHandler(e) {
    setCourseName(e.target.value);
  }

  function buildQuizHandler() {
    setBuildQuiz("efh");
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

    console.log(subTopicsDesc);
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
        <img src="https://lever-client-logos.s3.us-west-2.amazonaws.com/d3dff7b3-cda9-4dea-8369-e4a757ec81a1-1680561878928.png" style={{height:"165px", width:"430px", marginLeft:'350px',}}/>
      <div className="course-input" style={{marginLeft:'350px', marginTop:'50px'}}>
        <TextField
          value={courseName}
          label="Enter the course name"
          variant="outlined"
          onChange={(e) => textHandler(e)}
        />
        <button className="submit" onClick={() => submitHandler()}>
          Submit
        </button>
      </div>
      <br />
      {
        showLoader && <div style={{marginLeft: '650px', marginTop: '200px'}}><RingLoader color="#36d7b7" size={100}/></div>
      }
      {introduction && (
        <>
          <div style={{marginLeft: '350px'}}>
            <div style={{ marginBottom: "-15px", marginTop: "20px" }}>
              <label for="courseIntro">Course Intro</label>
            </div>
            <textarea
              id="courseIntro"
              className="curriculum-content"
              value={introduction}
              rows="10"
              onChange={(e) => setIntroduction(e.target.value)}
              style={{ marginTop: "30px", padding: '18px', borderRadius: '18px'}}
            />
          </div>
          <div style={{marginLeft: '350px', marginTop: '40px'}}>
            <h3>Sub units</h3>
            {subtopics.map((subtopic, index) => {
              return (
                <div style={{marginTop:"10px"}}>
                  <input type="checkbox" onClick={() => subtopicCheck(index)} />
                  &nbsp; &nbsp;
                  {subtopic.Name}
                  <div style={{marginTop:"8px", marginLeft: '31px', width: '66%', fontStyle:'italic'}} >{subtopic.Description}</div>
                </div>
              );
            })}
            <br />
            <input value={addNewQuiz} onChange={(e) => onChangeHandler(e)} style={{borderRadius:'6px', borderWidth: '1px', borderColor: 'grey', height: '30px', width: '150px'}}/>
            &nbsp;&nbsp;{" "}
            <button className="submit" onClick={() => addSubtopic()}>
              Add Subtopic
            </button>
            <br />
            <br />
            <button className="submit" onClick={() => submitCheckbox()} style={{marginLeft:'-7px'}}>
              Submit
            </button>
            {/* <textarea
              className="curriculum-content"
              value={courseContent}
              rows="40"
              columns="240"
            /> */}
            <br />
            <br />
            {continueAssignmnet.length > 0 ? (
              <>
                <textarea
                  className="curriculum-content"
                  value={continueAssignmnet}
                  rows="40"
                  columns="240"
                />
                <br />
                <button
                  className="assign-points"
                  onClick={() => buildQuizHandler()}
                >
                  Build A Quiz
                </button>

                {buildQuiz.length > 0 ? (
                  <>
                    <textarea
                      className="curriculum-content"
                      value={buildQuiz}
                      rows="40"
                      columns="240"
                    />
                    <br />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      {showQuizLoader && <div style={{marginLeft: '650px', marginTop: '80px', marginBottom: '150px'}}><RingLoader color="#36d7b7" size={100}/></div> }
      {quiz && (
        <div style={{marginLeft: '313px', marginTop: '40px'}}>
          <QuizContainer data={quiz} />
          <button
            className="submit"
            onClick={() => setShowFinalVersion(true)}
          >Finalise</button>
        </div>
      )}
      {showFinalVersion && (
        <div style={{marginLeft: '313px', marginTop: '40px'}}>
          <CourseContainer data={{ introduction, subtopics }} />
        </div>
      )}
    </div>
  );
};

export default StudentUI;
