const button = (props) => (
  <button className={`Button ${props.type}`} onClick={props.clicked} disabled={props.isDisabled}>
    {props.children}
  </button>
);

export default button;
