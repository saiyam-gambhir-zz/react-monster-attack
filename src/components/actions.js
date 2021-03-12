import Button from '../components/button';

const actions = (props) => {
  return (
    <div className="Actions">
      <Button actionType="attack" type="danger" clicked={props.onAttackClicked}>Attack</Button>
      <Button actionType="special-attack" type="warning" clicked={props.onSpecialAttackClicked} isDisabled={props.isDisabled}>Special Attack</Button>
      <Button actionType="heal" type="success" clicked={props.onHealClicked}>Heal</Button>
      <Button actionType="give-up" clicked={props.onResetClicked} type="primary">Give Up</Button>
    </div>
  );
};

actions.defaultProps = {
  isDisabled: false,
  onAttackClicked: () => {},
  onHealClicked: () => {},
  onResetClicked: () => {},
  onSpecialAttackClicked: () => {}
};

export default actions;
