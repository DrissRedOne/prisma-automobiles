# Contenus du site de l'Héliciculture du Garnoutey : seule source à modifier pour les textes, les produits,
# les recettes et les coordonnées. Règles de rédaction : phrases courtes et simples, ni tiret long ni tiret moyen.
# Tout ce qui reste à confirmer par l'éleveur est listé dans A_VALIDER (en bas de ce fichier).
# Confirmé par Joël le 16/10/2026 : variété gros-gris, escargots vendus déjà jeûnés, vente d'octobre à décembre.
# Nom de domaine : heliciculture.fr (16/10/2026).
# Référencement (17/10/2026) : un mot-clé par page, choisi d'après les suggestions réelles de Google
# (relevé du 17/10/2026, sans volume connu). Mots-clés : accueil « producteur d'escargots en Gironde »,
# l'élevage « élevage d'escargots », nos escargots « escargots vivants à vendre », préparer « préparer des
# escargots vivants », calculateur « combien d'escargots par personne », une page par recette.
# Mise en forme dans les textes : *mot* = italique (titres), [texte](/adresse) = lien interne.

SITE = {
    'name': 'Héliciculture du Garnoutey',
    'short': 'Garnoutey',
    'tagline': 'Escargots élevés sous serre, en Gironde',
    'zip': '33240',
    'city': "Lugon-et-l'Île-du-Carnay",
    'area': "entre Libourne et Saint-André-de-Cubzac",
    'phone': '06 62 49 83 14',
    'phone_e164': '+33662498314',
    'email': 'locterra33@gmail.com',
    'hours': 'Sur rendez-vous',
    'founder': 'Joël David',
    # l'adresse exacte de la ferme n'est donnée qu'au rendez-vous (demande de Joël : peur des vols)
    'pickup': 'L’adresse exacte vous est donnée quand nous fixons le rendez-vous.',
    # ouvert à Google le 17/10/2026 (balise robots, en-têtes, plan du site dans robots.txt)
    'indexable': True,
    # adresse de la fiche Google Business Profile, à ajouter dès qu'elle existe (données structurées « sameAs »)
    'profiles': [],
}

# temps de route jusqu'à Lugon-et-l'Île-du-Carnay, de centre à centre (calcul OpenStreetMap du 17/10/2026,
# arrondi au-dessus, hors bouchons) : pour les recherches par ville, sans créer une page par ville
TRAVEL = [
    ('Saint-André-de-Cubzac', '10 km', 'environ 15 min'),
    ('Libourne', '13 km', 'environ 20 min'),
    ('Bordeaux', '32 km', 'environ 35 min'),
    ('Blaye', '35 km', 'environ 40 min'),
]

NAV = [
    {'label': 'Accueil', 'href': '/', 'photo': 'nuit'},
    {'label': "L'élevage", 'href': '/l-elevage', 'photo': 'tunnel'},
    {'label': 'Nos escargots', 'href': '/nos-escargots', 'photo': 'macro'},
    {'label': 'Recettes', 'href': '/recettes', 'photo': 'cassolette'},
    {'label': 'Contact', 'href': '/contact', 'photo': 'auge'},
]
# liens du pied de page en plus du menu
GUIDES = [
    {'label': 'Préparer des escargots vivants', 'href': '/preparer-des-escargots-vivants'},
    {'label': "Combien d'escargots par personne", 'href': '/combien-d-escargots-par-personne'},
]

LEGAL = {
    'company': 'HELICICULTURE DU GARNOUTEY',
    'form': 'société par actions simplifiée unipersonnelle (SASU) au capital de 100 €',
    # seul endroit du site avec l'adresse exacte : obligatoire dans les mentions légales (siège social, LCEN art. 6 III).
    # Pour la retirer aussi, il faut transférer le siège (domiciliation). La page n'est pas indexée (noindex).
    'seat': "9 bis rue Florence Arthaud, 33240 Lugon-et-l'Île-du-Carnay",
    'rcs': 'RCS Libourne 988 979 480',
    'siret': '988 979 480 00015',
    'ape': '01.50Z',
    'vat': 'FR34 988 979 480',
    'director': 'Joël David, président',
    'host': 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com)',
    'maker': 'Groupe Amane Conseils, Yvrac (Gironde)',
    # à remplacer par les coordonnées du médiateur choisi par l'éleveur
    'mediator': "Les coordonnées du médiateur retenu seront indiquées ici.",
}

# ------------------------------------------------------------------ accueil
HOME = {
    'eyebrow': 'Élevés sous serre, près de Libourne',
    'title_a': 'Producteur',
    'title_em': "d'escargots",
    'title_b': 'en Gironde.',
    'lead': "Nos gros-gris grandissent sous serre à Lugon-et-l'Île-du-Carnay, près de Libourne. Vendus vivants et déjà jeûnés, d'octobre à décembre, à la ferme sur rendez-vous.",
    'manifesto_title': 'Notre façon de faire',
    'products_title': 'Escargots vivants, *à emporter à la ferme*',
    'products_intro': "À la douzaine ou au kilo, pour les particuliers comme pour les professionnels. Vous ne savez pas combien en prendre ? [Le calculateur d'escargots par personne](/combien-d-escargots-par-personne) vous le dit.",
    'badge': 'Élevage sous serre · Gironde · Gros-gris · ',
    'manifesto': "Ici, on ne force rien. L'escargot sort la nuit, quand l'air est humide. Le jour, il se repose sous ses planches de bois, à l'abri du soleil. Notre métier, c'est de lui laisser le temps.",
    'pillars': [
        {'num': 'I', 'title': 'Sous serre', 'text': "Des serres tunnels couvertes de filets d'ombrage : à l'abri du plein soleil, du vent et des prédateurs."},
        {'num': 'II', 'title': 'Nourris simplement', 'text': "Des plantes semées dans les serres et un complément de céréales. Rien d'autre."},
        {'num': 'III', 'title': 'Ramassés à la main', 'text': "Nous ramassons nos escargots à la main, une fois adultes."},
    ],
    'farm_intro': "Nos escargots vivent dans nos serres, à Lugon-et-l'Île-du-Carnay, entre Libourne et Saint-André-de-Cubzac. Voici leurs journées, et surtout leurs nuits. Découvrez [notre élevage d'escargots](/l-elevage).",
    'gallery': [
        {'photo': 'allee', 'caption': 'Les allées, sous les filets'},
        {'photo': 'auge', 'caption': "Au bord de l'auge", 'video': True},
        {'photo': 'repos', 'caption': 'Le repos, sur les planches'},
        {'photo': 'detail', 'caption': 'Les plus jeunes'},
    ],
}

# le cycle de l'année (accueil et page « L'élevage »)
CYCLE = [
    {'num': 'I', 'season': 'Printemps', 'title': 'Les jeunes arrivent dans les serres',
     'text': "Quand les nuits redeviennent douces, les jeunes escargots rejoignent les serres. L'herbe et les plantes semées les attendent.",
     'photo': 'tige'},
    {'num': 'II', 'season': 'Été', 'title': 'Ils grandissent, la nuit',
     'text': "Le jour, ils se reposent sous les planches, à l'ombre des filets. La nuit, ils sortent manger. Nous veillons à l'humidité et à la propreté des serres.",
     'photo': 'planches'},
    {'num': 'III', 'season': "Fin de l'été", 'title': 'Le ramassage, à la main',
     'text': "Quand le bord de la coquille s'épaissit, l'escargot est adulte. C'est le signe qu'on attend pour le ramasser.",
     'photo': 'coquille'},
    {'num': 'IV', 'season': 'Octobre à décembre', 'title': "L'heure de la table",
     'text': "C'est la saison de la vente, jusqu'aux fêtes. Déjà jeûnés, nos [escargots vivants](/nos-escargots) vous attendent à la ferme, pour la maison comme pour le restaurant.",
     'photo': 'plat-sombre'},
]

# ------------------------------------------------------------------ l'élevage
ELEVAGE = {
    'lead': "Un élevage d'escargots à taille humaine, à Lugon-et-l'Île-du-Carnay, entre Libourne et Saint-André-de-Cubzac. Joël David, héliciculteur, y élève ses gros-gris sous serre. Des gestes simples, et beaucoup de patience.",
    'blocks': [
        {'title': 'Des serres sous filets', 'photo': 'tunnel',
         'text': ["Nos escargots vivent dans des serres tunnels, couvertes de filets d'ombrage. Ils y sont à l'abri du plein soleil, du vent et des prédateurs.",
                  "À l'intérieur, des clôtures fines délimitent les parcs et gardent chaque escargot à sa place."]},
        {'title': 'Des planches pour se reposer', 'photo': 'repos',
         'text': ["Dans chaque serre, des planches en bois sont dressées au-dessus de l'herbe. Le jour, les escargots s'y abritent, serrés les uns contre les autres.",
                  "C'est là qu'on les voit le mieux, au petit matin, avant qu'ils ne se cachent."]},
        {'title': 'Une nourriture simple', 'photo': 'auge',
         'text': ["Ils mangent les plantes semées au sol des serres, et un complément de céréales servi dans des auges.",
                  "Une alimentation simple et régulière, pour une chair fine. Vous pourrez la goûter dans nos [recettes d'escargots](/recettes)."]},
    ],
    'species': [
        "Nous élevons le gros-gris, _Helix aspersa maxima_. C'est la grande forme du petit-gris : plus gros et plus charnu. Il est vendu vivant et déjà jeûné, d'octobre à décembre : voir [nos escargots vivants](/nos-escargots).",
        "On reconnaît un escargot adulte au bord de sa coquille : il s'épaissit et se retourne, comme un ourlet. C'est le moment de le ramasser.",
    ],
    'promise_title': 'Ce que nous ne faisons pas',
    'promise': [
        "Nous ne pressons pas la croissance.",
        "Nous ne ramassons pas un escargot qui n'est pas adulte.",
        "Nous ne vendons pas d'escargots d'ailleurs sous notre nom.",
    ],
    'visit': "Commandez-les pour la saison, d'octobre à décembre. Vous voulez voir les serres ? La visite se fait sur rendez-vous, quand vous venez chercher vos escargots. [Appelez-nous ou écrivez-nous](/contact).",
}

# ------------------------------------------------------------------ nos escargots
# Nous vendons nos escargots vivants (pas de produits cuisinés : il faudrait des démarches sanitaires en plus).
PRODUCTS = [
    {'key': 'particuliers', 'name': 'Pour les particuliers', 'photo': 'macro', 'cta': 'Commander',
     'text': "Des gros-gris à la douzaine ou au kilo, à emporter à la ferme sur rendez-vous. Ils sont simples à [préparer](/preparer-des-escargots-vivants), et [le calculateur](/combien-d-escargots-par-personne) vous dit combien en prendre.",
     'tags': ['Déjà jeûnés', 'À emporter', 'Sur rendez-vous']},
    {'key': 'restaurants', 'name': 'Pour les restaurants et les traiteurs', 'photo': 'plat-assiette', 'cta': 'Demander un devis',
     'text': "Vous cherchez un fournisseur d'escargots vivants en Gironde ? Des gros-gris en direct de l'éleveur, pendant la saison. Vous les préparez à votre façon. Quantités et prix sur devis.",
     'tags': ['Déjà jeûnés', 'En direct', 'Au kilo']},
    {'key': 'revendeurs', 'name': 'Pour les revendeurs et les conserveurs', 'photo': 'auge', 'cta': 'Demander un devis',
     'text': "Épiceries fines, marchés, conserveries : nos gros-gris vivants au kilo, en direct de l'élevage, selon nos quantités de la saison. Prix sur devis.",
     'tags': ['Au kilo', 'En direct', 'Octobre à décembre']},
]
ORDER_STEPS = [
    {'title': 'Appelez-nous ou écrivez-nous', 'text': "Dites-nous combien d'escargots il vous faut, et pour quand. La vente a lieu d'octobre à décembre."},
    {'title': 'Nous fixons le jour ensemble', 'text': 'Nous confirmons la commande, le prix et le jour.'},
    {'title': 'Vous passez à la ferme', 'text': "Vous venez les chercher à la ferme, le jour convenu."},
]
FAQ = [
    ('Vendez-vous des escargots cuisinés ?',
     "Non : nous vendons nos escargots vivants, déjà jeûnés. Pas d'inquiétude, les préparer est simple : tout est expliqué dans notre guide pour [préparer des escargots vivants](/preparer-des-escargots-vivants)."),
    ('Quand vendez-vous vos escargots ?',
     "D'octobre à décembre. Le reste de l'année, ils grandissent dans nos serres."),
    ('Faut-il les faire jeûner ?',
     "Non : nos escargots sont vendus déjà jeûnés. Vous commencez directement par le lavage, puis vous suivez la méthode."),
    ("Vous êtes restaurateur ou revendeur ?",
     "[Appelez-nous](/contact) : nous vous fournissons au kilo, d'octobre à décembre, selon nos quantités. Prix sur devis."),
    ("Combien d'escargots prévoir par personne ?",
     "En entrée, comptez 6 escargots par personne, ou une douzaine pour les amateurs. En plat, comptez deux douzaines. Pour un compte précis, utilisez [le calculateur d'escargots par personne](/combien-d-escargots-par-personne)."),
    ('Quand commander pour les fêtes ?',
     "Le plus tôt possible : la vente a lieu d'octobre à décembre et les quantités sont limitées. Réservez dès octobre."),
    ('Quelle variété élevez-vous ?',
     "Le gros-gris (_Helix aspersa maxima_). C'est la grande forme du petit-gris : plus gros et plus charnu. Découvrez [notre élevage](/l-elevage)."),
    ('Peut-on visiter l’élevage ?',
     "Oui, sur rendez-vous, quand vous venez chercher vos escargots. Appelez-nous pour fixer le jour : nous vous donnons alors l'adresse."),
    ('Vos escargots viennent-ils d’ici ?',
     "Oui : ils grandissent dans nos serres, à Lugon-et-l'Île-du-Carnay, en Gironde."),
]
SEASON = {
    'marquee': "D'octobre à décembre · Noël · Nouvel An · ",
    'title': 'Pour les fêtes, pensez à réserver.',
    'title_shop': 'Escargots pour Noël et le Nouvel An',
    'text': "Nos escargots sont en vente d'octobre à décembre. Pour Noël et le Nouvel An, réservez tôt : les quantités sont limitées.",
}
PICKUP = {
    'title': 'Venir chercher *vos escargots*',
    'text': "L'élevage est à Lugon-et-l'Île-du-Carnay, dans le Fronsadais, entre Libourne et Saint-André-de-Cubzac. Vous venez chercher vos escargots à la ferme, sur rendez-vous. L'adresse exacte vous est donnée quand nous fixons le jour.",
    'note': 'Temps de route indicatifs, depuis le centre de chaque ville, hors bouchons.',
}

# ------------------------------------------------------------------ préparer des escargots vivants (guide)
PREPARATION = {
    'key': 'preparer', 'name': 'Préparer des escargots vivants', 'photo': 'nocturne',
    'intro': "Nos escargots sont vendus vivants et déjà jeûnés : le plus long est fait. Voici la méthode classique pour les préparer avant de les cuisiner. Comptez une demi-journée, cuisson comprise.",
    'meta': [('clock', 'Jeûne : déjà fait'), ('flame', 'Cuisson : 1 h 30 à 2 h'), ('knife', 'Facile')],
    'needs': ['Les escargots vivants, déjà jeûnés (ici, 4 douzaines)', 'Gros sel et vinaigre (facultatif)',
              '1 litre de vin blanc sec', '1 carotte, 1 oignon, 1 bouquet garni', 'Sel, poivre'],
    'steps': [
        ('Le jeûne, déjà fait', "Nos escargots ont jeûné à la ferme : ils se sont vidés. Vous n'avez rien à faire, passez directement au lavage."),
        ('Le lavage', "Rincez-les plusieurs fois à l'eau claire : ils sortent de leur coquille. Jetez ceux qui sentent mauvais, ceux qui ne réagissent pas quand on touche leur chair, et ceux dont la coquille est cassée."),
        ('Le dégorgement (facultatif)', "Couvrez-les de gros sel et d'un filet de vinaigre pendant 2 heures, puis rincez-les longuement."),
        ('Le blanchiment', "Plongez-les 5 minutes dans une grande casserole d'eau bouillante, puis égouttez-les."),
        ('Le décoquillage', "Sortez chaque escargot de sa coquille avec une petite fourchette. Retirez le petit bout noir, le tortillon, si vous le souhaitez."),
        ('La cuisson', "Faites-les cuire 1 h 30 à 2 h à petits frémissements, dans un court-bouillon : moitié vin blanc, moitié eau, la carotte, l'oignon, le bouquet garni, du sel et du poivre."),
        ('Le repos', "Laissez-les refroidir dans le bouillon. Ils sont prêts pour nos recettes. Gardez-les au réfrigérateur, dans leur bouillon, et cuisinez-les vite. Sinon, congelez-les."),
        ('Les coquilles', "Pour les garder, faites-les bouillir 20 minutes dans de l'eau avec un peu de bicarbonate, puis laissez-les sécher."),
    ],
    'why_title': 'Pourquoi des escargots *déjà jeûnés* ?',
    'why': [
        "Un escargot ramassé a encore dans son corps ce qu'il a mangé. Le jeûne le vide : c'est ce qui rend sa chair propre et nette en goût.",
        "À la maison, il faut le faire soi-même, dans une caisse aérée, pendant plusieurs jours. Avec nos escargots, c'est déjà fait à la ferme : vous gagnez ces jours-là, et vous commencez directement par le lavage.",
    ],
    'keep_title': 'Entre la ferme *et la cuisine*',
    'keep': [
        "Gardez vos escargots dans un filet ou une caisse aérée, au frais et à l'abri du soleil. Ne les enfermez jamais dans une boîte fermée : ils ont besoin d'air.",
        "Préparez-les vite après le retrait. Le plus simple : [fixer le jour du retrait](/contact) selon le jour où vous les cuisinez. Nous vous donnons nos conseils à la ferme.",
    ],
    'mistakes_title': 'Les erreurs *à éviter*',
    'mistakes': [
        ('Garder un escargot douteux', "Un escargot qui sent mauvais, qui ne réagit pas au toucher ou dont la coquille est cassée va à la poubelle. Pas à la casserole."),
        ('Rincer trop vite', "Après le dégorgement, le sel et la mousse doivent partir. Rincez jusqu'à ce que l'eau reste claire."),
        ('Écourter la cuisson', "Le gros-gris est charnu : il lui faut 1 h 30 à 2 h de court-bouillon pour être tendre. À gros bouillons, il durcit : restez à petits frémissements."),
        ('Égoutter tout de suite', "Laissez-les refroidir dans leur bouillon : ils restent moelleux et prennent le goût du court-bouillon."),
    ],
    'next': "Vos escargots sont prêts ? Choisissez une recette : [à la bordelaise](/recettes/escargots-a-la-bordelaise), [au beurre persillé](/recettes/escargots-au-beurre-persille) ou [en cassolettes](/recettes/cassolettes-d-escargots-a-la-creme-d-ail).",
}

# ------------------------------------------------------------------ combien d'escargots par personne (calculateur)
CALC = {
    'servings': [
        {'key': 'entree', 'label': 'En entrée', 'per': 6, 'hint': '6 par personne'},
        {'key': 'gourmand', 'label': 'En entrée gourmande', 'per': 12, 'hint': '12 par personne, une douzaine'},
        {'key': 'plat', 'label': 'En plat', 'per': 24, 'hint': '24 par personne, deux douzaines'},
    ],
    # nombre moyen de gros-gris au kilo : fourchette relevée chez d'autres éleveurs (45 à 65 selon la taille).
    # À remplacer par la pesée de Joël dès qu'il la donne (A_VALIDER).
    'per_kg': 50, 'per_kg_range': '45 à 65',
    # beurre persillé : 250 g pour 48 escargots dans notre recette, soit environ 5 g par escargot
    'butter_per_snail': 250 / 48,
    'guests_table': [2, 4, 6, 8, 10, 12],
    'intro': "Indiquez le nombre de personnes et la façon de les servir : le calculateur vous donne le nombre d'escargots, en douzaines et en kilos de gros-gris vivants.",
    'kg_note': "Les kilos sont une estimation : selon leur taille, on compte de {range} gros-gris vivants au kilo. Nous vous confirmons la quantité quand nous fixons le rendez-vous.",
    'tips': [
        "Pour un apéritif, quelques escargots par personne suffisent. Servez-les en bouchées ou en cassolettes.",
        "Un plat d'escargots, comme les [escargots à la bordelaise](/recettes/escargots-a-la-bordelaise), se sert avec du pain : prévoyez plus de pain que d'habitude, pour saucer.",
        "[Commandez](/contact) une douzaine de plus si vous avez des amateurs à table. Les escargots préparés en trop peuvent se congeler.",
    ],
}

# ------------------------------------------------------------------ recettes (une page par recette)
RECIPES = [
    {'key': 'beurre-persille', 'slug': 'escargots-au-beurre-persille', 'name': 'Escargots au beurre persillé', 'h1': 'Escargots au *beurre persillé*', 'photo': 'plat-staub',
     'title': 'Escargots au beurre persillé : la recette au four',
     'description': "La recette des escargots au beurre persillé, à faire avec des gros-gris vivants de Gironde : 48 escargots pour 4, 10 minutes au four. Simple et rapide.",
     'intro': "Le grand classique des fêtes. Préparez le beurre la veille, et sortez-le du réfrigérateur une heure avant.",
     'serves': 4, 'prep': 25, 'cook': 10, 'level': 'Facile', 'dozens': 4,
     'ingredients': ['48 escargots préparés, sans coquille', '48 coquilles propres', '250 g de beurre mou',
                     "3 gousses d'ail", '1 échalote', '1 bouquet de persil plat', 'Sel, poivre'],
     'steps': ["Hachez finement l'ail, l'échalote et le persil.",
               'Mélangez-les au beurre mou, avec une pincée de sel et un tour de poivre.',
               "Mettez un peu de beurre au fond de chaque coquille, puis un escargot. Fermez avec une belle noisette de beurre.",
               "Rangez les coquilles dans un plat à escargots, l'ouverture vers le haut.",
               'Enfournez 8 à 10 minutes à 200 °C, jusqu’à ce que le beurre grésille. Servez tout de suite, avec du pain.'],
     'note': "Pas de coquilles ? Rangez les escargots dans les alvéoles d'un plat à escargots ou dans de petites [cassolettes](/recettes/cassolettes-d-escargots-a-la-creme-d-ail), couverts de beurre. Gardez les coquilles de vos escargots : la méthode est dans le guide pour [préparer des escargots vivants](/preparer-des-escargots-vivants)."},
    {'key': 'bordelaise', 'slug': 'escargots-a-la-bordelaise', 'name': 'Escargots à la bordelaise', 'h1': 'Escargots *à la bordelaise*', 'photo': 'sauce',
     'title': 'Escargots à la bordelaise : la recette girondine',
     'description': "La recette des escargots à la bordelaise : jambon, échalotes, vin blanc et cuisson douce. Avec des gros-gris vivants élevés en Gironde, près de Libourne.",
     'intro': "La recette girondine : jambon, échalotes, vin blanc et une cuisson douce.",
     'serves': 4, 'prep': 20, 'cook': 50, 'level': 'Facile', 'dozens': 4,
     'ingredients': ['48 escargots préparés, sans coquille', '150 g de jambon de Bayonne', '2 échalotes', "3 gousses d'ail",
                     '1 bouquet de persil plat', '1 cuillère à soupe de farine', '25 cl de vin blanc sec',
                     '25 cl de bouillon de volaille', "2 cuillères à soupe d'huile d'olive", "Poivre, piment d'Espelette"],
     'steps': ["Hachez les échalotes, l'ail et le persil. Coupez le jambon en petits dés.",
               "Dans une cocotte, faites revenir le jambon et les échalotes dans l'huile, 5 minutes.",
               "Ajoutez l'ail, puis la farine. Remuez 1 minute.",
               "Versez le vin blanc et le bouillon. Ajoutez les escargots, le poivre et une pincée de piment.",
               "Couvrez et laissez mijoter 45 minutes à feu doux, en remuant de temps en temps.",
               "Ajoutez le persil à la fin. Goûtez avant de saler : le jambon l'est déjà. Servez avec des tranches de pain grillé."],
     'note': "Cette version se fait au vin blanc. On trouve aussi des escargots à la bordelaise au vin rouge, plus corsés : la méthode reste la même. Comme tous les plats mijotés, ce plat est encore meilleur le lendemain."},
    {'key': 'cassolettes', 'slug': 'cassolettes-d-escargots-a-la-creme-d-ail', 'name': "Cassolettes d'escargots à la crème d'ail", 'h1': "Cassolettes d'escargots *à la crème d'ail*", 'photo': 'cassolette',
     'title': "Cassolettes d'escargots à la crème d'ail : la recette",
     'description': "La recette des cassolettes d'escargots à la crème d'ail, gratinées au four : une entrée chaude en 30 minutes, avec des escargots déjà préparés.",
     'intro': "Une entrée chaude, crémeuse et dorée. Prête en trente minutes, avec des escargots déjà préparés.",
     'serves': 4, 'prep': 15, 'cook': 15, 'level': 'Facile', 'dozens': 3,
     'ingredients': ['36 escargots préparés, sans coquille', '2 échalotes', "2 gousses d'ail", '20 cl de crème épaisse',
                     '10 cl de vin blanc sec', '30 g de beurre', '1 cuillère à soupe de persil haché', '40 g de chapelure', 'Sel, poivre'],
     'steps': ["Faites fondre le beurre dans une poêle. Ajoutez les échalotes et l'ail hachés. Laissez cuire 3 minutes, sans colorer.",
               'Ajoutez les escargots, puis le vin blanc. Laissez réduire 3 minutes.',
               'Versez la crème, salez et poivrez. Laissez épaissir 5 minutes à feu doux, puis ajoutez le persil.',
               'Répartissez dans 4 cassolettes et couvrez de chapelure.',
               'Passez 5 minutes sous le gril du four, jusqu’à ce que le dessus soit doré.'],
     'note': "Pas de cassolettes ? Un petit plat à gratin fait l'affaire. Pour un apéritif, servez la même préparation dans des bouchées feuilletées. Pour les fêtes, essayez aussi les [escargots au beurre persillé](/recettes/escargots-au-beurre-persille)."},
]
RECIPES_PUBLISHED = '2026-10-17'

# ------------------------------------------------------------------ pages (titre de 60 caractères et description de 155 au plus)
# 'updated' : date de la dernière modification du contenu (lastmod du plan du site) ; à changer quand le texte change.
PAGES = {
    'index': {'template': 'index.html', 'file': 'index.html', 'path': '/', 'crumb': None, 'hero': 'dark', 'updated': '2026-10-17',
              'title': "Producteur d'escargots en Gironde, près de Libourne",
              'description': "Producteur d'escargots en Gironde : gros-gris élevés sous serre près de Libourne, vendus vivants et déjà jeûnés, d'octobre à décembre, sur rendez-vous."},
    'elevage': {'template': 'elevage.html', 'file': 'l-elevage.html', 'path': '/l-elevage', 'crumb': "L'élevage", 'hero': 'dark', 'updated': '2026-10-17',
                'h1': "Notre élevage *d'escargots* en Gironde",
                'title': "Élevage d'escargots sous serre en Gironde : notre méthode",
                'description': "Notre élevage d'escargots à Lugon-et-l'Île-du-Carnay : serres sous filets, planches de repos, nourriture simple et gros-gris ramassés à la main."},
    'escargots': {'template': 'escargots.html', 'file': 'nos-escargots.html', 'path': '/nos-escargots', 'crumb': 'Nos escargots', 'hero': 'light', 'updated': '2026-10-17',
                  'h1': 'Escargots vivants *à vendre* en Gironde',
                  'title': 'Escargots vivants à vendre en Gironde, gros-gris jeûnés',
                  'description': "Escargots gros-gris vivants et déjà jeûnés, à vendre en Gironde, près de Libourne. À la douzaine ou au kilo, d'octobre à décembre, à la ferme."},
    'preparer': {'template': 'preparer.html', 'file': 'preparer-des-escargots-vivants.html', 'path': '/preparer-des-escargots-vivants', 'crumb': 'Préparer des escargots vivants', 'hero': 'light', 'updated': '2026-10-17', 'og': 'nocturne',
                 'h1': 'Préparer des escargots *vivants*',
                 'title': 'Préparer des escargots vivants : la méthode pas à pas',
                 'description': "Comment préparer des escargots vivants : lavage, dégorgement, blanchiment, décoquillage et court-bouillon. La méthode classique, étape par étape."},
    'calcul': {'template': 'calcul.html', 'file': 'combien-d-escargots-par-personne.html', 'path': '/combien-d-escargots-par-personne', 'crumb': "Combien d'escargots par personne", 'hero': 'light', 'updated': '2026-10-17', 'og': 'plat-pince',
               'h1': "Combien d'escargots *par personne* ?",
               'title': "Combien d'escargots par personne ? Le calculateur",
               'description': "Combien d'escargots par personne en entrée ou en plat ? Le calculateur donne le nombre, les douzaines et les kilos de gros-gris vivants à commander."},
    'recettes': {'template': 'recettes.html', 'file': 'recettes.html', 'path': '/recettes', 'crumb': 'Recettes', 'hero': 'light', 'updated': '2026-10-17', 'og': 'cassolette',
                 'h1': "Recettes *d'escargots*",
                 'title': "Recettes d'escargots : bordelaise, persillés, cassolettes",
                 'description': "Nos recettes d'escargots à faire avec des gros-gris vivants : à la bordelaise, au beurre persillé, en cassolettes. Et la méthode pour les préparer."},
    'contact': {'template': 'contact.html', 'file': 'contact.html', 'path': '/contact', 'crumb': 'Contact', 'hero': 'light', 'updated': '2026-10-17',
                'h1': 'Contact et *commande*',
                'title': 'Contact et commande, Héliciculture du Garnoutey',
                'description': "Appelez le 06 62 49 83 14 ou écrivez-nous pour réserver vos gros-gris, d'octobre à décembre. Retrait à la ferme près de Libourne, sur rendez-vous."},
    'mentions': {'template': 'mentions.html', 'file': 'mentions-legales.html', 'path': '/mentions-legales', 'crumb': 'Mentions légales', 'hero': 'light', 'updated': '2026-10-17',
                 'robots': 'noindex', 'sitemap': False,
                 'title': 'Mentions légales, Héliciculture du Garnoutey',
                 'description': "Mentions légales du site de l'Héliciculture du Garnoutey : éditeur, hébergeur, médiation, données personnelles et crédits photos."},
    '404': {'template': '404.html', 'file': '404.html', 'path': '/404', 'crumb': None, 'hero': 'dark', 'sitemap': False, 'robots': 'noindex',
            'title': 'Page introuvable, Héliciculture du Garnoutey',
            'description': "Cette page n'existe pas ou a changé d'adresse."},
}

# ------------------------------------------------------------------ à faire valider par l'éleveur (compte rendu et README)
A_VALIDER = [
    "Vente d'escargots vivants seulement (pour vendre des escargots cuisinés, il faudrait des démarches sanitaires auprès de la DDPP)",
    "Clients visés : particuliers, restaurants et traiteurs, revendeurs et conserveurs",
    "Pas de livraison : retrait à la ferme et visites sur rendez-vous (jours, minimum de commande)",
    "Prix à la douzaine et au kilo",
    "Nombre de gros-gris au kilo, pesé à la ferme (le calculateur utilise 50 au kilo, fourchette de 45 à 65 relevée chez d'autres éleveurs)",
    "Durée et méthode du jeûne fait à la ferme",
    "Conseils pour garder les escargots vivants entre le retrait et la cuisson (page Préparer)",
    "Méthode de préparation des escargots vivants (page Préparer)",
    "Élevage sous serre (serres tunnels sous filets d'ombrage) ; nourriture : plantes semées et complément de céréales",
    "Ramassage à la main, une fois adulte",
    "Téléphone et e-mail à afficher (aujourd'hui : 06 62 49 83 14 et locterra33@gmail.com)",
    "Phrase « Nous ne vendons pas d'escargots d'ailleurs sous notre nom »",
    "Photos des plats et des coquilles : photos libres d'illustration, à remplacer par les vôtres",
    "Médiateur de la consommation (obligatoire pour vendre aux particuliers)",
]
