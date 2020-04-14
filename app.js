let vm = new Vue({
  el: '#app',
  data() {
    return {
      gameOver: true,
      youHealth: 100,
      monsterHealth: 100,
      specialAttackCooldown: 0,
      healCooldown: 0,
      attackTypes: ['🗡', '🔥', '🧪'],
      battleInfo: [],
    };
  },
  methods: {
    health: function (playerHealth) {
      return {
        width: `${playerHealth}%`,
      };
    },
    attack: function (attackType) {
      let attacker, defender, damage, heal;
      attacker = 'You';
      defender = 'Monster';
      if (this.specialAttackCooldown > 0) {
        this.specialAttackCooldown -= 1;
      }
      if (this.healCooldown > 0) {
        this.healCooldown -= 1;
      }
      if (attackType === '🧪') {
        this.healCooldown = 3;
        heal = Math.ceil(Math.random() * 10);
        this.youHealth += heal;
        damage = 0;
      } else if (attackType === '🔥') {
        this.specialAttackCooldown = 3;
        damage = Math.ceil(Math.random() * 5) + 8;
        this.monsterHealth -= damage;
        heal = 0;
      } else {
        damage = Math.ceil(Math.random() * 10);
        this.monsterHealth -= damage;
        heal = 0;
      }
      this.battleInfo.push({
        attacker: attacker,
        defender: defender,
        attackType: attackType,
        damage: damage,
        heal: heal,
      });
      attacker = 'Monster';
      defender = 'You';
      attackType = '🗡';
      damage = Math.ceil(Math.random() * 10);
      this.youHealth -= damage;
      this.battleInfo.push({
        attacker: attacker,
        defender: defender,
        attackType: attackType,
        damage: damage,
        heal: heal,
      });
    },
    surrender: function () {
      alert('You surrender! New Game?');
      this.gameOver = true;
    },
  },
  watch: {
    battleInfo: function () {
      console.log(this.specialAttackCooldown, this.healCooldown);
      if (this.youHealth < 0) {
        gameOver = true;
      } else if (this.monsterHealth < 0) {
        gameOver = true;
      }
    },
    gameOver: function () {
      this.youHealth = 100;
      this.monsterHealth = 100;
      this.specialAttackCooldown = 0;
      this.healCooldown = 0;
      this.battleInfo = [];
    },
    youHealth: function () {
      if (!this.gameOver && this.youHealth < 0) {
        alert('You lose! New game?');
        this.gameOver = true;
      }
    },
    monsterHealth: function () {
      if (!this.gameOver && this.monsterHealth < 0) {
        alert('You win! New game?');
        this.gameOver = true;
      }
    },
  },
});

console.log(vm);
