import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./StudentUI.css";
import { Data_Science_Course } from "./course1.ts";
import axios from "axios";
import { FormData } from "form-data";

const StudentUI = () => {
  const [courseName, setCourseName] = useState("");
  const [courseContent, setCourseContent] = useState("");

  async function submitHandler() {
    console.log(Data_Science_Course);

    // axios.get('https://api.quotable.io/random')
    // .then(res => {
    //     console.log("data ", res.data.content);
    //     setCourseContent(res.data.content);
    //   }).catch(err => {

    //   })

    const form = new FormData();
    form.append(
      "user_input",
      '"Create a course content on Data Science having subtopics "'
    );

    const response = await axios
      .post(
        "https://hackathon-backend-springboard.onrender.com/call-gpt",
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      )
      .then((res) => {
        console.log("data ", res.data.content);
      });
  }

  function textHandler(e) {
    // console.log(e.target.value);
    setCourseName(e.target.value);
  }

  return (
    <div className="App">
      <div className="course-input">
        <TextField
          label="Enter the course name :"
          variant="outlined"
          onChange={(e) => textHandler(e)}
        />
        {/* <Button className='submit' variant="contained" color="primary">Submit</Button> */}
        <button className="submit" onClick={() => submitHandler()}>
          Submit
        </button>
        <div>
          <textarea
            className="curriculum-content"
            value={courseContent}
            rows="40"
            columns="240"
          />
        </div>
      </div>
      <br />
      <button className="assign-points">Continue Assign Point</button>
    </div>
  );
};

export default StudentUI;
