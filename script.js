// Entièrement fait par Soullard Syméon
//Exactement, je confirme - Gabin
function combat(enemy) {
    force = localStorage.getItem("force")
    hp = localStorage.getItem("hp")
    reflexes = localStorage.getItem("reflexes")
    tech = localStorage.getItem("tech")
    div = document.getElementById('fight')
    div.innerHTML = "<button id='cac'></button><button id='distance'></button><button id='tech'></button>"
}

function checkPsychose() {
    psy = localStorage.getItem("psy")
    if (psy >= 100) {
        death("Vous mourrez de folie cyber-psychotique")
    }
}

function death(deathMessage) {
    localStorage.setItem("deathMessage", deathMessage)
    window.location.href = "" // le lien vers la page
}

function init() {
    pseudo = document.getElementById("input_pseudo").value
    localStorage.setItem("pseudo", pseudo)
    localStorage.setItem("force", "5")
    localStorage.setItem("hp", "5")
    localStorage.setItem("reflexes", "5")
    localStorage.setItem("tech", "5")
    localStorage.setItem("psy", "5")
    localStorage.setItem("deathMessage", "")
    window.location = 'Start/mission.html'
}

class enemy {
    constructor(name, hp, force) {
        this.name = name;
        this.hp = hp;
        this.force = force;
    }
}

JohnCena = new enemy("John Cena", 150, 7)
yakuza = new enemy("Yakuza", 50, 1)
gardes = new enemy("Gardes", 50, 1)
cadres = new enemy("Cadres", 60, 3)
MelonMusk = new enemy("Melon Musk", 130, 6)
RickAstley = new enemy("Rick Astley", 225, 11)