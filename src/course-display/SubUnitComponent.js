import styles from "../styles.module.css";

const SubUnitComponent = (props) => {
  return (
    <div style={{ margin: "20px", marginTop: "40px" }}>
      <div>
        <h2>Subunit {props.SubunitData.index + 1} - {props.SubunitData.Name}</h2>
      </div>
      <div className={styles["unit-component-container"]}>
        <div>
          {props.SubunitData.video ? (
            <>
              <iframe
                title="Sample"
                height={140}
                width={250}
                src={props.SubunitData.video}
              ></iframe>
              <a href={props.SubunitData.video} target="_blank" rel="noreferrer">
                Go to link
              </a>
            </>
          ) : (
            <img
              height={140}
              width={250}
              src={props.SubunitData.image}
              alt="sample"
            />
          )}
        </div>
        <div style={{ marginLeft: "20px" }}>
          {props.SubunitData.Description}
        </div>
      </div>
    </div>
  );
};

export default SubUnitComponent;
