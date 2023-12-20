function combat() {
    force = localStorage.getItem("force")
    hp = localStorage.getItem("hp")
    reflexes = localStorage.getItem("reflexes")
    tech = localStorage.getItem("tech")
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