const btn1 = document.querySelector('.btn-primary');
const btn2 = document.querySelector('.btn-secondary');
const btn3 = document.querySelector('.btn-success');
const XPText = document.querySelector('.bg-primary');
const healthText = document.querySelector('.bg-secondary');
const goldText = document.querySelector('.bg-success');
const text = document.querySelector('.text_card');
const opponent = document.querySelector('.displays');
const enemy_name = document.querySelector('.enemy_name');
const enemy_health = document.querySelector('.enemy_health');

let health = 100
let gold = 50
let xp = 0
let currentWeapon = 0
let fighting = 0
let enemyHealth = 0
let inventory = ["stick"]

const enemy = [
    {
        name: 'slime',
        level: 2,
        health: 15
    },
    {
        name: 'fanged beast',
        level: 8,
        health: 60
    },
    {
        name: 'dragon',
        level: 20,
        health: 300
    }
]

const wapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]

const locations = [
    {
        name: 'tow square',
        "btn-name": ["go to store", "go to cave", "fight dragon"],
        "btn-function": [store, cave, fightDragon],
        text: "you are in the town and there is store:"
    },
    {
        name: 'store',
        "btn-name": ["buy health", "buy weapon", "go to town square"],
        "btn-function": [buyHealth, buyWeapon, backTown],
        text: "you enter the store:"
    },
    {
        name: 'cave',
        "btn-name": ["fight slime", "fight hammer", "go to town square"],
        "btn-function": [fightSlime, fightHammer, backTown],
        text: "you enter the cave and see some monsters:"
    },
    {
        name: 'fight',
        "btn-name": ["fight", "dodge", "run"],
        "btn-function": [fight, doudge, backTown],
        text: "choose:"
    },
    {
        name: 'kill monster',
        "btn-name": ["go town", "go town", "go east"],
        "btn-function": [backTown, backTown, goEast],
        text: "you killed yhe monster and it say arg."
    },
    {
        name: 'you lose',
        "btn-name": ["go town", "go town", "go town"],
        "btn-function": [backTown, backTown, backTown],
        text: "you lose."
    },
    {
        name: 'you win',
        "btn-name": ["restart?", "restart?", "restart?"],
        "btn-function": [restart, restart, restart],
        text: "you win the game."
    },
    {
        name: 'hey come',
        "btn-name": ["2", "8", "go home"],
        "btn-function": [pickTwo, pickEight, backTown],
        text: "pick the number."
    },
    {
        name: 'all lose',
        "btn-name": ["restart?"],
        "btn-function": [restart],
        text: "you lose the whole game."
    }
];

btn1.onclick = store;
btn2.onclick = cave;
btn3.onclick = fightDragon;


function update(location) {
    opponent.style.display = 'none'
    btn1.innerHTML = location["btn-name"][0];
    btn2.innerHTML = location["btn-name"][1];
    btn3.innerHTML = location["btn-name"][2];
    btn1.onclick = location["btn-function"][0];
    btn2.onclick = location["btn-function"][1];
    btn3.onclick = location["btn-function"][2];
    text.innerHTML = location.text;
}


function update1(location) {
    opponent.style.display = 'none'
    btn1.innerHTML = location["btn-name"][0];
    btn1.onclick = location["btn-function"][0];
    text.innerHTML = location.text;
}

function store() {
    update(locations[1]);
}

function cave() {
    update(locations[2]);
}

function Another(){
    console.log("hello")
}

function goEast(){
    update(locations[7])
}

function buyHealth() {
    if(gold >= 10){
        health += 10;
        gold -= 10
        goldText.textContent = gold
        healthText.textContent = health
        text.textContent = `you get more 10 healyh new wapon`
    }
    else{
        text.textContent = "you can't sold any health anymore because of not enough gold"
    }
}

function buyWeapon() {
  if (currentWeapon < wapons.length) {
    if (gold > 30) {
      gold -= 30;
      currentWeapon++;
      goldText.textContent = gold;
      let newWeapon = wapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.textContent = `you get ${newWeapon} new wapon`;
      text.textContent += `you have ${inventory} new wapon`;
    } else {
      text.textContent = `you can't sold any wapons anymore because of not enough gold`;
    }
  }else{
    btn2.innerHTML = 'sell wapon'
    btn2.onclick = sellWapon
    text.textContent=`You already have the most powerfull weapons`
  }
}

function sellWapon(){
    if(inventory.length > 1){
        inventory.shift()
        gold += 15
        goldText.textContent = gold
        text.textContent=`You sold for 15 gold`
    }
}

function backTown() {
    update(locations[0]);
}

function fightDragon() {
    fighting = 2
    goFight();
}

function fightHammer(){
    fighting = 1
    goFight();
}

function fightSlime(){
    fighting = 0
    goFight();
}

function goFight(){
    enemyHealth = enemy[fighting].health
    enemy_health.textContent = enemyHealth
    enemy_name.textContent = enemy[fighting].name
    update(locations[3])
    opponent.style.display = 'flex'
}

function fight(){
    text.textContent = `you fight the ${enemy[fighting].name} with ${wapons[currentWeapon].name} wapons man`
    if (isMiss()) {
    health -= getMonsterAttackValue(enemy[fighting].level)
    } else {
        text.textContent = 'you miss'
    }
    enemyHealth -= wapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
    healthText.textContent = health
    enemy_health.textContent = enemyHealth
    if(health <= 0 && gold <= 0){
        allLoose()
    }else if(health <= 0){
        loose()
    }
    else if(enemyHealth < 0){
        fighting === 2 ? wingame() : win();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.textContent = `${inventory.pop()} is brocken`
        currentWeapon--
    }
}

function isMiss(){
    return Math.random() > .2
}

function getMonsterAttackValue(level){
    return (level) - Math.floor(Math.random() * xp);
}

function loose(){
    update(locations[5])
    health = 0
    healthText.textContent = health
}

function allLoose(){
    update1(locations[8])
    health = 0
    healthText.textContent = health
}

function win(){
    gold += Math.floor(enemy[fighting].level * 6.7);
    xp = enemy[fighting].level
    XPText.innerHTML = xp
    goldText.innerHTML = gold
    update(locations[4])
}

function doudge(){
    text.textContent = `you dodge from ${enemy[fighting].name} with ${wapons[currentWeapon].name} wapons man`
}

function wingame(){
    update(locations[6])
}

function restart(){
    health = 100
    gold = 50
    xp = 0
    currentWeapon = 0
    inventory = ["stick"]
    healthText.textContent = health
    goldText.textContent = gold
    XPText.textContent = xp
    update(locations[0])
}

function pickTwo(){
    pick(2)
}

function pickEight(){
    pick(8)
}

function pick(no){
    let numbers = []
    while (numbers.length <= 10) {
        numbers.push(Math.floor(Math.random() * 11))
    }

    text.textContent = `you picked ${no} here are the noms`

    for(i = 0; i < 10; i++){
        text.textContent += `${numbers[i]}    \n`
    }

    if(numbers.indexOf(no) !== -1){
        text.textContent = +"you found the number congrats"
        gold += 20
        goldText.textContent = gold
    }else{
        text.textContent += "you miss the number"
        health -= 10
        healthText.textContent = health
        if (health <= 0) {
            loose()
        }
    }
}

