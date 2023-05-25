import { Card } from "@material-ui/core";
import SubUnitComponent from "./SubUnitComponent";

const CourseContainer = (props) => {
  return (
    <>
      <h1 style={{ margin: "20px" }}>Course Content</h1>
      {props.data.subtopics.map((item) => (
        <Card style={{ margin: "20px", padding: "20px", marginTop: "40px", width:'67%' }}>
          <SubUnitComponent SubunitData={{...item, video: 'https://share.synthesia.io/embeds/videos/535db557-8006-4baf-9cb0-aa2408efb204'}} />
        </Card>
      ))}
    </>
  );
};

export default CourseContainer;
