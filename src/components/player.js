import AnimatedNumber from "animated-number-react";
import PropTypes from 'prop-types';

const player = (props) => {
  let formatValue = (value) => value.toFixed(0);
  return (
    <div className={`Player ${props.type}`}>
      {props.maxHealth > 0 ?
        <>
        <h1 className="PlayerType">{props.type} <br />
          <AnimatedNumber value={props.maxHealth} duration="500" formatValue={formatValue} />
        </h1>
        <span className="Background" style={{width: props.maxHealth + '%'}}></span>
        </>
        : null}
    </div>
  );
};

player.defaultProps = {
  maxHealth: 100,
  type: ''
};

player.propTypes = {
  maxHealth: PropTypes.number,
  type: PropTypes.string
};

export default player;
