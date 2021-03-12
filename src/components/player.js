const player = (props) => (
  <div className={`player ${props.type}`}>
    <h1 className="playerType">{props.type} <br /> {props.maxHealth}</h1>
    <span className="background" style={{width: props.maxHealth + '%'}}></span>
  </div>
);

export default player;
