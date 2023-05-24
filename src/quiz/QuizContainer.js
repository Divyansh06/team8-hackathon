import { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "@material-ui/core";
import QuizComponent from "./QuizComponent";

const QuizContainer = (props) => {
  const data = props.data;
  
  console.log({data})

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
