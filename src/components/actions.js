import Button from '../components/button';
import PropTypes from 'prop-types';

const actions = (props) => (
  <div className="Actions">
    <Button actionType="attack" clicked={props.onAttackClicked} type="danger">Attack</Button>
    <Button actionType="special-attack" clicked={props.onSpecialAttackClicked} isDisabled={props.isDisabled} type="warning">Special Attack</Button>
    <Button actionType="heal" clicked={props.onHealClicked} type="success">Heal</Button>
    <Button actionType="give-up" clicked={props.onResetClicked} type="primary">Give Up</Button>
  </div>
);

actions.defaultProps = {
  isDisabled: false,
  onAttackClicked: () => {},
  onHealClicked: () => {},
  onResetClicked: () => {},
  onSpecialAttackClicked: () => {}
};

actions.propTypes = {
  isDisabled: PropTypes.bool,
  onAttackClicked: PropTypes.func,
  onHealClicked: PropTypes.func,
  onResetClicked: PropTypes.func,
  onSpecialAttackClicked: PropTypes.func
};

export default actions;
