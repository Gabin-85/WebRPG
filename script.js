// Système de combat fait par Soullard Syméon  --[Syméon]
// Système d'objet fait par Luan  --[Luan]
//Je confirme  --[Gabin]
hp = localStorage.getItem("hp")
if (hp == null) {
    window.location = 'index.html'
} else if (window.location == 'index.html'){
    localStorage.setItem("hp",null)
}

function combat() {
    enemy = localStorage.getItem("enemy")
    enemy = enemy.split(",")
    enemyName = enemy[0]
    enemyHp = enemy[1]
    localStorage.setItem("hp",localStorage.getItem("maxHp"))
    hp = localStorage.getItem("hp")
    div = document.getElementById('combat')     // Ce qui suis est l'html de la page de combat
    div.innerHTML = `

    <div class=pve>
    <strong>[${enemyHp} ♥] ${enemyName}</strong>
        <div class=state><strong>             ${enemyName}</strong><br>
        <p>
                      Vie : ${enemyHp} <br>
                      Force : ${parseInt(enemy[2])}
        </p></div>
    </div>

    <div class=pvm>
    <strong> ${localStorage.getItem("pseudo")} [${hp} ♥] </strong>
        <div class=statm><strong>${localStorage.getItem("pseudo")}             </strong><br><p>
           Vie : ${hp}/${localStorage.getItem("maxHp")} <br>
           Force : ${localStorage.getItem("force")} <br>
           Tech : ${localStorage.getItem("tech")} <br>
           Reflexes : ${localStorage.getItem("reflexes")} 
        </p></div>

    </div>
    <div class="fbut">
    <button id='distance' onclick='action("distance")'>Attaque de distance</button>
    <button id='cac' onclick='action("cac")'>Attaque de corps à corps</button>
    <button id='tech' onclick='action("tech")'>Attaque spéciale</button>
    </div>`
}
function action(action) {
    force = parseInt(localStorage.getItem("force"))
    hp = parseInt(localStorage.getItem("hp"))
    maxHp = parseInt(localStorage.getItem("maxHp"))
    reflexes = parseInt(localStorage.getItem("reflexes"))
    tech = parseInt(localStorage.getItem("tech"))
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
    window.location.href = "/deathscreen.html" // le lien vers la page
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
    window.location = 'Mission Yakuzas/mission.html' // envoie sur le début de la mission yakuzas
}

function createEnemy(name, hp, force) {
    localStorage.setItem("enemy", name + "," + hp + "," + force)
}

// createEnemy("John Cena", 150, 7)
// createEnemy("Yakuza", 50, 1)
// createEnemy("Yakuza supérieur", 80, 1)
// createEnemy("Gardes", 50, 1)
// createEnemy("Gardes renforcer", 9999, -3) :)
// createEnemy("Gorilles", 50, 3)
// createEnemy("Cadres", 60, 3)
// createEnemy("Cyber Psycho", 80, 4)
// createEnemy("Nikolaï", 65, 6)
// createEnemy("Melon Musk", 130, 6)
// createEnemy("Rick Astley", 225, 11)

function getItem(name, type) {
    items = [
        [
            {
                name: "Exemple",
                vie: 0,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 0
            },
            {
                name: "Katana",
                vie: 0,
                force: +5,
                reflexes: 0,
                tech: 0,
                psy: 0
            },
            {
                name: "Lames des lancers",
                vie: 0,
                force: +3,
                reflexes: +1,
                tech: 0,
                psy: 0
            },
            {
                name: "Masse",
                vie: 0,
                force: +7,
                reflexes: -1,
                tech: 0,
                psy: 0
            },
            {
                name: "Pistolet de poing",
                vie: 0,
                force: 3,
                reflexes: 0,
                tech: 3,
                psy: 0
            },
            {
                name: "Fusil d'assault",
                vie: 0,
                force: 0,
                reflexes: 0,
                tech: 5,
                psy: 0
            },
            {
                name: "Fusil à pompes",
                vie: 0,
                force: 1,
                reflexes: 0,
                tech: 7,
                psy: 0
            },
            {
                name: "Mitrailleuse",
                vie: 0,
                force: 0,
                reflexes: 1,
                tech: 4,
                psy: 0
            },
            {
                name: "Sniper",
                vie: 0,
                force: 0,
                reflexes: -2,
                tech: 10,
                psy: 0
            },
            {
                name: "Minigun",
                vie: 0,
                force: 0,
                reflexes: -7,
                tech: 20,
                psy: 0
            },
        ],
        [
            {
                name: "Avant bras renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "avant-bras"
            },
            {
                name: "Avant bras lames",
                vie: 4,
                force: 5,
                reflexes: 0,
                tech: 0,
                psy: 6,
                type: "avant-bras"
            },
            {
                name: "Avant bras canons",
                vie: 4,
                force: 0,
                reflexes: 0,
                tech: 5,
                psy: 6,
                type: "avant-bras"
            },
            {
                name: "ligaments mécanique",
                vie: 1,
                force: 0,
                reflexes: 3,
                tech: 0,
                psy: 3,
                type: "ligament"
            },
            {
                name: "bras renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "bras"
            },
            {
                name: "bras en titane allégé",
                vie: 8,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 8,
                type: "bras"
            },
            {
                name: "bras d'assailant",
                vie: 6,
                force: 5,
                reflexes: 2,
                tech: 3,
                psy: 10,
                type: "bras"
            },
            {
                name: "Triceps modifié",
                vie: 0,
                force: 0,
                reflexes: 3,
                tech: 2,
                psy: 4,
                type: "triceps"
            },
            {
                name: "Triceps bagareur",
                vie: 0,
                force: 4,
                reflexes: 4,
                tech: 0,
                psy: 6,
                type: "triceps"
            },
            {
                name: "épaule de visée",
                vie: 2,
                force: 0,
                reflexes: 1,
                tech: 3,
                psy: 3,
                type: "épaule"
            },
            {
                name: "épaule de pugiste",
                vie: 0,
                force: 5,
                reflexes: 0,
                tech: 0,
                psy: 2,
                type: "épaule"
            },
            {
                name: "Dos renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "Dos"
            },
            {
                name: "Dos à impulsion",
                vie: 7,
                force: 0,
                reflexes: 3,
                tech: 1,
                psy: 5,
                type: "Dos"
            },
            {
                name: "Dos en titane",
                vie: 15,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 10,
                type: "Dos"
            },
            
            {
                name: "Colone de mobilité",
                vie: 0,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 3,
                type: "Colone"
            },
            {
                name: "Colone en titane",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "Colone"
            },
            {
                name: "Colone pyrotechnique",
                vie: 3,
                force: 0,
                reflexes: 0,
                tech: 5,
                psy: 4,
                type: "Colone"
            },
            {
                name: "Os en acier",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "Os"
            },
            {
                name: "Os en titane",
                vie: 10,
                force: 0,
                reflexes: -1,
                tech: 0,
                psy: 5,
                type: "Os"
            },
            {
                name: "Cou renforcé",
                vie: 3,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 1,
                type: "Cou"
            },
            {
                name: "Cou flexible",
                vie: 2,
                force: 0,
                reflexes: 3,
                tech: 0,
                psy: 2,
                type: "Os"
            },
            {
                name: "Poitrail renforcé",
                vie: 10,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 5,
                type: "Poitrine"
            },
            {
                name: "Poitrail canon",
                vie: 8,
                force: 0,
                reflexes: 0,
                tech: 10,
                psy: 8,
                type: "Poitrine"
            },
            {
                name: "Poitrail de vitesse",
                vie: 4,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 4,
                type: "Poitrine"
            },
            {
                name: "Jambe de combat",
                vie: 0,
                force: 5,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "Jambe"
            },
            {
                name: "Jambe de renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "Jambe"
            },
            {
                name: "Jambe de tireur",
                vie: 0,
                force: 0,
                reflexes: 3,
                tech: 5,
                psy: 5,
                type: "Jambe"
            },
            
            {
                name: "Yeux bioniques",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 0,
                psy: 8,
                type: "Yeux"
            },
            
            {
                name: "Yeux  de fauxcon",
                vie: 0,
                force: 0,
                reflexes: 25,
                tech: 0,
                psy: 12,
                type: "Yeux"
            },
            
            
            {
                name: "oreille sonar",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 0,
                psy: 8,
                type: "oreille"
            },
            {
                name: "oreille de grub",
                vie: 0,
                force: 0,
                reflexes: 25,
                tech: 0,
                psy: 12,
                type: "oreille"
            },
            {
                name: "neurone artificiel",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 5,
                psy: 12,
                type: "neurone"
            },
            {
                name: "neurone de reflexion",
                vie: 0,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: -5,
                type: "neurone"
            },
        
            
        ],
        [
            {
                name: "Médoc anti dépression",
                vie: 0,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: -5
            },
            {
                name: "Médoc de fatigue nomade",
                vie: 0,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: -10
            },
            {
                name: "Médoc de qualité militaire",
                vie: 0,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: -30
            },
        ],
        [
            {
                name: "avant bras blue Fire Mark II",
                vie: 7,
                force: 0,
                reflexes: 0,
                tech: 10,
                psy: 8,
                type: "avant-bras"
            },
            {
                name: "colone Sandevistan Mark III",
                vie: 5,
                force: 0,
                reflexes: 20,
                tech: 2,
                psy: 15,
                type: "Colone"
            },
            {
                name: "poitrail de cosmonaut noir V1",
                vie: 10,
                force: 5,
                reflexes: 5,
                tech: 0,
                psy: 9,
                type: "Poitrine"
            },
            {
                name: "neurone de Méga Corporation Antalis V2",
                vie: 0,
                force: 5,
                reflexes: 40,
                tech: 20,
                psy: 40,
                type: "neurone"
            },
            {
                name: "neurone de John Cena artificiel",
                vie: 0,
                force: 0,
                reflexes: 10,
                tech: 5,
                psy: -20,
                type: "neurone"
            },
        ]
    ]
    for (let i = 0; i < items[type].length; i++) {
        if (items[type][i].name == name) {
            return items[type][i]
        }
    }
}