const ConfirmedTask = (props) => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toISOString().slice(0, 10);
  return (
    <div className="container" id="confirmed" style={{ display: "inline" }}>
      <span>{props.name} / </span>
      <span>
        Completed on: {currentDate} at: {currentTime}
      </span>
      <br />
    </div>
  );
};

export default ConfirmedTask;
