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
           Reflexes : ${localStorage.getItem("reflexes")} <br>
           Psy : ${100-localStorage.getItem("psy")}/100
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
        localStorage.setItem("dodgeRate", (80-reflexes)/80)
        if (localStorage.getItem("dodgeRate") < 0) {
            localStorage.setItem("dodgeRate",0)
        }
    }
    if (action == "distance") {
        damage = Math.round(tech / 2 + force / 5)
        enemyHp = enemyHp - damage
        localStorage.setItem("enemy", enemyName + "," + enemyHp + "," + enemyForce)
        localStorage.setItem("dodgeRate", (50-reflexes)/50)
        if (localStorage.getItem("dodgeRate") < 0) {
            localStorage.setItem("dodgeRate",0)
        }
    }
    if (action == "tech") {
        enemyHp = enemyHp - tech
        localStorage.setItem("enemy", enemyName + "," + enemyHp + "," + enemyForce)
        localStorage.setItem("dodgeRate", (80-reflexes)/80)
        if (localStorage.getItem("dodgeRate") < 0) {
            localStorage.setItem("dodgeRate",0)
        }
    }
    if (enemyHp <= 0) {
        checkPsychose()
        document.getElementById("combat").style.display = "none"
        document.getElementById("victory").style.display = "block"
        if (Math.floor(Math.random() * 3) + 1 == 1) {
           lootItem(0) 
        } else {
            lootItem(1)
        }
        if (Math.floor(Math.random() * 2) == 0) {
            lootItem(1)
            }
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
    hp = Math.floor(hp - enemyForce*dodgeRate)
    localStorage.setItem("hp", hp)
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
    window.location = "../deathscreen.html" // le lien vers la page
}

function init() {
    pseudo = document.getElementById("input_pseudo").value
    localStorage.clear()
    localStorage.setItem("arme","Poing")
    localStorage.setItem("pseudo", pseudo)
    localStorage.setItem("force", "5")
    localStorage.setItem("hp", "5")
    localStorage.setItem("maxHp", "5")
    localStorage.setItem("reflexes", "5")
    localStorage.setItem("tech", "5")
    localStorage.setItem("psy", "5")
    localStorage.setItem("deathMessage", "")
    localStorage.setItem("vol","false")
    localStorage.setItem("yakuza","false")
    localStorage.setItem("mc","false")
    localStorage.setItem("space","false")
    window.location = 'Mission Yakuzas/mission.html' // envoie sur le début de la mission yakuzas
}

function createEnemy(name, hp, force) {
    localStorage.setItem("enemy", name + "," + hp + "," + force)
    localStorage.setItem("hp",localStorage.getItem("maxHp"))
}
function hub(opt) {
    if (opt == "space") {
        localStorage.setItem("space","true")
    } else if (opt == "yakuza") {
        localStorage.setItem("yakuza","true")
    } else if (opt == "show") {
        locat1 = document.getElementById('locat1')
        if (localStorage.getItem("space") == "true") {
            locat1.innerHTML = `<img src="./Images and scripts/Base_spatial_fire.png" alt="Base spatial">`
        } else {
            locat1.innerHTML = `<a href="Mission Base Spatiale/mission.html"><img src="./Images and scripts/Base_spatial.png" alt="Base spatial"></a><h3>Aller à la base spatial</h3>`
        }
        locat2 = document.getElementById('locat2')
        if (localStorage.getItem("yakuza") == "true") {
            locat2.innerHTML = `<img src="./Images and scripts/kill.png" alt="Base de yakuzas">`
        } else {
            locat2.innerHTML = `<a href="Mission Yakuzas2/mission.html"><img src="./Images and scripts/Yakuzas.png" alt="Base de yakuzas"></a><h3>Aller à la base des yakuzas</h3>`
        }
        locat3 = document.getElementById("locat3")
        if (localStorage.getItem("yakuza") == "true" || localStorage.getItem("space") == "true"){
            locat3.innerHTML = `<a href="Mission Labo MC/mission.html"><img src="./Images and scripts/labo.png" alt="Laboratoire d'Antalis"></a><h3>Aller au laboratoire</h3>`
        }
    }
}
function hubTeam(opt) {
    if (opt == "mc") {
        localStorage.setItem("mc","true")
    } else if (opt == "vol") {
        localStorage.setItem("vol","true")
    } else if (opt == "show") {
        locat1 = document.getElementById('locat1')
        if (localStorage.getItem("vol") == "true") {
            locat1.innerHTML = `<img src="./Images and scripts/voler.png" alt="Vol de voiture">`
        } else {
            locat1.innerHTML = `<a href="Mission vol de voiture/mission.html"><img src="./Images and scripts/vol.png" alt="Vol de voiture"></a><h3>Vol de voiture</h3>`
        }
        locat2 = document.getElementById('locat2')
        if (localStorage.getItem("mc") == "true") {
            locat2.innerHTML = `<img src="./Images and scripts/Antalis_boom.png" alt="Megacorporation">`
        } else {
            locat2.innerHTML = `<a href="Mission Mégacorporation avec la team/mission.html"><img src="./Images and scripts/Antalis.png" alt="Megacorporation"></a><h3>Aller à la mégacorporation</h3>`
        }
        locat3 = document.getElementById("locat3")
        if (localStorage.getItem("vol") == "true"|| localStorage.getItem("mc") == "true"){
            locat3.innerHTML = `<a href="Mission cyber psycho/prémission.html"><img src="./Images and scripts/party.png" alt="Faire la fête"></a><h3>Aller à la fête</h3>`
        }
    }
}

function lootItem(type, name) {
    /**
     * Loot un objet
     * @param  {Int16Array} type  0 pour armes, 1 pour implants, 2 pour médicaments, 3 pour objets spéciaux
     * @param  {string} name  Nom de l'objet
     * @return {boolean} si l'objet est équipé ou non
     */
    if (name) {
        let item = getItem(type, name)
        let implant_type = item.type
        if (localStorage.getItem(implant_type)) {
            if (confirm("Voulez vous remplacer [" + localStorage.getItem(implant_type) + "] par l'implant [" + name + "]")) {
                let item_to_replace = getItem(localStorage.getItem(implant_type), type)
                localStorage.setItem(implant_type, name)
                maxHp = parseInt(localStorage.getItem("maxHp"))
                localStorage.setItem("maxHp", maxHp - item_to_replace.vie + item.vie)
                force = parseInt(localStorage.getItem("force"))
                localStorage.setItem("force", force - item_to_replace.force + item.force)
                reflexes = parseInt(localStorage.getItem("reflexes"))
                localStorage.setItem("reflexes", reflexes - item_to_replace.reflexes + item.reflexes)
                tech = parseInt(localStorage.getItem("tech"))
                localStorage.setItem("tech", tech - item_to_replace.tech + item.tech)
                psy = parseInt(localStorage.getItem("psy"))
                localStorage.setItem("psy", psy - item_to_replace.psy + item.psy)
                return true
            } else {
                alert("opération annulée.")
                return false
            }
        } else {
            alert("Vous avez trouvé [" + name + "]")
            localStorage.setItem(implant_type, name)
            maxHp = parseInt(localStorage.getItem("maxHp"))
            localStorage.setItem("maxHp", maxHp + item.vie)
            force = parseInt(localStorage.getItem("force"))
            localStorage.setItem("force", force + item.force)
            reflexes = parseInt(localStorage.getItem("reflexes"))
            localStorage.setItem("reflexes", reflexes + item.reflexes)
            tech = parseInt(localStorage.getItem("tech"))
            localStorage.setItem("tech", tech + item.tech)
            psy = parseInt(localStorage.getItem("psy"))
            localStorage.setItem("psy", psy + item.psy)
            return true
        }
    } else {
        let item = getItem(type)
        if (type == 0) {
            let item_to_replace = getItem(0, localStorage.getItem("arme"))
            if (item_to_replace) {
                if (confirm("Voulez vous remplacer votre [" + item_to_replace.name + "] par l'arme [" + item.name + "]")) {
                    localStorage.setItem("arme", item.name)
                    maxHp = parseInt(localStorage.getItem("maxHp"))
                    localStorage.setItem("maxHp", maxHp - item_to_replace.vie + item.vie)
                    force = parseInt(localStorage.getItem("force"))
                    localStorage.setItem("force", force - item_to_replace.force + item.force)
                    reflexes = parseInt(localStorage.getItem("reflexes"))
                    localStorage.setItem("reflexes", reflexes - item_to_replace.reflexes + item.reflexes)
                    tech = parseInt(localStorage.getItem("tech"))
                    localStorage.setItem("tech", tech - item_to_replace.tech + item.tech)
                    psy = parseInt(localStorage.getItem("psy"))
                    localStorage.setItem("psy", psy - item_to_replace.psy + item.psy)
                    return true
                } else {
                    alert("opération annulée.")
                    return false
                }
            } else {
                alert("Vous avez trouvé [" + item.name + "]")
                localStorage.setItem("arme", item.name)
                maxHp = parseInt(localStorage.getItem("maxHp"))
                localStorage.setItem("maxHp", maxHp + item.vie)
                force = parseInt(localStorage.getItem("force"))
                localStorage.setItem("force", force + item.force)
                reflexes = parseInt(localStorage.getItem("reflexes"))
                localStorage.setItem("reflexes", reflexes + item.reflexes)
                tech = parseInt(localStorage.getItem("tech"))
                localStorage.setItem("tech", tech + item.tech)
                psy = parseInt(localStorage.getItem("psy"))
                localStorage.setItem("psy", psy + item.psy)
                return true
            }
        } else if (type == 1) {
            let implant_type = item.type
            if (localStorage.getItem(implant_type)) {
                if (confirm("Voulez vous remplacer [" + localStorage.getItem(implant_type) + "] par l'implant [" + item.name + "]")) {
                    let item_to_replace = getItem(localStorage.getItem(implant_type), type)
                    localStorage.setItem(implant_type, item.name)
                    maxHp = parseInt(localStorage.getItem("maxHp"))
                    localStorage.setItem("maxHp", maxHp - item_to_replace.vie + item.vie)
                    force = parseInt(localStorage.getItem("force"))
                    localStorage.setItem("force", force - item_to_replace.force + item.force)
                    reflexes = parseInt(localStorage.getItem("reflexes"))
                    localStorage.setItem("reflexes", reflexes - item_to_replace.reflexes + item.reflexes)
                    tech = parseInt(localStorage.getItem("tech"))
                    localStorage.setItem("tech", tech - item_to_replace.tech + item.tech)
                    psy = parseInt(localStorage.getItem("psy"))
                    localStorage.setItem("psy", psy - item_to_replace.psy + item.psy)
                    return true
                } else {
                    alert("opération annulée.")
                    return false
                }
            } else {
                alert("Vous avez trouvé [" + item.name + "]")
                localStorage.setItem(implant_type, item.name)
                maxHp = parseInt(localStorage.getItem("maxHp"))
                localStorage.setItem("maxHp", maxHp + item.vie)
                force = parseInt(localStorage.getItem("force"))
                localStorage.setItem("force", force + item.force)
                reflexes = parseInt(localStorage.getItem("reflexes"))
                localStorage.setItem("reflexes", reflexes + item.reflexes)
                tech = parseInt(localStorage.getItem("tech"))
                localStorage.setItem("tech", tech + item.tech)
                psy = parseInt(localStorage.getItem("psy"))
                localStorage.setItem("psy", psy + item.psy)
                return true
            }
        } else if (type == 2) {
            alert("Médicament consommé !")
            vie = maxHp
            localStorage.setItem("psy", psy + item.psy)
            return true
        }
    }
}
function getItem(type, name) {
    items = [
        [
            {
                name: "Poing",
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
                name: "Lames de lancée",
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
                name: "Avant-bras renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "avant-bras"
            },
            {
                name: "Avant-bras lames",
                vie: 4,
                force: 5,
                reflexes: 0,
                tech: 0,
                psy: 6,
                type: "avant-bras"
            },
            {
                name: "Avant-bras canons",
                vie: 4,
                force: 0,
                reflexes: 0,
                tech: 5,
                psy: 6,
                type: "avant-bras"
            },
            {
                name: "Ligaments mécaniques",
                vie: 1,
                force: 0,
                reflexes: 3,
                tech: 0,
                psy: 3,
                type: "ligament"
            },
            {
                name: "Bras renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "bras"
            },
            {
                name: "Bras en titane allégé",
                vie: 8,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 8,
                type: "bras"
            },
            {
                name: "Bras d'assailant",
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
                name: "Épaule de visée",
                vie: 2,
                force: 0,
                reflexes: 1,
                tech: 3,
                psy: 3,
                type: "épaule"
            },
            {
                name: "Épaule de purgiste",
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
                type: "dos"
            },
            {
                name: "Dos à impulsion",
                vie: 7,
                force: 0,
                reflexes: 3,
                tech: 1,
                psy: 5,
                type: "dos"
            },
            {
                name: "Dos en titane",
                vie: 15,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 10,
                type: "dos"
            },
            {
                name: "Colone de mobilité",
                vie: 0,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 3,
                type: "colone"
            },
            {
                name: "Colone en titane",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "colone"
            },
            {
                name: "Colone pyrotechnique",
                vie: 3,
                force: 0,
                reflexes: 0,
                tech: 5,
                psy: 4,
                type: "colone"
            },
            {
                name: "Os en acier",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "os"
            },
            {
                name: "Os en titane",
                vie: 10,
                force: 0,
                reflexes: -1,
                tech: 0,
                psy: 5,
                type: "os"
            },
            {
                name: "Cou renforcé",
                vie: 3,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 1,
                type: "cou"
            },
            {
                name: "Cou flexible",
                vie: 2,
                force: 0,
                reflexes: 3,
                tech: 0,
                psy: 2,
                type: "cou"
            },
            {
                name: "Poitrail renforcé",
                vie: 10,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 5,
                type: "poitrine"
            },
            {
                name: "Poitrail canon",
                vie: 8,
                force: 0,
                reflexes: 0,
                tech: 10,
                psy: 8,
                type: "poitrine"
            },
            {
                name: "Poitrail de vitesse",
                vie: 4,
                force: 0,
                reflexes: 5,
                tech: 0,
                psy: 4,
                type: "poitrine"
            },
            {
                name: "Jambe de combat",
                vie: 0,
                force: 5,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "jambe"
            },
            {
                name: "Jambe renforcé",
                vie: 5,
                force: 0,
                reflexes: 0,
                tech: 0,
                psy: 3,
                type: "jambe"
            },
            {
                name: "Jambe de tireur",
                vie: 0,
                force: 0,
                reflexes: 3,
                tech: 5,
                psy: 5,
                type: "jambe"
            },
            {
                name: "Yeux bioniques",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 0,
                psy: 8,
                type: "yeux"
            },
            {
                name: "Yeux de faucons",
                vie: 0,
                force: 0,
                reflexes: 25,
                tech: 0,
                psy: 12,
                type: "yeux"
            },
            {
                name: "Oreille sonar",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 0,
                psy: 8,
                type: "oreille"
            },
            {
                name: "Oreille de grub",
                vie: 0,
                force: 0,
                reflexes: 25,
                tech: 0,
                psy: 12,
                type: "oreille"
            },
            {
                name: "Neurone artificiel",
                vie: 0,
                force: 0,
                reflexes: 15,
                tech: 5,
                psy: 12,
                type: "neurone"
            },
            {
                name: "Neurone de reflexion",
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
                name: "Médoc anti-dépression",
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
                name: "Avant bras blue Fire Mark II",
                vie: 7,
                force: 0,
                reflexes: 0,
                tech: 10,
                psy: 8,
                type: "avant-bras"
            },
            {
                name: "Colone Sandevistan Mark III",
                vie: 5,
                force: 0,
                reflexes: 20,
                tech: 2,
                psy: 15,
                type: "colone"
            },
            {
                name: "Poitrail de cosmonaut noir V1",
                vie: 10,
                force: 5,
                reflexes: 5,
                tech: 0,
                psy: 9,
                type: "poitrine"
            },
            {
                name: "Neurone de Méga Corporation Antalis V2",
                vie: 0,
                force: 5,
                reflexes: 40,
                tech: 20,
                psy: 40,
                type: "neurone"
            },
            {
                name: "Neurone de John Cena artificiel",
                vie: 0,
                force: 0,
                reflexes: 10,
                tech: 5,
                psy: -20,
                type: "neurone"
            },
        ]
    ]
    if (name) {for (let i = 0; i < items[type].length; i++) {
            if (items[type][i].name == name) {
                return items[type][i]
            }
        }
    } else {
        var item = items[type][Math.floor(Math.random()*items[type].length)];
        return item
    }
}