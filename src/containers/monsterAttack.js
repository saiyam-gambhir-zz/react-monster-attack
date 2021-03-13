import * as helpers from '../helpers';
import Actions from '../components/actions';
import Move from '../components/move';
import Player from '../components/player';
import { Component } from "react";
import { motion } from "framer-motion";

class MonsterAttack extends Component {

  createPlayer = ({maxHealth, maxAttackDamage, maxHeal = 10, minAttackDamage = 1, specialAttackMaxDamage = 20, specialAttackMinDamage = 10, type}) => {
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
    isGameStarted: false,
    isSpecialAttackAvailable: true,
    moves: [],
    players: {
      normal: {maxHealth: 0},
      monster: {maxHealth: 0}
    }
  };

  startGameHandle = () => {
    let players = {
      normal: {...this.createPlayer({maxAttackDamage: 10, maxHealth: 100, type: 'normal'})},
      monster: {...this.createPlayer({maxAttackDamage: 20, maxHealth: 100, maxHeal: 0, type: 'monster'})}
    };

    this.setState({ players, isGameStarted: true });
  };

  attackDamageGenerator = (players, type) => {
    let playerAttackDamage = 0, monsterAttackDamage = 0;
    const { normal, monster } = players;

    switch (type) {
      case 'special':
        playerAttackDamage = helpers.genarateRandomNumber(normal.specialAttackMinDamage, normal.specialAttackMaxDamage);
        break;
      case 'normal':
        playerAttackDamage = helpers.genarateRandomNumber(normal.minAttackDamage, normal.maxAttackDamage);
        break;
      default:
        break;
    }

    monsterAttackDamage = helpers.genarateRandomNumber(monster.minAttackDamage, monster.maxAttackDamage);

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

  isSpecialAttackAvailable = (updatePlayer) => {
    return updatePlayer.maxHealth > 90;
  };

  attack = (updatedPlayers, monsterAttackDamage, playerAttackDamage) => {
    const { normal, monster } = updatedPlayers;
    normal.maxHealth -= monsterAttackDamage;
    monster.maxHealth -= playerAttackDamage;
    this.setState({ isSpecialAttackAvailable: this.isSpecialAttackAvailable(normal)});
  };

  heal = (updatedPlayers, monsterAttackDamage) => {
    const { normal } = updatedPlayers;
    normal.maxHealth += normal.maxHeal;
    normal.maxHealth -= monsterAttackDamage;
    if(normal.maxHealth > 100) normal.maxHealth = 100;
    this.setState({ isSpecialAttackAvailable: this.isSpecialAttackAvailable(normal)});
  };

  updateMoves = (attackType, monsterAttackDamage, playerAttackDamage) => {
    let moves = this.movesGenerator(attackType, monsterAttackDamage, playerAttackDamage);
    let updatedMoves = this.state.moves;
    updatedMoves = [...updatedMoves, moves];
    this.setState({moves: updatedMoves});
  };

  declareWinner = () => {
    const { normal, monster } = this.state.players;
    if(normal.maxHealth <= 0) {
      alert('Monster won the battle!');
      this.resetHandler();
    } else if(monster.maxHealth <= 0) {
      alert('Player won the battle!');
      this.resetHandler();
    } else if(normal.maxHealth <= 0 && monster.maxHealth <= 0) {
      alert('OMG, Battle tied!');
      this.resetHandler();
    }
  };

  initAttack = (attackType, movesType) => {
    let updatedPlayers = {...this.state.players};
    let attackDamage = this.attackDamageGenerator(updatedPlayers, attackType);
    const { monsterAttackDamage, playerAttackDamage } = attackDamage;
    this.attack(updatedPlayers, monsterAttackDamage, playerAttackDamage);
    this.updateMoves(movesType, monsterAttackDamage, playerAttackDamage);
    this.setState({players: updatedPlayers});
    this.declareWinner();
  };

  attackHandler = () => {
    this.initAttack('normal', 'attack');
  };

  specialAttackHandler = () => {
    this.initAttack('special', 'special-attack');
  };

  playerHealHandler = () => {
    let updatedPlayers = {...this.state.players};
    if(updatedPlayers.normal.maxHealth > 100) return;
    let attackDamage = this.attackDamageGenerator(updatedPlayers, 'normal');
    const { monsterAttackDamage } = attackDamage;
    this.heal(updatedPlayers, monsterAttackDamage);
    this.updateMoves('heal', monsterAttackDamage, null);
    this.setState({players: updatedPlayers});
    this.declareWinner();
  };

  resetHandler = () => {
    let updatedPlayers = {...this.state.players};
    const { normal, monster } = updatedPlayers;
    normal.maxHealth = 100;
    monster.maxHealth = 100;
    this.setState({ isGameStarted: false, isSpecialAttackAvailable: true, moves:[], players: updatedPlayers});
  };

  renderPlayers = () => {
    if(this.state.isGameStarted) {
      return Object.keys(this.state.players).map(key =>
        <Player key={key} {...this.state.players[key]} />
      );
    }
  };

  renderMoves = () => {
    if(this.state.isGameStarted) {
      return this.state.moves.map((move, index) => <Move move={move} key={index} />);
    }
  };

  render () {
    return this.state.isGameStarted ?
      <motion.div className="Main" initial={{x: '100%'}} animate={{x: 0}} transition={{duration: .5}}>
        <section className="LeftSection">
          <div className="Players">
            {this.renderPlayers()}
          </div>
          <div className="ActionsContainer">
            <Actions
              isDisabled={!this.state.isSpecialAttackAvailable}
              onAttackClicked={this.attackHandler}
              onHealClicked={this.playerHealHandler}
              onResetClicked={this.resetHandler}
              onSpecialAttackClicked={this.specialAttackHandler} />
          </div>
        </section>
        <section className="RightSection">
          {this.renderMoves()}
        </section>
      </motion.div> : <motion.button initial={{x: '100%'}} animate={{x: 0}} transition={{duration: .25}} className="Button start" onClick={this.startGameHandle}>Start</motion.button>;
  };
};

export default MonsterAttack;
