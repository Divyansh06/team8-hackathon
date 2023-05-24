import SubUnitComponent from "./SubUnitComponent";

const UnitComponent = (props) => {
  return (
    <div>
      <div>
        <h1>{props.CourseData.name}</h1>
        <p>{props.CourseData.description}</p>
      </div>
      {props.CourseData.subsections.map((item, index) => {
        return <SubUnitComponent SubunitData={item} key={String(index)}/>;
      })}
    </div>
  );
};

export default UnitComponent;
