"""Contenus du site BM33 Automobiles : seule source à modifier pour les textes, le stock, les prix et les coordonnées.
Règles de rédaction : ni tiret long ni tiret moyen, apostrophes droites (converties à la construction).
Tout ce qui doit être confirmé par M. Baghdad est listé dans A_VALIDER (stock d'exemple, services, coordonnées)."""

SITE = {
    'name': 'BM33',
    'brand': 'BM33 Automobiles',
    'legal_name': 'BM 33',
    'tagline': 'Négociant automobile',
    'baseline': "Véhicules d'occasion sélectionnés",
    'area': 'Yvrac, Bordeaux Métropole',
    'city': 'Yvrac',
    'zip': '33370',
    'region': 'Gironde',
    'phone': '07 84 95 20 67',
    'phone_e164': '+33784952067',
    'whatsapp': 'https://wa.me/33784952067',
    'email': 'baghdad.hakim@gmail.com',
    'hours': 'Du lundi au samedi, sur rendez-vous',
    'visit': "Essais et rendez-vous à Yvrac ou à votre domicile dans la métropole bordelaise",
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

# Stock d'exemple (démonstration) : photos libres de droits créditées dans les mentions légales.
# km : kilométrage ; ch : puissance ; prix TTC en euros.
VEHICLES = [
    {'slug': 'porsche-macan-2-0-pdk-2022', 'id': 'macan', 'status': 'nouveau', 'ref': 'BM-01', 'ct': 'Juillet 2026', 'keys': 2, 'owners': 1, 'points': ['Première main, entretien complet dans le réseau Porsche', 'Pack Sport Chrono et toit panoramique', 'Jantes 20 pouces, feux LED adaptatifs', 'Hayon électrique, caméra de recul'], 'make': 'Porsche', 'model': 'Macan', 'version': '2.0 PDK',
     'year': 2022, 'km': 41000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 265, 'doors': 5, 'seats': 5,
     'color': 'Blanc carrara', 'body': 'SUV', 'crit_air': 1, 'price': 59900, 'featured': True,
     'tagline': "Le SUV qui se conduit comme une sportive",
     'equipment': ['Pack Sport Chrono', 'Toit ouvrant panoramique', 'Sièges sport chauffants', 'Caméra de recul et radars',
                   'Apple CarPlay', 'Hayon électrique', 'Jantes 20 pouces', 'Feux LED avec PDLS'],
     'history': 'Première main, entretien complet dans le réseau Porsche'},
    {'slug': 'bmw-serie-1-120i-sport-2021', 'id': 'serie1', 'status': '', 'ref': 'BM-02', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 2, 'points': ['Finition Sport, sièges sport', 'GPS Live Cockpit et Apple CarPlay', "Carnet d'entretien à jour", 'Boîte automatique à double embrayage'], 'make': 'BMW', 'model': 'Série 1', 'version': '120i Sport',
     'year': 2021, 'km': 42000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 178, 'doors': 5, 'seats': 5,
     'color': 'Noir saphir', 'body': 'Compacte', 'crit_air': 1, 'price': 26900,
     'tagline': "La compacte premium, vive et bien équipée",
     'equipment': ['Sièges sport', 'GPS Live Cockpit', 'Apple CarPlay', 'Caméra de recul', 'Sièges sport',
                   'Régulateur de vitesse', 'Jantes 18 pouces', 'Éclairage d\'ambiance'],
     'history': 'Deuxième main, carnet d\'entretien à jour'},
    {'slug': 'audi-a3-sportback-35-tfsi-s-line-2024', 'id': 'a3', 'status': 'nouveau', 'ref': 'BM-03', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 1, 'points': ['Première main', 'Virtual Cockpit et MMI Navigation plus', 'Finition S line, phares LED', 'Hybride légère : consommation contenue'], 'make': 'Audi', 'model': 'A3 Sportback', 'version': '35 TFSI S line S tronic',
     'year': 2024, 'km': 19000, 'fuel': 'Essence hybride légère', 'gearbox': 'Automatique', 'power': 150, 'doors': 5, 'seats': 5,
     'color': 'Noir mythic', 'body': 'Compacte', 'crit_air': 1, 'price': 33900,
     'tagline': "Tout le raffinement Audi, en format compact",
     'equipment': ['Virtual Cockpit', 'MMI Navigation plus', 'Phares LED', 'Sièges S line', 'Climatisation bizone',
                   'Aide au stationnement', 'Jantes 18 pouces', 'Apple CarPlay et Android Auto'],
     'history': 'Première main, historique d\'entretien Audi'},
    {'slug': 'mercedes-classe-a-180-amg-line-2020', 'id': 'classe-a', 'status': '', 'ref': 'BM-04', 'ct': 'Août 2026', 'keys': 2, 'owners': 2, 'points': ['Ligne AMG intérieur et extérieur', 'MBUX double écran', "Sièges chauffants, éclairage d'ambiance", "Factures d'entretien fournies"], 'make': 'Mercedes-Benz', 'model': 'Classe A', 'version': '180 AMG Line 7G-DCT',
     'year': 2020, 'km': 51000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 136, 'doors': 5, 'seats': 5,
     'color': 'Gris montagne', 'body': 'Compacte', 'crit_air': 1, 'price': 24900,
     'tagline': "Le système MBUX et la ligne AMG",
     'equipment': ['Pack AMG Line', 'MBUX double écran', 'Caméra de recul', 'Sièges chauffants', 'Éclairage d\'ambiance 64 couleurs',
                   'Phares LED hautes performances', 'Jantes AMG 18 pouces'],
     'history': 'Deuxième main, factures d\'entretien fournies'},
    {'slug': 'volkswagen-golf-8-r-line-1-5-etsi-2021', 'id': 'golf', 'status': 'reserve', 'ref': 'BM-05', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 1, 'points': ['Première main, entretien Volkswagen', 'Hybridation légère, boîte DSG7', 'Finition R-Line, jantes 18 pouces', 'Phares IQ.Light LED'], 'make': 'Volkswagen', 'model': 'Golf 8', 'version': 'R-Line 1.5 eTSI DSG7',
     'year': 2021, 'km': 47000, 'fuel': 'Essence hybride légère', 'gearbox': 'Automatique', 'power': 150, 'doors': 5, 'seats': 5,
     'color': 'Gris Moonstone', 'body': 'Compacte', 'crit_air': 1, 'price': 26900,
     'tagline': "La compacte de référence, en finition R-Line",
     'equipment': ['Digital Cockpit Pro', 'Navigation Discover Pro', 'Sièges sport R-Line', 'Phares IQ.Light LED',
                   'Régulateur adaptatif', 'Jantes 18 pouces', 'Caméra de recul'],
     'history': 'Première main, entretien Volkswagen'},
    {'slug': 'peugeot-3008-bluehdi-130-gt-2021', 'id': '3008', 'status': '', 'ref': 'BM-06', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 1, 'points': ['Finition GT, i-Cockpit 3D', 'Hayon mains libres, Grip Control', 'Caméra de recul 180 degrés', 'Idéal pour la famille et les longs trajets'], 'make': 'Peugeot', 'model': '3008', 'version': '1.5 BlueHDi 130 EAT8 GT',
     'year': 2021, 'km': 61000, 'fuel': 'Diesel', 'gearbox': 'Automatique', 'power': 130, 'doors': 5, 'seats': 5,
     'color': 'Blanc nacré, toit noir', 'body': 'SUV', 'crit_air': 2, 'price': 23400,
     'tagline': "Le SUV familial, finition GT",
     'equipment': ['i-Cockpit 3D', 'Navigation connectée', 'Caméra de recul 180 degrés', 'Hayon mains libres',
                   'Sièges chauffants', 'Grip Control', 'Jantes 19 pouces'],
     'history': 'Première main, carnet à jour'},
    {'slug': 'mini-cooper-3-portes-2020', 'id': 'mini', 'status': '', 'ref': 'BM-07', 'ct': 'Septembre 2026', 'keys': 2, 'owners': 2, 'points': ['Toit et bandes de capot noirs', 'Navigation sur écran tactile', 'Sièges sport chauffants', 'Entretien Mini à jour'], 'make': 'Mini', 'model': 'Cooper', 'version': '3 portes Steptronic',
     'year': 2020, 'km': 39000, 'fuel': 'Essence', 'gearbox': 'Automatique', 'power': 136, 'doors': 3, 'seats': 4,
     'color': 'Rouge chili, toit noir', 'body': 'Citadine', 'crit_air': 1, 'price': 19900,
     'tagline': "Le plaisir de conduire, en version compacte",
     'equipment': ['Navigation', 'Sièges sport chauffants', 'Feux LED Union Jack', 'Bandes de capot',
                   'Toit et coques de rétroviseurs noirs', 'Régulateur de vitesse'],
     'history': 'Deuxième main, entretien Mini'},
    {'slug': 'range-rover-evoque-p200-r-dynamic-2020', 'id': 'evoque', 'status': '', 'ref': 'BM-08', 'ct': 'Juin 2026', 'keys': 2, 'owners': 2, 'points': ['Finition R-Dynamic SE', 'Toit panoramique, caméra 360 degrés', 'Sièges cuir chauffants', "Historique d'entretien complet"], 'make': 'Land Rover', 'model': 'Range Rover Evoque', 'version': 'P200 R-Dynamic SE',
     'year': 2020, 'km': 58000, 'fuel': 'Essence hybride légère', 'gearbox': 'Automatique', 'power': 200, 'doors': 5, 'seats': 5,
     'color': 'Gris Eiger', 'body': 'SUV', 'crit_air': 1, 'price': 31900,
     'tagline': "Le style Range Rover, en version urbaine",
     'equipment': ['Système Touch Pro Duo', 'Toit panoramique', 'Caméra 360 degrés', 'Sièges cuir chauffants',
                   'Hayon électrique', 'Rétroviseur intérieur ClearSight', 'Jantes 20 pouces'],
     'history': 'Deuxième main, historique complet'},
    {'slug': 'renault-clio-5-tce-90-intens-2022', 'id': 'clio', 'status': '', 'ref': 'BM-09', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 1, 'points': ['Première main, 24 000 km', "Extension de garantie constructeur jusqu'en 2027", 'Écran 9,3 pouces avec GPS', 'Idéale pour un jeune conducteur'], 'make': 'Renault', 'model': 'Clio V', 'version': 'TCe 90 Intens',
     'year': 2022, 'km': 24000, 'fuel': 'Essence', 'gearbox': 'Manuelle', 'power': 91, 'doors': 5, 'seats': 5,
     'color': 'Bleu Iron', 'body': 'Citadine', 'crit_air': 1, 'price': 15900,
     'tagline': "La citadine idéale pour un premier achat",
     'equipment': ['Écran tactile 9,3 pouces avec GPS', 'Apple CarPlay', 'Caméra de recul', 'Climatisation automatique',
                   'Carte mains libres', 'Jantes 16 pouces'],
     'history': 'Première main, carnet Renault à jour'},
    {'slug': 'tesla-model-3-propulsion-2022', 'id': 'model3', 'status': 'vendu', 'ref': 'BM-10', 'ct': 'Non requis (moins de 4 ans)', 'keys': 2, 'owners': 1, 'points': ["491 km d'autonomie (WLTP)", 'Autopilot de série', 'Batterie sous garantie constructeur', 'Sièges chauffants avant et arrière'], 'make': 'Tesla', 'model': 'Model 3', 'version': 'Propulsion',
     'year': 2022, 'km': 45000, 'fuel': 'Électrique', 'gearbox': 'Automatique', 'power': 283, 'doors': 4, 'seats': 5,
     'color': 'Bleu nuit métallisé', 'body': 'Berline', 'crit_air': 0, 'price': 27900, 'range': 491,
     'tagline': "100 % électrique, 491 km d'autonomie (cycle WLTP)",
     'equipment': ['Autopilot', 'Écran central 15 pouces', 'Toit en verre', 'Sièges chauffants avant et arrière',
                   'Accès par téléphone', 'Mises à jour à distance'],
     'history': 'Première main, batterie sous garantie constructeur'},
]

# « L'histoire de cette voiture » (fiche) : deux paragraphes par véhicule, sans rien qui dépende du statut (vendu, réservé)
STORIES = {
    'macan': ["Une première main suivie de bout en bout dans le réseau Porsche : chaque révision est tamponnée et facturée. Le moteur 2.0 turbo de 265 ch et la boîte PDK lui donnent la vivacité d'une sportive, avec le confort d'un SUV au quotidien.",
              "Le pack Sport Chrono, le toit panoramique et les jantes de 20 pouces en font une configuration recherchée. Une voiture qui se juge à l'essai : nous vous la présentons sur rendez-vous."],
    'serie1': ["Deux propriétaires, un carnet d'entretien suivi et la finition Sport : sièges sport, volant gainé de cuir et inserts noir brillant.",
               "Le 120i de 178 ch associé à la boîte automatique en fait une compacte vive en ville comme sur autoroute, bien équipée avec le Live Cockpit et Apple CarPlay."],
    'a3': ["Une première main entretenue chez Audi, en finition S line avec phares LED et Virtual Cockpit. Le moteur de 150 ch, épaulé par une hybridation légère, garde une consommation raisonnable.",
           "Habitacle soigné, boîte S tronic douce et équipement complet : une compacte premium qui se prête aussi bien aux trajets quotidiens qu'aux longues distances."],
    'classe-a': ["Deuxième main, factures d'entretien à l'appui. La ligne AMG lui donne un style affirmé, à l'extérieur comme dans l'habitacle avec ses sièges sport et son éclairage d'ambiance.",
                 "Le système MBUX à double écran et la boîte 7G-DCT rendent la conduite simple et agréable. Une compacte élégante, parfaitement à l'aise en ville."],
    'golf': ["Une première main entretenue dans le réseau Volkswagen. La finition R-Line lui donne une allure sportive : boucliers spécifiques, sièges sport et jantes de 18 pouces.",
             "Le 1.5 eTSI de 150 ch, épaulé par une hybridation légère, et la boîte DSG7 forment un duo souple et sobre. Phares IQ.Light et Digital Cockpit Pro complètent une compacte agréable tous les jours."],
    '3008': ["Une première main au carnet à jour, en finition GT. L'i-Cockpit 3D, le hayon mains libres et la caméra 180 degrés facilitent la vie au quotidien.",
             "Le 1.5 BlueHDi de 130 ch et la boîte EAT8 forment un duo sobre et souple, idéal pour la famille et les longs trajets. Le Grip Control améliore la motricité sur les routes glissantes."],
    'mini': ["Deuxième main, entretien Mini à jour. Toit noir, bandes de capot et feux Union Jack : elle a du caractère, et les 136 ch de la Cooper suffisent largement pour se faire plaisir.",
             "Sièges sport chauffants, navigation et finition soignée : une citadine premium, à l'aise en ville comme pour les escapades du week-end."],
    'evoque': ["Deuxième main, historique d'entretien complet. La finition R-Dynamic SE réunit toit panoramique, caméra 360 degrés et sièges cuir chauffants.",
               "Le P200 à hybridation légère et la boîte automatique offrent une conduite douce et silencieuse. Le style Range Rover, dans un format adapté à la ville."],
    'clio': ["Une première main de 24 000 km, au carnet Renault à jour. Le TCe 90 est vif et économique, la boîte manuelle précise.",
             "Écran de 9,3 pouces avec GPS, caméra de recul et carte mains libres : l'équipement d'une catégorie supérieure, idéal pour un premier achat ou un jeune conducteur."],
    'model3': ["Une première main, batterie sous garantie constructeur. Avec 491 km d'autonomie (cycle WLTP), elle couvre sans effort les trajets quotidiens comme les week-ends.",
               "Autopilot, toit en verre et mises à jour à distance : une électrique qui reste moderne, et des coûts d'usage réduits au minimum."],
}

# arrivages annoncés : silhouette et bouton « Être prévenu »
SOON = [
    {'make': 'Audi', 'model': 'Q5 Sportback', 'version': '40 TDI quattro S line', 'year': 2022, 'body': 'suv', 'when': 'Arrivage prévu en novembre'},
    {'make': 'BMW', 'model': 'Série 3 Touring', 'version': '320d M Sport', 'year': 2021, 'body': 'break', 'when': 'Arrivage prévu en novembre'},
]

# ce qui accompagne chaque vente : uniquement des services (à confirmer par M. Baghdad). Les obligations légales
# (garanties, contrôle technique) ne sont jamais présentées comme un avantage : elles figurent dans LEGAL_NOTE.
INCLUDED = [
    ('Révision avant livraison', "Vidange, filtres et points de sécurité vérifiés avant de vous remettre les clés."),
    ('Préparation soignée', "Nettoyage complet, intérieur et extérieur : la voiture vous est remise comme elle doit l'être."),
    ('Carte grise faite pour vous', "Nous nous occupons de l'immatriculation à votre nom, sans démarche de votre part."),
    ('Livraison possible', "Remise des clés à Yvrac, ou livraison chez vous dans la métropole bordelaise et en Gironde."),
]

LEGAL_NOTE = ("Comme tout vendeur professionnel, nous sommes tenus de la garantie légale de conformité (articles L217-3 et suivants "
              "du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil). Pour une "
              "voiture d'occasion, un défaut de conformité qui apparaît dans les douze mois suivant la livraison est présumé exister "
              "au jour de la vente. Les voitures de plus de quatre ans sont vendues avec un contrôle technique de moins de six mois.")

SERVICES = [
    {'id': 'vente', 'title': 'Achat', 'lead': "Des voitures choisies une à une, présentées sans détour : historique, entretien, défauts éventuels.", 'href': '/vehicules', 'cta': 'Voir le stock'},
    {'id': 'reprise', 'title': 'Reprise et rachat', 'lead': "Votre véhicule estimé rapidement, déduit de votre achat ou racheté au comptant.", 'href': '/vendre-ma-voiture', 'cta': 'Faire estimer'},
    {'id': 'recherche', 'title': 'Recherche sur mesure', 'lead': "Un modèle précis, un budget, des options : nous le trouvons et le contrôlons pour vous.", 'href': '/recherche', 'cta': 'Lancer une recherche'},
    {'id': 'depot', 'title': 'Dépôt-vente', 'lead': "Nous vendons votre voiture pour vous : photos, annonces, visites et démarches.", 'href': '/vendre-ma-voiture#depot-vente', 'cta': 'Confier ma voiture'},
]

METHOD = [
    ('Sélection', "Nous n'achetons que des voitures dont nous connaissons l'histoire : entretien suivi, kilométrage cohérent, pas d'accident grave."),
    ('Contrôle', "Chaque véhicule passe en atelier : points de sécurité, diagnostic électronique, essai routier."),
    ('Transparence', "Photos détaillées, défauts signalés, factures d'entretien consultables avant même de vous déplacer."),
    ('Livraison', "Carte grise, révision et préparation faites : vous repartez l'esprit tranquille."),
]

FAQ = [
    ("Peut-on voir et essayer une voiture ?", "Oui, sur rendez-vous, du lundi au samedi. Appelez-nous au {phone} ou écrivez-nous sur WhatsApp : nous convenons d'un créneau à Yvrac ou près de chez vous."),
    ("Reprenez-vous mon véhicule actuel ?", "Oui. Envoyez-nous les informations de votre voiture depuis la page Vendre ma voiture : nous vous répondons avec une estimation, à déduire de votre achat ou en rachat direct."),
    ("Quelles garanties a-t-on en achetant chez vous ?", "Comme tout vendeur professionnel, nous sommes tenus de la garantie légale de conformité et de la garantie des vices cachés. Pour une voiture d'occasion, un défaut de conformité qui apparaît dans les douze mois suivant la livraison est présumé exister au jour de la vente. Une extension de garantie peut être proposée selon le véhicule."),
    ("Proposez-vous un financement ?", "Nous pouvons vous orienter vers des solutions de financement. Parlons-en lors de votre appel. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager."),
    ("Vous occupez-vous de la carte grise ?", "Oui, nous faisons l'immatriculation à votre nom : vous n'avez aucune démarche à faire."),
    ("Livrez-vous ?", "Oui, dans la métropole bordelaise et en Gironde. Au-delà, nous en parlons ensemble."),
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
    ('Votre cahier des charges', "Un échange de quelques minutes : usage, budget, modèles envisagés, options indispensables et délai."),
    ('La recherche', "Nous cherchons auprès de notre réseau de professionnels et sur le marché, en écartant les voitures à l'historique douteux."),
    ('Le contrôle et la proposition', "Historique, entretien et état vérifiés. Vous recevez photos et explications avant de décider."),
    ('La livraison', "Révision, préparation et carte grise : vous récupérez votre voiture prête à rouler."),
]
SEARCH_BUDGETS = ['Moins de 15 000 €', '15 000 à 20 000 €', '20 000 à 30 000 €', '30 000 à 40 000 €', '40 000 à 60 000 €', 'Plus de 60 000 €']

NAV = [
    {'href': '/vehicules', 'label': 'Véhicules'},
    {'href': '/vendre-ma-voiture', 'label': 'Vendre ma voiture'},
    {'href': '/recherche', 'label': 'Recherche sur mesure'},
    {'href': '/contact', 'label': 'Contact'},
]

# pages fixes ; les fiches véhicules sont ajoutées par build.py (une par entrée de VEHICLES)
PAGES = {
    'index': {'template': 'index.html', 'file': 'index.html', 'path': '/',
              'title': "BM33 Automobiles | Voitures d'occasion sélectionnées à Bordeaux",
              'description': "Négociant automobile à Yvrac, près de Bordeaux : voitures d'occasion sélectionnées et contrôlées, reprise, recherche sur mesure, dépôt-vente. Essai sur rendez-vous."},
    'vehicules': {'template': 'vehicules.html', 'file': 'vehicules.html', 'path': '/vehicules', 'crumb': 'Véhicules',
                  'title': "Voitures d'occasion à vendre près de Bordeaux | BM33 Automobiles",
                  'description': "Voitures d'occasion contrôlées : Porsche, BMW, Audi, Mercedes, Volkswagen, Peugeot. Filtrez par carrosserie, énergie et budget. Essai sur rendez-vous à Yvrac."},
    'vendre': {'template': 'vendre.html', 'file': 'vendre-ma-voiture.html', 'path': '/vendre-ma-voiture', 'crumb': 'Vendre ma voiture',
                'title': "Reprise et dépôt-vente de votre voiture à Bordeaux | BM33 Automobiles",
                'description': "Faites estimer votre voiture : reprise déduite de votre achat, rachat direct ou dépôt-vente. Réponse rapide, démarches prises en charge, Bordeaux et Gironde."},
    'recherche': {'template': 'recherche.html', 'file': 'recherche.html', 'path': '/recherche', 'crumb': 'Recherche sur mesure',
                  'title': "Recherche de voiture d'occasion sur mesure | BM33 Automobiles",
                  'description': "Un modèle précis en tête ? Donnez-nous votre budget et vos critères : nous trouvons, contrôlons et livrons la voiture qu'il vous faut, à Bordeaux et en Gironde."},
    'contact': {'template': 'contact.html', 'file': 'contact.html', 'path': '/contact', 'crumb': 'Contact',
                'title': "Contact et rendez-vous | BM33 Automobiles, Yvrac",
                'description': "Appelez-nous, écrivez sur WhatsApp ou prenez rendez-vous pour un essai : BM33 Automobiles, négociant à Yvrac, Bordeaux Métropole. Réponses aux questions fréquentes."},
    'mentions': {'template': 'mentions.html', 'file': 'mentions-legales.html', 'path': '/mentions-legales', 'crumb': 'Mentions légales',
                 'title': "Mentions légales | BM33 Automobiles",
                 'description': "Mentions légales du site BM33 Automobiles : éditeur, hébergeur, crédits photos et données personnelles.", 'sitemap': True},
    '404': {'template': '404.html', 'file': '404.html', 'path': '/404', 'crumb': 'Page introuvable',
            'title': "Page introuvable | BM33 Automobiles",
            'description': "Cette page n'existe pas ou plus. Retrouvez nos véhicules d'occasion sélectionnés.", 'sitemap': False},
}

A_VALIDER = [
    "Nom commercial « BM33 Automobiles », logo et couleurs",
    "Stock réel, photos, prix et kilométrages (le site montre un stock d'exemple, photos libres de droits)",
    "Services réellement proposés : contrôle technique, révision, carte grise, livraison, financement, extension de garantie, dépôt-vente",
    "Lieu de rendez-vous et horaires (le siège est une domiciliation : le site indique « sur rendez-vous »)",
    "Téléphone, e-mail et WhatsApp à afficher",
    "Activité d'atelier (mécanique, carrosserie) à mettre en avant ou non",
    "Nom de domaine (proposition : bm33-automobiles.fr)",
    "Conditions de la reprise, du rachat, du dépôt-vente (commission) et de la recherche sur mesure",
    "Financement : à n'évoquer que si BM 33 est inscrit à l'ORIAS comme intermédiaire en opérations de banque (sinon retirer la question)",
    "Médiateur de la consommation (obligatoire pour vendre aux particuliers ; par exemple Mobilians Médiation)",
]
