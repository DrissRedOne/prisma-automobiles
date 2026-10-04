"""Contenus du site BM33 Automobiles : seule source à modifier pour les textes, le stock, les prix et les coordonnées.
Positionnement : petit garage indépendant (vente de voitures d'occasion, entretien, réparation mécanique et carrosserie).
Règles de rédaction : ni tiret long ni tiret moyen, apostrophes droites (converties à la construction).
Tout ce qui doit être confirmé par M. Baghdad est listé dans A_VALIDER (stock d'exemple, services, coordonnées)."""

SITE = {
    'name': 'BM33',
    'brand': 'BM33 Automobiles',
    'legal_name': 'BM 33',
    'tagline': 'Garage et voitures d\'occasion',
    'baseline': "Entretien, mécanique, carrosserie et occasions",
    'area': 'Yvrac, Bordeaux rive droite',
    'city': 'Yvrac',
    'zip': '33370',
    'region': 'Gironde',
    'phone': '07 84 95 20 67',
    'phone_e164': '+33784952067',
    'whatsapp': 'https://wa.me/33784952067',
    'email': 'baghdad.hakim@gmail.com',
    'hours': 'Du lundi au samedi, sur rendez-vous',
    'visit': "Atelier et essais à Yvrac",
    'lat': 44.8702,
    'lon': -0.4698,
}

LEGAL = {
    'company': 'BM 33',
    'form': 'Société par actions simplifiée unipersonnelle au capital de 500 €',
    'rcs': 'RCS Bordeaux 808 832 786',
    'siret': '808 832 786 00020',
    'ape': '4511Z, commerce de voitures et de véhicules automobiles légers',
    'seat': '72 bis avenue des Tabernottes, 33370 Yvrac',
    'director': 'Hakim Baghdad, président',
    'host': 'OVH SAS, 2 rue Kellermann, 59100 Roubaix, France (ovhcloud.com)',
    'maker': 'Groupe Amane Conseils, 72 bis avenue des Tabernottes, 33370 Yvrac',
    # à remplacer par les coordonnées du médiateur choisi (par exemple Mobilians Médiation, pour les professionnels de l'automobile)
    'mediator': "Les coordonnées du médiateur retenu par BM 33 seront indiquées ici.",
}

# Stock d'exemple (démonstration) : un petit stock de voitures abordables, photos libres de droits créditées dans les
# mentions légales. km : kilométrage ; ch : puissance ; prix TTC en euros.
VEHICLES = [
    {'slug': 'peugeot-3008-bluehdi-130-gt-2021', 'id': '3008', 'status': 'nouveau', 'ref': 'BM-01', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 1,
     'points': ['Première main, carnet à jour', 'Finition GT, i-Cockpit 3D', 'Boîte automatique EAT8', 'Distribution et vidange faites'],
     'make': 'Peugeot', 'model': '3008', 'version': '1.5 BlueHDi 130 EAT8 GT',
     'year': 2021, 'km': 82000, 'fuel': 'Diesel', 'gearbox': 'Automatique', 'power': 130, 'doors': 5, 'seats': 5,
     'color': 'Blanc nacré, toit noir', 'body': 'SUV', 'crit_air': 2, 'price': 21400, 'featured': True,
     'tagline': "Le SUV familial, finition GT",
     'equipment': ['i-Cockpit 3D', 'Navigation connectée', 'Caméra de recul', 'Hayon mains libres',
                   'Sièges chauffants', 'Grip Control', 'Jantes 19 pouces'],
     'history': 'Première main, carnet Peugeot à jour'},
    {'slug': 'bmw-serie-1-120i-sport-2020', 'id': 'serie1', 'status': 'nouveau', 'ref': 'BM-02', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 2,
     'points': ['Finition Sport, sièges sport', 'GPS et Apple CarPlay', "Carnet d'entretien à jour", 'Boîte automatique'],
     'make': 'BMW', 'model': 'Série 1', 'version': '120i Sport',
     'year': 2020, 'km': 69000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 178, 'doors': 5, 'seats': 5,
     'color': 'Noir saphir', 'body': 'Compacte', 'crit_air': 1, 'price': 22900,
     'tagline': "La compacte premium, vive et bien équipée",
     'equipment': ['Sièges sport', 'GPS', 'Apple CarPlay', 'Caméra de recul', 'Régulateur de vitesse',
                   'Jantes 18 pouces', "Éclairage d'ambiance"],
     'history': "Deuxième main, carnet d'entretien à jour"},
    {'slug': 'mercedes-classe-a-180-amg-line-2019', 'id': 'classe-a', 'status': '', 'ref': 'BM-03', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 2,
     'points': ['Ligne AMG intérieur et extérieur', 'MBUX double écran', 'Sièges chauffants', "Factures d'entretien fournies"],
     'make': 'Mercedes-Benz', 'model': 'Classe A', 'version': '180 AMG Line 7G-DCT',
     'year': 2019, 'km': 74000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 136, 'doors': 5, 'seats': 5,
     'color': 'Gris montagne', 'body': 'Compacte', 'crit_air': 1, 'price': 21900,
     'tagline': "Le système MBUX et la ligne AMG",
     'equipment': ['Pack AMG Line', 'MBUX double écran', 'Caméra de recul', 'Sièges chauffants',
                   "Éclairage d'ambiance", 'Phares LED', 'Jantes AMG 18 pouces'],
     'history': "Deuxième main, factures d'entretien fournies"},
    {'slug': 'volkswagen-golf-8-r-line-1-5-etsi-2020', 'id': 'golf', 'status': 'reserve', 'ref': 'BM-04', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 1,
     'points': ['Première main, entretien Volkswagen', 'Hybridation légère, boîte DSG7', 'Finition R-Line, jantes 18 pouces', 'Phares LED'],
     'make': 'Volkswagen', 'model': 'Golf 8', 'version': 'R-Line 1.5 eTSI DSG7',
     'year': 2020, 'km': 71000, 'fuel': 'Essence hybride légère', 'gearbox': 'Automatique', 'power': 150, 'doors': 5, 'seats': 5,
     'color': 'Gris Moonstone', 'body': 'Compacte', 'crit_air': 1, 'price': 21500,
     'tagline': "La compacte de référence, en finition R-Line",
     'equipment': ['Digital Cockpit', 'Navigation', 'Sièges sport R-Line', 'Phares LED',
                   'Régulateur adaptatif', 'Jantes 18 pouces', 'Caméra de recul'],
     'history': 'Première main, entretien Volkswagen'},
    {'slug': 'mini-cooper-3-portes-2019', 'id': 'mini', 'status': '', 'ref': 'BM-05', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 2,
     'points': ['Toit et bandes de capot noirs', 'Navigation sur écran tactile', 'Sièges sport chauffants', 'Entretien à jour'],
     'make': 'Mini', 'model': 'Cooper', 'version': '3 portes Steptronic',
     'year': 2019, 'km': 64000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 136, 'doors': 3, 'seats': 4,
     'color': 'Rouge chili, toit noir', 'body': 'Citadine', 'crit_air': 1, 'price': 16900,
     'tagline': "Le plaisir de conduire, en version compacte",
     'equipment': ['Navigation', 'Sièges sport chauffants', 'Feux LED Union Jack', 'Bandes de capot',
                   'Toit et coques de rétroviseurs noirs', 'Régulateur de vitesse'],
     'history': 'Deuxième main, entretien à jour'},
    {'slug': 'renault-clio-5-tce-90-intens-2021', 'id': 'clio', 'status': '', 'ref': 'BM-06', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 1,
     'points': ['Première main', 'Écran 9,3 pouces avec GPS', 'Caméra de recul', 'Idéale pour un jeune conducteur'],
     'make': 'Renault', 'model': 'Clio V', 'version': 'TCe 90 Intens',
     'year': 2021, 'km': 58000, 'fuel': 'Essence', 'gearbox': 'Manuelle', 'power': 91, 'doors': 5, 'seats': 5,
     'color': 'Bleu Iron', 'body': 'Citadine', 'crit_air': 1, 'price': 12900,
     'tagline': "La citadine idéale pour un premier achat",
     'equipment': ['Écran tactile 9,3 pouces avec GPS', 'Apple CarPlay', 'Caméra de recul', 'Climatisation automatique',
                   'Carte mains libres', 'Jantes 16 pouces'],
     'history': 'Première main, carnet Renault à jour'},
    {'slug': 'tesla-model-3-propulsion-2021', 'id': 'model3', 'status': 'vendu', 'ref': 'BM-07', 'ct': 'De moins de six mois, remis à la vente', 'keys': 2, 'owners': 1,
     'points': ["Autonomie de 491 km (WLTP)", 'Autopilot de série', 'Batterie sous garantie constructeur', 'Sièges chauffants'],
     'make': 'Tesla', 'model': 'Model 3', 'version': 'Propulsion',
     'year': 2021, 'km': 88000, 'fuel': 'Électrique', 'gearbox': 'Automatique', 'power': 283, 'doors': 4, 'seats': 5,
     'color': 'Bleu nuit métallisé', 'body': 'Berline', 'crit_air': 0, 'price': 24900, 'range': 491,
     'tagline': "100 % électrique, 491 km d'autonomie (cycle WLTP)",
     'equipment': ['Autopilot', 'Écran central 15 pouces', 'Toit en verre', 'Sièges chauffants',
                   'Accès par téléphone', 'Mises à jour à distance'],
     'history': 'Première main, batterie sous garantie constructeur'},
]

# « L'histoire de cette voiture » (fiche) : deux paragraphes par véhicule, sans rien qui dépende du statut
STORIES = {
    '3008': ["Première main, carnet à jour. Finition GT, boîte automatique. Vidange et distribution vérifiées avant la vente."],
    'serie1': ["Deux propriétaires, carnet à jour. 178 ch, boîte automatique, GPS et Apple CarPlay."],
    'classe-a': ["Deuxième main, factures d'entretien fournies. Ligne AMG, écran MBUX, boîte automatique."],
    'golf': ["Première main, entretien Volkswagen. Finition R-Line, boîte DSG7, jantes 18 pouces."],
    'mini': ["Deuxième main, entretien à jour. Toit noir, sièges sport chauffants, GPS."],
    'clio': ["Première main, carnet Renault à jour. Économique, avec GPS et caméra de recul. Idéale pour débuter."],
    'model3': ["Première main, batterie sous garantie constructeur. 491 km d'autonomie (WLTP), Autopilot."],
}

SOON = []

# l'atelier : prestations (à confirmer par M. Baghdad, de même que le lieu de l'atelier et les tarifs)
ATELIER = [
    {'id': 'entretien', 'icon': 'oil', 'title': 'Entretien et révision', 'text': "Vidange, filtres et contrôles, selon le carnet.",
     'items': ['Révision', 'Vidange et filtres', 'Bougies, courroie']},
    {'id': 'freinage', 'icon': 'brake', 'title': 'Freinage', 'text': "Plaquettes, disques, liquide de frein.",
     'items': ['Plaquettes et disques', 'Liquide de frein', 'Contrôle']},
    {'id': 'pneus', 'icon': 'tire', 'title': 'Pneus', 'text': "Montage et équilibrage, toutes tailles.",
     'items': ['Montage', 'Équilibrage', 'Crevaison']},
    {'id': 'mecanique', 'icon': 'wrench', 'title': 'Mécanique', 'text': "Embrayage, distribution, suspension, échappement.",
     'items': ['Embrayage', 'Distribution', 'Suspension']},
    {'id': 'diagnostic', 'icon': 'scan', 'title': 'Diagnostic', 'text': "Un voyant allumé ? On trouve la cause.",
     'items': ['Valise toutes marques', 'Voyants', 'Électricité']},
    {'id': 'clim', 'icon': 'snow', 'title': 'Climatisation', 'text': "Recharge et contrôle.",
     'items': ['Recharge', 'Fuites', "Filtre d'habitacle"]},
    {'id': 'carrosserie', 'icon': 'paint', 'title': 'Carrosserie', 'text': "Rayures, bosses, pare-chocs, peinture.",
     'items': ['Rayures', 'Bosses', 'Peinture']},
    {'id': 'ct', 'icon': 'clipboard', 'title': 'Contrôle technique', 'text': "On prépare le passage et la contre-visite.",
     'items': ['Vérification avant', 'Contre-visite', 'Réparations']},
]

# déroulé d'une intervention à l'atelier
ATELIER_STEPS = [
    ('Vous nous appelez', "Ou vous remplissez le formulaire."),
    ('On vous envoie un devis', "Le prix exact, avant de commencer."),
    ('On répare', "Seulement ce qui est prévu. Sinon, on vous appelle."),
    ('On vous explique', "Ce qu'on a fait, avec des mots simples."),
]

ATELIER_FAQ = [
    ("Faites-vous un devis ?", "Oui, toujours. Rien n'est fait sans votre accord."),
    ("Toutes les marques ?", "Oui, voitures et petits utilitaires."),
    ("Ma garantie constructeur reste valable ?", "Oui, si la révision suit le carnet du constructeur. Vous n'êtes pas obligé d'aller chez la marque."),
    ("Je peux apporter mes pièces ?", "Demandez-nous au moment du devis."),
]

# pourquoi nous (accueil) : des engagements de petit garage, pas d'obligations légales présentées comme des avantages
INCLUDED = [
    ('Un seul contact', "La même personne, du devis à la fin."),
    ("Un devis d'abord", "Vous connaissez le prix avant les travaux."),
    ('Des mots simples', "On vous explique, sans jargon."),
    ('Des voitures vérifiées', "Chaque occasion passe par l'atelier."),
]

LEGAL_NOTE = ("Garanties : comme tout vendeur professionnel, nous appliquons la garantie légale de conformité et la garantie "
              "des vices cachés. Pour une occasion, un défaut qui apparaît dans les 12 mois est présumé exister à la vente. "
              "Les voitures de plus de 4 ans sont vendues avec un contrôle technique de moins de 6 mois.")

# accueil : les activités du garage
SERVICES = [
    {'id': 'atelier', 'title': 'Entretien et mécanique', 'lead': "Révision, freins, pneus, embrayage. Toutes marques.", 'href': '/atelier', 'cta': "Voir l'atelier"},
    {'id': 'carrosserie', 'title': 'Carrosserie', 'lead': "Rayures, bosses, pare-chocs, peinture.", 'href': '/atelier#carrosserie', 'cta': 'Demander un devis'},
    {'id': 'vente', 'title': "Voitures d'occasion", 'lead': "Quelques voitures, vérifiées par l'atelier.", 'href': '/vehicules', 'cta': 'Voir les occasions'},
    {'id': 'reprise', 'title': 'Reprise et rachat', 'lead': "On reprend ou on rachète votre voiture.", 'href': '/vendre-ma-voiture', 'cta': 'Faire estimer'},
]

METHOD = ATELIER_STEPS

FAQ = [
    ("Comment prendre rendez-vous ?", "Appelez le {phone}, écrivez sur WhatsApp ou remplissez le formulaire."),
    ("Faites-vous un devis ?", "Oui, toujours, avant les travaux."),
    ("Toutes les marques ?", "Oui, voitures et petits utilitaires."),
    ("Peut-on essayer une occasion ?", "Oui, sur rendez-vous à Yvrac."),
    ("Reprenez-vous ma voiture ?", "Oui. Décrivez-la sur la page Reprise, on vous donne un prix."),
    ("Quelles garanties pour une occasion ?", "La garantie légale de conformité et la garantie des vices cachés, comme chez tout professionnel. Un défaut qui apparaît dans les 12 mois est présumé exister à la vente."),
]

# page Vendre ma voiture : les trois formules (conditions à confirmer par M. Baghdad)
SELL_WAYS = [
    {'id': 'reprise', 'icon': 'swap', 'title': 'Reprise', 'accent': True,
     'lead': "Vous achetez chez nous : le prix de votre voiture est déduit.",
     'facts': [('Prix', 'Déduit de votre achat'), ('Quand', 'Le jour de votre nouvelle voiture'), ('Papiers', "On s'en occupe")],
     'for_who': "Pour changer de voiture en une fois."},
    {'id': 'rachat', 'icon': 'key', 'title': 'Rachat',
     'lead': "On achète votre voiture, même sans achat chez nous.",
     'facts': [('Prix', 'Payé par virement'), ('Quand', "Dès l'accord"), ('Papiers', "On s'en occupe")],
     'for_who': "Pour vendre vite, sans annonce."},
    {'id': 'depot-vente', 'icon': 'doc', 'title': 'Dépôt-vente',
     'lead': "On vend votre voiture pour vous.",
     'facts': [('Prix', 'Prix du marché, moins notre commission'), ('Quand', "Quand on trouve l'acheteur"), ('Papiers', "Photos, annonces, visites : on s'en occupe")],
     'for_who': "Pour le meilleur prix, sans effort."},
]

SELL_DOCS = [
    ("Carte grise", "Barrée, avec « Vendu le », la date, l'heure et votre signature."),
    ("Certificat de non-gage", "Gratuit en ligne, de moins de 15 jours."),
    ("Contrôle technique", "De moins de 6 mois pour le dépôt-vente d'une voiture de plus de 4 ans. Pas besoin pour une reprise ou un rachat."),
    ("Carnet et factures", "Ils aident à mieux estimer votre voiture."),
    ("Doubles des clés", "Toutes les clés que vous avez."),
    ("Pièce d'identité", "Celle du titulaire de la carte grise."),
]

SELL_FAQ = [
    ("Comment est calculé le prix ?", "D'après les prix du marché, l'entretien et l'état de la voiture."),
    ("Faut-il venir ?", "Non. La description et des photos suffisent pour un premier prix. On le confirme en voyant la voiture."),
    ("J'ai un crédit en cours ?", "C'est possible : il faut le solder à la vente. Dites-le-nous dès le début."),
    ("Combien de temps pour un dépôt-vente ?", "Ça dépend du modèle et du prix. On fixe ensemble un prix réaliste."),
]

SEARCH_STEPS = [
    ('Votre demande', "Le modèle, le budget, les options."),
    ('Notre recherche', "Auprès de professionnels de confiance."),
    ('La vérification', "La voiture passe par l'atelier avant de vous être proposée."),
]
SEARCH_BUDGETS = ['Moins de 10 000 €', '10 000 à 15 000 €', '15 000 à 20 000 €', '20 000 à 25 000 €', 'Plus de 25 000 €']

# marques entretenues (bandeau défilant)
MARQUES = ['Renault', 'Peugeot', 'Citroën', 'Dacia', 'Volkswagen', 'Toyota', 'Ford', 'Opel', 'BMW', 'Mercedes-Benz', 'Audi', 'Mini', 'Fiat', 'Nissan', 'Kia', 'Hyundai', 'Tesla']

NAV = [
    {'href': '/atelier', 'label': 'Atelier'},
    {'href': '/vehicules', 'label': 'Occasions'},
    {'href': '/vendre-ma-voiture', 'label': 'Reprise'},
    {'href': '/contact', 'label': 'Contact'},
]

# pages fixes ; les fiches véhicules sont ajoutées par build.py (une par entrée de VEHICLES)
PAGES = {
    'index': {'template': 'index.html', 'file': 'index.html', 'path': '/',
              'title': "BM33 Automobiles | Garage et voitures d'occasion à Yvrac",
              'description': "Petit garage indépendant à Yvrac, près de Bordeaux : entretien, mécanique, carrosserie, toutes marques, et voitures d'occasion contrôlées. Devis avant travaux."},
    'atelier': {'template': 'atelier.html', 'file': 'atelier.html', 'path': '/atelier', 'crumb': 'Atelier',
                'title': "Entretien, mécanique et carrosserie à Yvrac | BM33 Automobiles",
                'description': "Révision, freins, pneus, embrayage, diagnostic, climatisation et carrosserie, toutes marques. Devis détaillé avant travaux, à Yvrac près de Bordeaux."},
    'vehicules': {'template': 'vehicules.html', 'file': 'vehicules.html', 'path': '/vehicules', 'crumb': 'Occasions',
                  'title': "Voitures d'occasion contrôlées à Yvrac | BM33 Automobiles",
                  'description': "Un petit stock de voitures d'occasion contrôlées par notre atelier, avec leur historique. Essai sur rendez-vous à Yvrac. Recherche sur demande."},
    'vendre': {'template': 'vendre.html', 'file': 'vendre-ma-voiture.html', 'path': '/vendre-ma-voiture', 'crumb': 'Reprise',
                'title': "Reprise et rachat de votre voiture | BM33 Automobiles, Yvrac",
                'description': "Faites estimer votre voiture : reprise déduite de votre achat, rachat direct ou dépôt-vente. Réponse rapide, démarches prises en charge."},
    'contact': {'template': 'contact.html', 'file': 'contact.html', 'path': '/contact', 'crumb': 'Contact',
                'title': "Contact et rendez-vous | BM33 Automobiles, Yvrac",
                'description': "Appelez-nous, écrivez sur WhatsApp ou demandez un rendez-vous pour l'atelier ou un essai : BM33 Automobiles, garage à Yvrac, près de Bordeaux."},
    'mentions': {'template': 'mentions.html', 'file': 'mentions-legales.html', 'path': '/mentions-legales', 'crumb': 'Mentions légales',
                 'title': "Mentions légales | BM33 Automobiles",
                 'description': "Mentions légales du site BM33 Automobiles : éditeur, hébergeur, médiation, crédits photos et données personnelles.", 'sitemap': True},
    '404': {'template': '404.html', 'file': '404.html', 'path': '/404', 'crumb': 'Page introuvable',
            'title': "Page introuvable | BM33 Automobiles",
            'description': "Cette page n'existe pas ou plus. Retrouvez notre atelier et nos voitures d'occasion.", 'sitemap': False},
}

A_VALIDER = [
    "Positionnement « petit garage » : prestations réellement assurées à l'atelier (entretien, freinage, pneus, mécanique, diagnostic, climatisation, carrosserie, préparation au contrôle technique)",
    "Adresse de l'atelier et lieu des essais (le siège est une domiciliation : le site indique « à Yvrac, sur rendez-vous »)",
    "Taux horaire et tarifs : leur affichage est obligatoire à l'atelier ; à indiquer aussi sur le site si souhaité",
    "Stock réel, photos, prix et kilométrages (le site montre un stock d'exemple, photos libres de droits)",
    "Conditions de la reprise, du rachat, du dépôt-vente (commission) et de la recherche de voiture",
    "Téléphone, e-mail et WhatsApp à afficher",
    "Nom commercial « BM33 Automobiles », logo et couleurs",
    "Nom de domaine (proposition : bm33-automobiles.fr)",
    "Médiateur de la consommation (obligatoire pour vendre aux particuliers ; par exemple Mobilians Médiation)",
]
