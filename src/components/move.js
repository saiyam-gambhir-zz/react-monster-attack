import PropTypes from 'prop-types';

const move = (props) => (
  <div className="MovesContainer">
    <div className="MonsterMove">{props.move.monsterMove}</div>
    <div className="PlayerMove">{props.move.playerMove}</div>
  </div>
);

move.defaultProps = {
  move: {
    monsterMove: '',
    playerMove: ''
  }
};

move.propTypes = {
  move: PropTypes.object
};

export default move;
