import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

const QuizComponent = (props) => {
  return (
    <div>
      {props.Quiz.map((item, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <b>{item.Question}</b>
            </AccordionSummary>
            <AccordionDetails>
              <ol style={{ margin: "-20px" }}>
                {item.Options.map((element, key) => {
                  return <li key={key} style={{ margin: "20px" }}>{element}</li>;
                })}
              </ol>
            </AccordionDetails>
            <div style={{ margin: "20px" }}>
              <b>Answer: </b>
              <i>{item.Answer}</i>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default QuizComponent;
