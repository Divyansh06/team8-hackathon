import { Card } from "@material-ui/core";
import SubUnitComponent from "./SubUnitComponent";

const CourseContainer = (props) => {
  const content = [
    {
      video: 'https://share.synthesia.io/embeds/videos/535db557-8006-4baf-9cb0-aa2408efb204'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=380&h=280'
    }
  ]
  
  return (
    <>
      <h1 style={{ margin: "20px" }}>Course Content</h1>
      {props.data.subtopics.filter((item,index) => index < 2).map((item, index) => (
        <Card style={{ margin: "20px", padding: "20px", marginTop: "40px", width:'67%' }}>
          <SubUnitComponent SubunitData={{...item, ...content[index], index}} />
        </Card>
      ))}
    </>
  );
};

export default CourseContainer;
