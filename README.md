# WebRPG

Petit RPG web sur le thème futuristique, cyberpunk, sci-fi ...

Tableau de Trello :
    https://trello.com/b/QotHQqWw/rpg-sur-site-web

Roue des couleur :
    https://color.adobe.com/


## Comment créer une bataille ?

Voici le html de base pour démarrer une bataille :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../script.js"></script>
  <title>Document</title>
</head>
<body onload="createEnemy('Nom de l'ennemi', pvs de l'ennemi, atk de l'ennemi); combat(); ">
  <!--Les éventuelles lignes d'explications / situation-->
  <div id="combat"></div>
  <div id="victory" style="display: none;"> 
    <!--Ce qui s'affiche une fois le combat gagné-->
  </div>
</body>
</html>
```
