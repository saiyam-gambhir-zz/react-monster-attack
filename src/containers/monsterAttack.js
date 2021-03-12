import * as helpers from '../helpers';
import Actions from '../components/actions';
import Move from '../components/move';
import Player from '../components/player';
import { Component } from "react";

class MonsterAttack extends Component {

  createPlayer = ({maxHealth = 100, maxAttackDamage, maxHeal = 10, minAttackDamage = 1, specialAttackMaxDamage = 20, specialAttackMinDamage = 10, type}) => {
    return {
      maxAttackDamage,
      maxHeal,
      maxHealth,
      minAttackDamage,
      specialAttackMaxDamage,
      specialAttackMinDamage,
      type
    }
  };

  state = {
    isSpecialAttackAvailable: false,
    players: {
      normal: {...this.createPlayer({maxAttackDamage: 10, type: 'normal'})},
      monster: {...this.createPlayer({maxAttackDamage: 20, maxHeal: 0, type: 'monster'})}
    },
    moves: []
  };

  attackDamageGenerator = (players, type) => {
    let playerAttackDamage = 0, monsterAttackDamage = 0;

    switch (type) {
      case 'special':
        playerAttackDamage = helpers.genarateRandomNumber(players['normal'].specialAttackMinDamage, players['normal'].specialAttackMaxDamage);
        break;
      case 'normal':
        playerAttackDamage = helpers.genarateRandomNumber(players['normal'].minAttackDamage, players['normal'].maxAttackDamage);
        break;
      default:
        break;
    }

    monsterAttackDamage = helpers.genarateRandomNumber(players['monster'].minAttackDamage, players['monster'].maxAttackDamage);

    return {
      playerAttackDamage,
      monsterAttackDamage
    };
  };

  movesGenerator = (type, monsterAttackDamage, playerAttackDamage) => {
    let monsterMove = '', playerMove = '';

    switch (type) {
      case 'attack':
        monsterMove = `Monster hits player for ${monsterAttackDamage}`;
        playerMove = `Player hits monster for ${playerAttackDamage}`;
        break;

      case 'special-attack':
        monsterMove = `Monster hits player for ${monsterAttackDamage}`;
        playerMove = `Player hits monster for ${playerAttackDamage} with special attack`;
        break;

      case 'heal':
        monsterMove = `Monster hits player for ${monsterAttackDamage}`;
        playerMove = `Player heals for 10`;
        break;

      default:
        break;
    }

    return {
      monsterMove,
      playerMove
    }
  };

  initAttack = (updatedPlayers, monsterAttackDamage, playerAttackDamage) => {
    updatedPlayers['normal'].maxHealth -= monsterAttackDamage;
    updatedPlayers['monster'].maxHealth -= playerAttackDamage;
  };

  initHeal = (updatedPlayers, monsterAttackDamage) => {
    updatedPlayers['normal'].maxHealth += updatedPlayers['normal'].maxHeal;
    updatedPlayers['normal'].maxHealth -= monsterAttackDamage;
  }

  updateMoves = (attackType, monsterAttackDamage, playerAttackDamage) => {
    let moves = this.movesGenerator(attackType, monsterAttackDamage, playerAttackDamage);
    let updatedMoves = this.state.moves;
    updatedMoves = [...updatedMoves, moves];
    this.setState({moves: updatedMoves});
  };

  attackHandler = () => {
    let updatedPlayers = {...this.state.players};
    let attackDamage = this.attackDamageGenerator(updatedPlayers, 'normal');
    const { monsterAttackDamage, playerAttackDamage } = attackDamage;
    this.initAttack(updatedPlayers, monsterAttackDamage, playerAttackDamage);
    this.updateMoves('attack', monsterAttackDamage, playerAttackDamage);
    this.setState({players: updatedPlayers});
  };

  specialAttackHandler = () => {
    let updatedPlayers = {...this.state.players};
    let attackDamage = this.attackDamageGenerator(updatedPlayers, 'special');
    const { monsterAttackDamage, playerAttackDamage } = attackDamage;
    this.initAttack(updatedPlayers, monsterAttackDamage, playerAttackDamage);
    this.updateMoves('special-attack', monsterAttackDamage, playerAttackDamage);
    this.setState({players: updatedPlayers});
  };

  playerHealHandler = () => {
    let updatedPlayers = {...this.state.players};
    let attackDamage = this.attackDamageGenerator(updatedPlayers, 'normal');
    const { monsterAttackDamage } = attackDamage;
    this.initHeal(updatedPlayers, monsterAttackDamage);
    this.updateMoves('heal', monsterAttackDamage, null);
    this.setState({players: updatedPlayers});
  };

  resetGameHandler = () => {
    let updatedPlayers = {...this.state.players};
    updatedPlayers['normal'].maxHealth = 100;
    updatedPlayers['monster'].maxHealth = 100;
    this.setState({players: updatedPlayers, moves:[]});
  };

  renderPlayers = () => {
    return Object.keys(this.state.players).map(key =>
      <Player key={key} {...this.state.players[key]} />
    );
  };

  renderMoves = () => {
    return this.state.moves.map((move, index) => (
      <Move move={move} key={index} />
      )
    );
  };

  render () {
    return (
      <>
        <section className="Left">
          <div className="Players">
            {this.renderPlayers()}
          </div>
          <div className="ActionsContainer">
            <Actions
              onAttackClicked={this.attackHandler}
              onSpecialAttackClicked={this.specialAttackHandler}
              onHealClicked={this.playerHealHandler}
              onResetClicked={this.resetGameHandler}
              isDisabled={this.state.isSpecialAttackAvailable} />
          </div>
        </section>
        <section className="Right">
          {this.renderMoves()}
        </section>
      </>
    )
  };
};

export default MonsterAttack;
