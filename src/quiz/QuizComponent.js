import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

const QuizComponent = (props) => {
  console.log(props.Quiz)
  return (
    <div>
      {Object.keys(props.Quiz).map((item, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <b>{props.Quiz[item].Question}</b>
            </AccordionSummary>
            <AccordionDetails>
              <ol style={{ margin: "-20px" }}>
                {props.Quiz[item].Options.map((element, key) => {
                  return <li key={key} style={{ margin: "20px" }}>{element}</li>;
                })}
              </ol>
            </AccordionDetails>
            <div style={{ margin: "20px" }}>
              <b>Answer: </b>
              <i>{props.Quiz[item].Answer}</i>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default QuizComponent;
