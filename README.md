# JeuPays
JeuPays est un side project ou on va utiliser une api pour récupérer des pays et deviner quel pays c'est.
api utilisé : https://restcountries.eu/

## Pourquoi ?
Ce projet est avant tout un entrainement à VueJS le but est d'apprendre les pays.

## Pas vraiment fini ?
Oui ce projet n'est pas vraiment fini. 
Actuellement il se contente de respecter ce qu'il devait faire de base. C'est à dire qu'il va chercher sur une api externe les données et les traites avant de proposer une révision des drapeaux.

Après des discussions avec des camarades, il serait plus judicieux de garder les données soit même pour ne pas être dépendant de cette api.

## Une evolution ?

Oui ce projet aura une evolution qui est en cours mais ne sera pas sur le même repository.
L'evolution sera une version mobile comportant les données de : 
https://www.data.gouv.fr/fr/datasets/etats-et-capitales-du-monde/

et pour les drapeaux : 
https://github.com/mledoze/countries/tree/master/data

## Sinon comment on lance le projet ?
il suffit de le télécharger et de faire dans un terminal windows à la racine du projet :

```sh
cd .\paysclient\
```
puis:
```sh
npm i
```
ensuite il faut lancer le projet via : 

```sh
npm run serve
```

puis il suffit de cliquer sur le lien affiché dans le terminal pour ma part: 

Local:   http://localhost:8081/
