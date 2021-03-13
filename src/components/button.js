import PropTypes from 'prop-types';

const button = (props) => (
  <button className={`Button ${props.type}`} onClick={props.clicked} disabled={props.isDisabled}>
    {props.children}
  </button>
);

button.defaultProps = {
  children: '',
  clicked: () => {},
  type: '',
};

button.propTypes = {
  children: PropTypes.node,
  clicked: PropTypes.func,
  type: PropTypes.string
};

export default button;
