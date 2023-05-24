
import CourseContainer from "./course-display/CourseContainer";
import StudentUI  from "./student-ui/StudentUI";

function App() {
  return <div>
    <h1 style={{margin: '20px'}}>Course</h1>
    <CourseContainer />
        <div className='student-ui'>
          <StudentUI/>
    </div>
    </div>
}

export default App;
