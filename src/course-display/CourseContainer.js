import { useEffect, useState } from "react";
import Axios from "axios";
import UnitComponent from "./UnitComponent";
import { Card } from "@material-ui/core";

const CourseContainer = () => {
  const [data, setData] = useState();

  useEffect(() => {
    Axios.get("https://api.jsonbin.io/v3/b/646e09f6b89b1e2299a3eda7").then(
      (response) => {
        setData(response.data.record);
      }
    );
  }, []);

  return (
    <>
      <h1 style={{ margin: "20px" }}>Course</h1>
      {data ? (
        data.course.sections.map((item, index) => {
          return (
            <Card
              style={{ margin: "20px", padding: "20px", marginTop: "40px" }}
            >
              <UnitComponent CourseData={item} key={String(index)} />
            </Card>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </>
  );
};

export default CourseContainer;
