import { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@material-ui/core";
import QuizComponent from "./QuizComponent";

const QuizContainer = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get("https://api.jsonbin.io/v3/b/646e5795b89b1e2299a4246d").then(
      (response) => {
        setData(response.data.record);
      }
    );
  }, []);

  return data ? (
    Object.keys(data).map((item, index) => {
      return (
        <Card key={index} style={{ margin: "20px", padding:'20px', marginTop: '40px' }}>
            <h3>{item}</h3>
            <QuizComponent Quiz={data[item]} />
        </Card>
      );
    })
  ) : (
    <div>No data</div>
  );
};

export default QuizContainer;
