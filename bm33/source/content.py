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
    'visit': "Atelier et essais à Yvrac, sur rendez-vous",
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
    '3008': ["Une première main au carnet à jour, en finition GT. L'i-Cockpit 3D, le hayon mains libres et la caméra de recul facilitent la vie au quotidien.",
             "Le 1.5 BlueHDi de 130 ch et la boîte EAT8 forment un duo sobre et souple, idéal pour la famille et les longs trajets. Nous avons fait la vidange et vérifié la distribution avant la mise en vente."],
    'serie1': ["Deux propriétaires, un carnet d'entretien suivi et la finition Sport : sièges sport, volant gainé de cuir et inserts noir brillant.",
               "Le 120i de 178 ch associé à la boîte automatique en fait une compacte vive en ville comme sur autoroute, bien équipée avec le GPS et Apple CarPlay."],
    'classe-a': ["Deuxième main, factures d'entretien à l'appui. La ligne AMG lui donne un style affirmé, à l'extérieur comme dans l'habitacle avec ses sièges sport et son éclairage d'ambiance.",
                 "Le système MBUX à double écran et la boîte 7G-DCT rendent la conduite simple et agréable. Une compacte élégante, parfaitement à l'aise en ville."],
    'golf': ["Une première main entretenue dans le réseau Volkswagen. La finition R-Line lui donne une allure sportive : boucliers spécifiques, sièges sport et jantes de 18 pouces.",
             "Le 1.5 eTSI de 150 ch, épaulé par une hybridation légère, et la boîte DSG7 forment un duo souple et sobre. Une compacte polyvalente, agréable tous les jours."],
    'mini': ["Deuxième main, entretien à jour. Toit noir, bandes de capot et feux Union Jack : elle a du caractère, et les 136 ch de la Cooper suffisent largement pour se faire plaisir.",
             "Sièges sport chauffants, navigation et finition soignée : une citadine à l'aise en ville comme pour les escapades du week-end."],
    'clio': ["Une première main au carnet Renault à jour. Le TCe 90 est vif et économique, la boîte manuelle précise.",
             "Écran de 9,3 pouces avec GPS, caméra de recul et carte mains libres : l'équipement d'une catégorie supérieure, idéal pour un premier achat ou un jeune conducteur."],
    'model3': ["Une première main, batterie sous garantie constructeur. Avec 491 km d'autonomie (cycle WLTP), elle couvre sans effort les trajets quotidiens comme les week-ends.",
               "Autopilot, toit en verre et mises à jour à distance : une électrique qui reste moderne, et des coûts d'usage réduits au minimum."],
}

SOON = []

# l'atelier : prestations (à confirmer par M. Baghdad, de même que le lieu de l'atelier et les tarifs)
ATELIER = [
    {'id': 'entretien', 'icon': 'oil', 'title': 'Entretien et révision',
     'text': "Vidange, filtres, niveaux et points de contrôle, selon le carnet du constructeur.",
     'items': ['Révision constructeur', 'Vidange et filtres', 'Bougies, courroie d\'accessoires']},
    {'id': 'freinage', 'icon': 'brake', 'title': 'Freinage',
     'text': "Plaquettes, disques, liquide de frein : votre sécurité d'abord.",
     'items': ['Plaquettes et disques', 'Liquide de frein', 'Contrôle complet']},
    {'id': 'pneus', 'icon': 'tire', 'title': 'Pneus et géométrie',
     'text': "Montage, équilibrage et permutation, toutes dimensions.",
     'items': ['Montage et équilibrage', 'Pneus été, hiver, 4 saisons', 'Crevaisons']},
    {'id': 'mecanique', 'icon': 'wrench', 'title': 'Mécanique',
     'text': "Embrayage, distribution, suspension, échappement : les réparations du quotidien.",
     'items': ['Distribution et embrayage', 'Suspension et direction', 'Échappement']},
    {'id': 'diagnostic', 'icon': 'scan', 'title': 'Diagnostic',
     'text': "Un voyant allumé ? Lecture des défauts à la valise et explication claire avant toute intervention.",
     'items': ['Valise multimarque', 'Voyants et défauts', 'Électricité']},
    {'id': 'clim', 'icon': 'snow', 'title': 'Climatisation',
     'text': "Recharge et contrôle d'étanchéité pour retrouver de la fraîcheur.",
     'items': ['Recharge', "Contrôle d'étanchéité", 'Filtre d\'habitacle']},
    {'id': 'carrosserie', 'icon': 'paint', 'title': 'Carrosserie',
     'text': "Rayures, bosses, pare-chocs, peinture : votre voiture retrouve son allure.",
     'items': ['Rayures et bosses', 'Pare-chocs', 'Peinture']},
    {'id': 'ct', 'icon': 'clipboard', 'title': 'Préparation au contrôle technique',
     'text': "Vérification avant le passage et réparation des défauts relevés lors d'une contre-visite.",
     'items': ['Contrôle avant passage', 'Contre-visite', 'Éclairage, freins, pneus']},
]

# déroulé d'une intervention à l'atelier
ATELIER_STEPS = [
    ('Vous nous décrivez le besoin', "Par téléphone, WhatsApp ou avec le formulaire : le véhicule, le symptôme, l'entretien à faire."),
    ('Un devis clair', "Nous vous envoyons un devis détaillé, pièces et main d'œuvre, avant de toucher à votre voiture."),
    ("L'intervention", "Nous réalisons les travaux convenus, rien de plus. Si nous découvrons autre chose, nous vous appelons d'abord."),
    ('La restitution', "Nous vous expliquons ce qui a été fait et vous rendons les pièces remplacées si vous le souhaitez."),
]

ATELIER_FAQ = [
    ("Faites-vous un devis avant les travaux ?", "Oui, toujours. Vous recevez un devis détaillé, pièces et main d'œuvre, et rien n'est fait sans votre accord."),
    ("Intervenez-vous sur toutes les marques ?", "Oui, les voitures particulières et les petits utilitaires de toutes marques, essence, diesel et hybrides."),
    ("Ma garantie constructeur est-elle préservée ?", "Oui. Une révision faite selon le carnet du constructeur, avec des pièces de qualité équivalente, préserve la garantie : vous n'êtes pas obligé de passer par le réseau de la marque."),
    ("Puis-je apporter mes pièces ?", "Parlons-en au moment du devis : selon la pièce, nous vous dirons si c'est possible."),
]

# pourquoi nous (accueil) : des engagements de petit garage, pas d'obligations légales présentées comme des avantages
INCLUDED = [
    ('Un seul interlocuteur', "Vous parlez à la personne qui s'occupe de votre voiture, du devis à la restitution."),
    ('Un devis avant travaux', "Pièces et main d'œuvre détaillées : vous savez ce que vous payez avant que l'on commence."),
    ('Des explications claires', "Ce qui a été fait, pourquoi, et ce qu'il faudra prévoir plus tard. Sans jargon."),
    ('Des voitures contrôlées', "Chaque occasion passe par notre atelier avant la vente : entretien fait, défauts signalés."),
]

LEGAL_NOTE = ("Comme tout vendeur professionnel, nous sommes tenus de la garantie légale de conformité (articles L217-3 et suivants "
              "du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil). Pour une "
              "voiture d'occasion, un défaut de conformité qui apparaît dans les douze mois suivant la livraison est présumé exister "
              "au jour de la vente. Les voitures de plus de quatre ans sont vendues avec un contrôle technique de moins de six mois.")

# accueil : les activités du garage
SERVICES = [
    {'id': 'atelier', 'title': 'Entretien et mécanique', 'lead': "Révision, freins, pneus, embrayage, diagnostic : toutes marques, devis avant travaux.", 'href': '/atelier', 'cta': "Voir l'atelier"},
    {'id': 'carrosserie', 'title': 'Carrosserie', 'lead': "Rayures, bosses, pare-chocs et peinture, pour retrouver une voiture nette.", 'href': '/atelier#carrosserie', 'cta': 'Demander un devis'},
    {'id': 'vente', 'title': "Voitures d'occasion", 'lead': "Un petit stock de voitures contrôlées par notre atelier, avec leur historique.", 'href': '/vehicules', 'cta': 'Voir les occasions'},
    {'id': 'reprise', 'title': 'Reprise et rachat', 'lead': "Votre voiture estimée rapidement, reprise contre un achat ou rachetée.", 'href': '/vendre-ma-voiture', 'cta': 'Faire estimer'},
]

METHOD = ATELIER_STEPS

FAQ = [
    ("Comment prendre rendez-vous ?", "Appelez-nous au {phone}, écrivez sur WhatsApp ou remplissez le formulaire : nous vous proposons un créneau, du lundi au samedi."),
    ("Faites-vous un devis avant les travaux ?", "Oui, toujours. Vous recevez un devis détaillé, pièces et main d'œuvre, et rien n'est fait sans votre accord."),
    ("Intervenez-vous sur toutes les marques ?", "Oui, les voitures particulières et les petits utilitaires de toutes marques."),
    ("Peut-on essayer une voiture d'occasion ?", "Oui, sur rendez-vous. Dites-nous laquelle vous intéresse, nous convenons d'un créneau à Yvrac."),
    ("Reprenez-vous ma voiture actuelle ?", "Oui. Envoyez-nous sa description depuis la page Reprise : nous vous répondons avec une estimation, à déduire de votre achat ou en rachat direct."),
    ("Quelles garanties a-t-on en achetant une occasion chez vous ?", "Comme tout vendeur professionnel, nous sommes tenus de la garantie légale de conformité et de la garantie des vices cachés. Pour une voiture d'occasion, un défaut de conformité qui apparaît dans les douze mois suivant la livraison est présumé exister au jour de la vente."),
]

# page Vendre ma voiture : les trois formules (conditions à confirmer par M. Baghdad)
SELL_WAYS = [
    {'id': 'reprise', 'icon': 'swap', 'title': 'Reprise', 'accent': True,
     'lead': "Vous achetez une voiture chez nous : la valeur de la vôtre est déduite du prix.",
     'facts': [('Prix', 'Valeur de reprise déduite de votre achat'), ('Délai', 'Le jour où vous prenez votre nouvelle voiture'), ('Démarches', 'Aucune : nous faisons la déclaration de cession')],
     'for_who': "Pour changer de voiture en une seule fois, sans période sans véhicule."},
    {'id': 'rachat', 'icon': 'key', 'title': 'Rachat direct',
     'lead': "Nous achetons votre voiture, même si vous n'achetez rien chez nous.",
     'facts': [('Prix', 'Prix ferme, réglé par virement'), ('Délai', "Dès l'accord et la vérification des papiers"), ('Démarches', 'Aucune : nous faisons la déclaration de cession')],
     'for_who': "Pour vendre vite, sans annonce ni visite d'inconnus."},
    {'id': 'depot-vente', 'icon': 'doc', 'title': 'Dépôt-vente',
     'lead': "Nous vendons votre voiture pour vous, au juste prix du marché. Vous restez propriétaire jusqu'à la vente.",
     'facts': [('Prix', 'Prix de marché, moins notre commission convenue à l\'avance'), ('Délai', "Le temps de trouver le bon acheteur"), ('Démarches', 'Photos, annonces, appels, visites et essais par nos soins')],
     'for_who': "Pour obtenir le meilleur prix sans vous en occuper."},
]

SELL_DOCS = [
    ("Certificat d'immatriculation", "La carte grise à votre nom, que vous barrez et signez avec la mention « Vendu le », la date et l'heure."),
    ("Certificat de situation administrative", "Il atteste que la voiture n'est pas gagée. Il se télécharge gratuitement en ligne et doit dater de moins de quinze jours."),
    ("Contrôle technique", "De moins de six mois pour une voiture de plus de quatre ans vendue en dépôt-vente. Il n'est pas exigé pour une reprise ou un rachat par un professionnel."),
    ("Carnet et factures d'entretien", "Ils justifient l'historique de la voiture et pèsent dans l'estimation."),
    ("Doubles des clés", "Toutes les clés et cartes en votre possession."),
    ("Pièce d'identité", "Celle du titulaire de la carte grise, pour la déclaration de cession."),
]

SELL_FAQ = [
    ("Comment calculez-vous l'estimation ?", "Nous partons des prix réellement pratiqués pour le même modèle, la même année et un kilométrage proche, puis nous tenons compte de l'entretien, de l'état et des options. Nous vous expliquons chaque élément."),
    ("Faut-il venir pour une estimation ?", "Non. La description et quelques photos suffisent pour une première estimation. Le prix est confirmé après avoir vu la voiture, à Yvrac ou chez vous."),
    ("Ma voiture a un crédit en cours, puis-je la vendre ?", "Oui, à condition de solder le crédit au moment de la vente. Signalez-le dès votre demande : nous organisons la vente en conséquence."),
    ("Combien de temps dure un dépôt-vente ?", "Cela dépend du modèle et du prix demandé. Nous fixons ensemble un prix réaliste dès le départ et faisons le point régulièrement."),
]

SEARCH_STEPS = [
    ('Votre demande', "Le modèle ou le type de voiture, le budget, les options indispensables."),
    ('Notre recherche', "Nous cherchons auprès de notre réseau de professionnels, en écartant les voitures à l'historique douteux."),
    ('Le contrôle', "La voiture passe par notre atelier avant de vous être proposée."),
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
