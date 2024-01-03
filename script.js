// Entièrement fait par Soullard Syméon
//Exactement, je confirme - Gabin
function combat() {
    enemy = localStorage.getItem("enemy")
    enemy = enemy.split(",")
    enemyName = enemy[0]
    enemyHp = enemy[1]
    hp = localStorage.getItem("hp")
    div = document.getElementById('combat')
    div.innerHTML = `<p>${enemyName} : ${enemyHp} hp.  Vous : ${hp} hp.</p><button id='cac' onclick='action("cac")'>attaque de corps à corps</button><button id='distance' onclick='action("distance")'>attaque de distance</button><button id='tech' onclick='action("tech")'>attaque spéciale</button>`
}
function action(action) {
    force = parseInt(localStorage.getItem("force"))
    hp = parseInt(localStorage.getItem("hp"))
    maxHp = parseInt(localStorage.getItem("maxHp"))
    reflexes = parseInt(localStorage.getItem("reflexes"))
    enemy = localStorage.getItem("enemy")
    enemy = enemy.split(",")
    enemyName = enemy[0]
    enemyHp = parseInt(enemy[1])
    enemyForce = parseInt(enemy[2])
    if (action == "cac") {
        enemyHp = enemyHp - force
        localStorage.setItem("enemy", enemyName + "," + enemyHp + "," + enemyForce)
        localStorage.setItem("dodgeRate", Math.round(Math.random() * 100)+reflexes)
    }
    if (action == "distance") {
        damage = Math.round(tech / 2 + force / 5)
        enemyHp = enemyHp - damage
        localStorage.setItem("enemy", enemyName + "," + enemyHp + "," + enemyForce)
        localStorage.setItem("dodgeRate", Math.round(Math.random() * 100)+25+reflexes)
    }
    if (action == "tech") {
        enemyHp = enemyHp - tech
        localStorage.setItem("enemy", enemyName + "," + enemyHp + "," + enemyForce)
        localStorage.setItem("dodgeRate", Math.round(Math.random() * 100)+reflexes)
    }
    if (enemyHp <= 0) {
        hp = maxHp
        document.getElementById("combat").style.display = "none"
        document.getElementById("victory").style.display = "block"
        return
    } else {
        enemyAttack()
    }    
}
function enemyAttack() {
    // implement the dodgeRate
    enemy = localStorage.getItem("enemy")
    dodgeRate = localStorage.getItem("dodgeRate")
    enemy = enemy.split(",")
    enemyName = enemy[0]
    enemyForce = enemy[2]
    hp = localStorage.getItem("hp")
    if (parseInt(dodgeRate) < 50) {
        hp = hp - enemyForce
        localStorage.setItem("hp", hp)
    }
    localStorage.setItem("hp", hp)
    if (hp <= 0) {
        death("Vous vous êtes fait tuer par " + enemyName)
    } else {
        combat()
    }
}
function checkPsychose() {
    psy = localStorage.getItem("psy")
    if (psy >= 100) {
        death("Vous mourrez de folie cyber-psychotique")
    }
}

function death(deathMessage) {
    localStorage.setItem("deathMessage", deathMessage)
    window.location.href = "deathscreen.html" // le lien vers la page
}

function init() {
    pseudo = document.getElementById("input_pseudo").value
    localStorage.setItem("pseudo", pseudo)
    localStorage.setItem("force", "5")
    localStorage.setItem("hp", "5")
    localStorage.setItem("maxHp", "5")
    localStorage.setItem("reflexes", "5")
    localStorage.setItem("tech", "5")
    localStorage.setItem("psy", "5")
    localStorage.setItem("deathMessage", "")
    window.location = 'Start/mission.html'
}

function createEnemy(name, hp, force) {
    localStorage.setItem("enemy", name + "," + hp + "," + force)
}

createEnemy("John Cena", 150, 7)
createEnemy("Yakuza", 50, 1)
createEnemy("Gardes", 50, 1)
createEnemy("Gorilles", 50, 3)
createEnemy("Cadres", 60, 3)
createEnemy("Cyber Psycho", 80, 4)
createEnemy("Nikolaï", 65, 6)
createEnemy("Melon Musk", 130, 6)
createEnemy("Rick Astley", 225, 11)