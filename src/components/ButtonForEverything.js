import Button from "react-bootstrap/Button";

const ButtonForEverything = (props) => {
  return (
    <Button onClick={props.click} style={{ margin: "5px" }}>
      {props.name}
    </Button>
  );
};

export default ButtonForEverything;
