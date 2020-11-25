import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

const DisabledBtn = (props) => {
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{props.text}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          disabled={!props.disabled}
          style={{ pointerEvents: "none", margin: "5px" }}
        >
          {props.name}
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default DisabledBtn;
