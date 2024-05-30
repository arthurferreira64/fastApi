# MODULE-03 : Application FastAPI de base

Ce projet utilise FastAPI pour créer une API et SQLAlchemy pour la gestion des bases de données. Voici comment vous pouvez configurer et lancer le projet.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système :

- Python 3.6+
- `pip` (le gestionnaire de paquets Python)

## Configuration de l'environnement

1. Clonez ce dépôt sur votre machine locale :

    ```bash
    git clone <url-de-votre-repo>
    cd <nom-du-repo>
    ```

2. Accédez au dossier `api` :

    ```bash
    cd api
    ```

3. Créez un environnement virtuel :

    ```bash
    python3 -m venv env
    ```

4. Activez l'environnement virtuel :

    - Sur macOS et Linux :

        ```bash
        source env/bin/activate
        ```

    - Sur Windows :

        ```bash
        .\env\Scripts\activate
        ```

5. Installez les dépendances nécessaires :

    ```bash
    pip install fastapi uvicorn sqlalchemy pydantic
    ```

## Lancement du serveur

1. Revenez au répertoire racine du projet :

    ```bash
    cd ..
    ```

2. Lancez le serveur avec Uvicorn :

    ```bash
    uvicorn api.main:app --reload
    ```

L'option `--reload` permet de redémarrer automatiquement le serveur lorsque des modifications sont apportées au code source.

## Structure du projet

La structure de base du projet est la suivante :

- `main.py` : point d'entrée de l'application FastAPI.
- `models.py` : définition des modèles SQLAlchemy.
- `schemas.py` : schémas Pydantic pour validation des données.
- `database.py` : configuration de la base de données.
- `routers/` : répertoires pour les routeurs FastAPI.

## Documentation de l'API

Une fois le serveur démarré, vous pouvez accéder à la documentation interactive de l'API à l'adresse suivante :


## Contributions

Les contributions sont les bienvenues ! Veuillez créer une issue ou une pull request pour toute suggestion ou amélioration.

## Licence

Ce projet est sous licence [Arthur et Tom].
