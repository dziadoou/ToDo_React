import Tooltip from "react-bootstrap/Tooltip";

const PrioTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    6 - the most important
    <br />1 - the least important
  </Tooltip>
);
export default PrioTooltip;
