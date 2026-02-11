# Flight Simulator 2026 — Document de conception initiale

## 1. Pilliers du jeu

1. **Authenticité pilotable**
   - Le jeu doit rester réaliste sans exclure les nouveaux joueurs.
   - Trois presets : Assisté, Standard, Simulation.

2. **Monde vivant**
   - Météo dynamique locale (vent, turbulence, pluie, visibilité).
   - Trafic aérien IA crédible dans les zones denses.

3. **Progression motivante**
   - Carrière structurée : école de vol -> aviation régionale -> lignes long-courrier.
   - Déblocage d'appareils, certifications, licences.

4. **Immersion cockpit**
   - Interaction instruments 3D.
   - Pannes, checklist, communications radio simplifiées/avancées.

## 2. Boucle de gameplay principale

1. Préparer le vol (route, carburant, météo).
2. Inspecter l'appareil (walkaround rapide).
3. Décollage et montée.
4. Navigation + gestion événements météo/ATC.
5. Approche + atterrissage.
6. Débriefing (score sécurité, confort, efficacité).
7. Progression carrière + économie.

## 3. Modes de jeu

### 3.1 Carrière
- Missions structurées.
- Contrats (transport passagers, cargo, médical, incendie).
- Système d'argent, maintenance flotte, réputation.

### 3.2 Vol libre
- Choix libre avion / aéroport / météo / heure.
- Option replay cinématique.

### 3.3 Défis
- Conditions extrêmes (orages, vents traversiers, pannes).
- Classements en ligne.

## 4. Simulation

### 4.1 Modèle de vol
- Forces simplifiées : portance, traînée, poussée, poids.
- Surface de contrôle : ailerons, dérive, profondeur, volets.
- Paramètres par avion (masse, puissance moteur, enveloppe).

### 4.2 Systèmes avion
- Carburant (consommation + distribution).
- Électrique (bus principal/secours).
- Moteur (températures, usure légère pour gameplay).
- Train d'atterrissage et freinage différentiel.

### 4.3 Météo
- Couche globale + cellules locales.
- Variation en temps réel.
- Impact direct sur performances et maniabilité.

## 5. Expérience utilisateur

### 5.1 Accessibilité
- Tutoriels interactifs.
- Aides visuelles (assistant d'approche, repères piste).
- Aides adaptatives par niveau du joueur.

### 5.2 Interface
- Carte monde avec filtres météo.
- Planificateur de vol simple puis expert.
- HUD paramétrable + cockpit intégral.

## 6. Contenu initial (MVP)

- 4 avions :
  1. Cessna-like école,
  2. Turboprop régional,
  3. Jet court-courrier,
  4. Hélicoptère utilitaire (optionnel phase 2).
- 6 aéroports modélisés à la main.
- 20 missions carrière.
- 10 défis météo/pilotage.

## 7. Stack technique proposée (première passe)

- **Moteur** : Unreal Engine 5 ou Godot 4 (prototype rapide avec Godot possible).
- **Physique** : module de vol custom + validation par tables de performance.
- **Données monde** : tuiles de terrain + météo procédurale.
- **Backend léger** : profils joueurs, classements, events saisonniers.

## 8. Plan de prototypage (8 semaines)

### S1-S2
- Prototype vol basique (décollage / virage / atterrissage).
- Caméra cockpit + vue externe.

### S3-S4
- Instrumentation minimale (vitesse, altitude, cap, variomètre).
- Système météo simple (vent + turbulence).

### S5-S6
- Mission tutorielle complète.
- Score de vol.

### S7-S8
- Boucle carrière minimale.
- Stabilisation + playtests.

## 9. KPI de validation du prototype

- 70% des testeurs terminent le tuto sans blocage.
- 60 FPS cible sur machine milieu de gamme.
- Temps moyen d'une session > 20 minutes.
- Note d'immersion > 7/10 en test interne.

## 10. Risques & mitigations

1. **Complexité simulation**
   - Mitigation : architecture modulaire + niveaux de réalisme.

2. **Scope trop large**
   - Mitigation : MVP strict + backlog priorisé (Must/Should/Could).

3. **Performance**
   - Mitigation : budgets per-frame, LOD agressifs, profiling hebdo.

---

Ce document est la base de départ. La prochaine étape est de produire un backlog exécutable (tickets techniques + game design détaillé par feature).
