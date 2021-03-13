import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const move = (props) => (
  <motion.div className="MovesContainer" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
    <div className="MonsterMove">{props.move.monsterMove}</div>
    <div className="PlayerMove">{props.move.playerMove}</div>
  </motion.div>
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
