# PRISMA AUTOMOBILES : application de location

Site client (réservation, paiement, espace client) et logiciel du loueur (réservations, planning, flotte, clients, tarifs), en démonstration.

- **En ligne** : https://prisma-automobiles.vercel.app. Vercel publie automatiquement chaque envoi sur `main`.
- **Installable** (PWA) : depuis Chrome sur Android, menu ⋮ puis « Installer l'application » ; depuis Safari sur iPhone, Partager puis « Sur l'écran d'accueil ». L'appli fonctionne ensuite hors connexion.
- Les données de démonstration restent dans le navigateur (aucun serveur).

## Dossiers

- `site/` : l'application publiée. Ne pas la modifier à la main, c'est le résultat de la construction.
- `source/` : les sources, les icônes et les tests.

## Modifier et publier

```bash
cd source
python3 build.py --publier   # reconstruit, puis remplace site/
```

Python 3 avec Pillow ; `pwa_assets.py` (icônes, écrans de démarrage) demande aussi numpy et scipy.

Tests de bout en bout (Playwright, Chromium) : `cd source/tests && npm install && node parcours.js ordi` (puis `mobile`).

Les photos des véhicules viennent de Wikimedia Commons (licences Creative Commons) ; les crédits sont dans l'application, pied de page, « Crédits photos ».
