# API REST pour la justification de texte

## Introduction

Ce projet implémente une API REST qui justifie un texte passé en paramètre. La justification est réalisée selon les règles typographiques, en ajustant l'espacement entre les mots pour que chaque ligne fasse exactement 80 caractères (sauf la dernière ligne d'un paragraphe).

L'API est sécurisée par un mécanisme d’authentification basé sur des tokens uniques et limite le nombre de mots pouvant être justifiés par jour pour chaque token.

## Fonctionnalités

- **Justification de texte** : Ajuste le texte pour que chaque ligne fasse 80 caractères.
- **Authentification par token** : Génération de tokens uniques via l'endpoint `/api/token`.
- **Limitation du débit** : Limite de 80 000 mots justifiés par token et par jour.
- **Endpoints principaux** :
  - `POST /api/token` : Génère un token d'authentification.
  - `POST /api/justify` : Retourne le texte justifié.

## Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (version 6 ou supérieure)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/AchrafGazzeh/Justify-text-tictactrip
cd Justify-text-tictactrip
```

### Installer les dépendances

```bash
npm install
```

## Démarrage de l'application

### Avec Docker Compose

1. **Lancer les services**

   ```bash
   docker-compose up
   ```

   Cela démarre les services suivants :

   - **Redis** : Base de données pour le stockage des tokens et le suivi du nombre de mots.
   - **Serveur** : Serveur Node.js exécutant l'API.

2. **Accéder à l'API**

   L'API est accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Sans Docker (Optionnel)

1. **Configurer Redis**

   Assurez-vous que Redis est installé et en cours d'exécution sur votre machine.

2. **Démarrer le serveur**

   ```bash
   npm run dev
   ```

## Documentation de l'API

### 1. Générer un token d'authentification

- **URL** : `/api/token`
- **Méthode** : `POST`
- **En-têtes** : `Content-Type: application/json`
- **Corps de la requête** :

  ```json
  {
    "email": "votre.email@example.com"
  }
  ```

- **Réponse réussie** :

  ```json
  {
    "token": "votre_token_unique"
  }
  ```

- **Exemple avec cURL** :

  ```bash
  curl -X POST http://localhost:3000/api/token \
       -H "Content-Type: application/json" \
       -d '{"email": "votre.email@example.com"}'
  ```

### 2. Justifier un texte

- **URL** : `/api/justify`
- **Méthode** : `POST`
- **En-têtes** :
  - `Content-Type: text/plain`
  - `Authorization: Bearer votre_token_unique`
- **Corps de la requête** : Texte brut à justifier.
- **Réponse réussie** : Texte justifié avec des lignes de 80 caractères.
- **Erreur 402** : Si la limite de 80 000 mots est dépassée.
- **Exemple avec cURL** :

  ```bash
  curl -X POST http://localhost:3000/api/justify \
       -H "Content-Type: text/plain" \
       -H "Authorization: Bearer votre_token_unique" \
       --data-binary @votre_texte.txt
  ```

  Remplacez `votre_texte.txt` par le chemin vers votre fichier texte.

## Limitation quotidienne

Chaque token est limité à **80 000 mots par jour**. Si cette limite est dépassée, l'API retourne une erreur **402 Payment Required**.

Le compteur de mots est réinitialisé toutes les 24 heures.

## Tests

### Exécuter les tests

```bash
npm test
```

### Couverture des tests

Pour générer un rapport de couverture :

```bash
npm run coverage
```

Les rapports sont générés dans le dossier `coverage/`.

## Structure du projet

- `src/`
  - `controllers/` : Contient les contrôleurs pour chaque endpoint.
  - `middleware/` : Contient les middlewares pour l'authentification et la limitation.
  - `utils/` : Définit les utils.
- `tests/` : Contient les tests unitaires et d'intégration.
- `Dockerfile` : Fichier de configuration pour Docker.
- `docker-compose.yml` : Fichier de configuration pour Docker Compose.

## Déploiement

L'application est déployée sur ECS et est accessible à l'adresse suivante :

[http://35.180.174.138:3000/](http://35.180.174.138:3000/)

