const move = (props) => (
  <div className="movesContainer">
    <div className="monsterMove">{props.move.monsterMove}</div>
    <div className="playerMove">{props.move.playerMove}</div>
  </div>
);

move.defaultProps = {
  move: {}
};

export default move;
