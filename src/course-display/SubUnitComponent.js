import styles from "../styles.module.css";

const SubUnitComponent = (props) => {
  return (
    <div style={{ margin: "20px", marginTop: '40px' }}>
      <div>
        <h2>{props.SubunitData.name}</h2>
      </div>
      <div className={styles["unit-component-container"]}>
        <div>
          <img
            height={180}
            width={250}
            src={props.SubunitData.image}
            alt="sample"
          />
        </div>
        <div style={{ marginLeft: "20px" }}>{props.SubunitData.content}</div>
      </div>
    </div>
  );
};

export default SubUnitComponent;
