export const situations = [
  {
    metier: "Artisan",
    categorie: "Devis",
    titre: "Le client trouve le devis trop cher",
    description:
      "Répondre à un client qui juge le devis trop élevé et veut comprendre la valeur de la prestation.",
    tags: ["devis", "prix", "valeur", "budget", "client"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre réaction. Ce devis tient compte du temps nécessaire, des matériaux et de la qualité d'exécution prévue. Si vous le souhaitez, je peux vous détailler chaque poste pour vous expliquer ce qui compose le montant."
      },
      {
        label: "Pédagogique",
        contenu:
          "Le prix présenté correspond à une intervention complète avec les garanties associées. Mon objectif est de vous proposer une solution fiable et durable, pas seulement un tarif attractif. Nous pouvons revoir ensemble le détail pour identifier les points les plus importants pour vous."
      },
      {
        label: "Ferme",
        contenu:
          "Je préfère vous présenter un prix juste plutôt qu'un devis sous-estimé. Le montant annoncé correspond au niveau de qualité et de sécurité attendu pour ce type de travaux. Je peux ajuster le périmètre si besoin, mais pas au détriment du résultat."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Relance",
    titre: "Le client ne répond plus après réception du devis",
    description:
      "Relancer un client après envoi du devis sans paraître insistant.",
    tags: ["relance", "devis", "suivi", "client", "réponse"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je me permets de revenir vers vous au sujet du devis transmis. Avez-vous eu le temps d'en prendre connaissance ? Je reste bien sûr disponible si vous souhaitez une précision ou un ajustement."
      },
      {
        label: "Commerciale",
        contenu:
          "Je vous recontacte concernant le devis envoyé pour savoir où en est votre réflexion. Si votre projet est toujours d'actualité, je peux vous aider à avancer rapidement sur la suite. N'hésitez pas à me dire ce dont vous avez besoin pour décider."
      },
      {
        label: "Directe",
        contenu:
          "Je reviens vers vous concernant le devis transmis. Sans retour de votre part, je ne sais pas si le projet est toujours en cours. Un simple message de votre part me permettra de savoir si je dois maintenir cette proposition."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Concurrence",
    titre: "Le client compare avec un concurrent moins cher",
    description:
      "Répondre quand un client met en avant un concurrent moins cher.",
    tags: ["concurrent", "prix", "comparaison", "devis", "qualité"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Je comprends que vous compariez les offres. Au-delà du prix, il est important de vérifier le niveau de finition, les matériaux prévus et les garanties incluses. Deux devis peuvent sembler proches sur le papier tout en couvrant des prestations très différentes."
      },
      {
        label: "Commerciale",
        contenu:
          "Le tarif ne fait pas tout dans ce type de projet. Mon objectif est de vous apporter une prestation claire, fiable et suivie du début à la fin. Si vous le souhaitez, nous pouvons comparer point par point pour voir les différences réelles."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne cherche pas à être le moins cher à tout prix. Je préfère vous proposer une offre cohérente avec le travail à réaliser et les engagements pris. Un prix plus bas cache parfois des limites sur la qualité ou sur le périmètre réel."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Négociation",
    titre: "Le client demande une remise importante",
    description:
      "Gérer une demande de remise importante tout en préservant la rentabilité du chantier.",
    tags: ["remise", "négociation", "prix", "marge", "client"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre demande. Le devis a déjà été établi au plus juste par rapport au travail prévu. En revanche, nous pouvons regarder ensemble si certains éléments du projet peuvent être ajustés pour rester dans votre budget."
      },
      {
        label: "Commerciale",
        contenu:
          "Si votre objectif est d'optimiser le budget, nous pouvons travailler sur le périmètre ou sur certaines options. Cela permet de conserver une prestation sérieuse tout en trouvant un équilibre. Je préfère cette approche à une remise trop forte qui dégraderait la qualité."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne peux pas appliquer une remise importante sans impacter le contenu de la prestation. Le prix proposé correspond déjà à un équilibre entre qualité, temps et garanties. Si besoin, je peux vous proposer une version allégée du projet."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Planning",
    titre: "Le client veut commencer les travaux rapidement",
    description:
      "Répondre à un client pressé de lancer les travaux.",
    tags: ["planning", "travaux", "démarrage", "urgence", "disponibilité"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends votre souhait d'avancer rapidement. Je vais regarder mes disponibilités pour vous proposer le créneau le plus proche possible. Dès que vous validez, je peux vous confirmer un planning clair."
      },
      {
        label: "Directe",
        contenu:
          "Je peux lancer les travaux rapidement si nous validons le devis et les éléments techniques sans attendre. Mon planning évolue régulièrement, donc plus la décision est prise tôt, plus j'ai de chances de bloquer une date proche."
      },
      {
        label: "Transparente",
        contenu:
          "Je préfère vous annoncer un délai réaliste plutôt qu'une date incertaine. Si vous souhaitez démarrer vite, je peux prioriser votre dossier dès réception de votre accord et vous donner une date ferme."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Relance",
    titre: "Le client reporte constamment sa décision",
    description:
      "Relancer un client qui décale sans cesse sa prise de décision.",
    tags: ["décision", "relance", "report", "client", "projet"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que vous ayez besoin de temps pour réfléchir. Pour bien organiser mon planning, pourriez-vous me dire à quel horizon vous pensez prendre votre décision ? Cela me permettra de m'adapter plus facilement."
      },
      {
        label: "Directe",
        contenu:
          "J'ai bien noté que votre décision est encore en attente. Afin d'éviter de bloquer inutilement des créneaux, j'ai besoin de savoir si le projet reste prioritaire pour vous. Un retour, même provisoire, m'aidera à m'organiser."
      },
      {
        label: "Commerciale",
        contenu:
          "Si certains points freinent encore votre décision, nous pouvons les reprendre ensemble rapidement. L'idée est de vous aider à avancer sereinement plutôt que de laisser le projet en suspens. Je reste disponible pour un échange court si besoin."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Paiement",
    titre: "Le client refuse l'acompte demandé",
    description:
      "Répondre à un refus d'acompte avant démarrage du chantier.",
    tags: ["acompte", "paiement", "chantier", "engagement", "client"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "L'acompte permet de réserver le créneau, de lancer les approvisionnements et de sécuriser le démarrage du chantier. C'est une pratique normale sur ce type de prestation. Il garantit un engagement réciproque des deux côtés."
      },
      {
        label: "Transparente",
        contenu:
          "Je demande un acompte uniquement pour pouvoir engager les achats et planifier l'intervention dans de bonnes conditions. Sans cela, je ne peux pas bloquer définitivement la date ni avancer sur la préparation."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne peux pas lancer le chantier sans acompte. C'est une condition nécessaire pour réserver le planning et engager les frais liés au projet. Dès réception, je vous confirme immédiatement la suite."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Chantier",
    titre: "Le chantier prend du retard",
    description:
      "Informer le client d'un retard de chantier tout en gardant la relation de confiance.",
    tags: ["chantier", "retard", "planning", "client", "travaux"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Je préfère vous tenir informé clairement : le chantier prend un peu de retard par rapport au planning initial. Je mets tout en œuvre pour limiter l'impact sur la suite et je vous communiquerai un nouveau point d'avancement précis."
      },
      {
        label: "Rassurante",
        contenu:
          "Je comprends que ce décalage puisse vous gêner. Mon objectif est de terminer le chantier dans de bonnes conditions sans bâcler les étapes importantes. Je vous tiens informé des ajustements mis en place pour rattraper au mieux ce retard."
      },
      {
        label: "Factuelle",
        contenu:
          "Le retard constaté vient d'un décalage sur les étapes prévues ou sur l'approvisionnement. J'actualise le planning pour vous donner une vision réaliste de la suite. Je préfère vous annoncer un nouveau délai fiable plutôt qu'une promesse incertaine."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Travaux",
    titre: "Le client demande des travaux supplémentaires non prévus",
    description:
      "Répondre à une demande de travaux supplémentaires en cours de prestation.",
    tags: ["supplément", "avenant", "chantier", "travaux", "devis"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Votre demande est tout à fait envisageable. Comme ces travaux n'étaient pas prévus au devis initial, je dois vous faire un chiffrage complémentaire avant de les intégrer. Cela permet d'avancer proprement et sans ambiguïté."
      },
      {
        label: "Pédagogique",
        contenu:
          "Dès qu'un travail supplémentaire s'ajoute, il faut tenir compte du temps, des fournitures et de l'impact sur le planning. Je vous propose donc un complément de devis clair pour valider cela ensemble avant exécution."
      },
      {
        label: "Directe",
        contenu:
          "Je peux réaliser ces travaux en plus, mais ils ne sont pas inclus dans le devis signé. Il faudra donc un accord sur un montant complémentaire avant intervention. C'est la seule façon de garder un cadre clair pour tout le monde."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Facturation",
    titre: "Le client conteste une facture",
    description:
      "Répondre à une contestation de facture avec calme et précision.",
    tags: ["facture", "contestations", "paiement", "travaux", "client"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends bien note de votre remarque sur la facture. Je vous propose de reprendre ensemble les éléments facturés afin d'éclaircir immédiatement les points qui vous interrogent. Mon objectif est que tout soit clair pour vous."
      },
      {
        label: "Factuelle",
        contenu:
          "La facture correspond aux travaux réalisés et aux éléments validés dans le cadre du chantier. Si un point vous semble imprécis, je peux vous détailler chaque ligne pour vérifier ensemble l'origine du montant."
      },
      {
        label: "Ferme",
        contenu:
          "Je suis bien sûr disponible pour expliquer la facture, mais celle-ci repose sur les travaux réellement effectués. S'il n'y a pas d'erreur matérielle, le montant reste dû conformément à ce qui a été réalisé."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Planning",
    titre: "Le client trouve le délai trop long",
    description:
      "Répondre à un client qui juge le délai proposé trop important.",
    tags: ["délai", "planning", "chantier", "client", "disponibilité"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends que ce délai puisse vous sembler long. Il correspond à mon planning actuel et au temps nécessaire pour préparer correctement votre intervention. L'objectif est de vous garantir une prestation sérieuse au bon moment."
      },
      {
        label: "Transparente",
        contenu:
          "Je préfère vous donner un délai réaliste plutôt qu'une date trop optimiste. Cela me permet de tenir mes engagements et de préparer votre chantier dans de bonnes conditions. Si un créneau se libère avant, je pourrai bien sûr vous en faire profiter."
      },
      {
        label: "Directe",
        contenu:
          "Le délai annoncé reflète mes disponibilités réelles. Je ne souhaite pas vous promettre un démarrage plus tôt si je ne suis pas certain de le tenir. En revanche, je peux vous positionner en priorité sur la première ouverture."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Chantier",
    titre: "Le client souhaite modifier le projet en cours de chantier",
    description:
      "Gérer une demande de modification alors que le chantier est déjà lancé.",
    tags: ["modification", "chantier", "avenant", "travaux", "client"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Nous pouvons étudier cette modification, mais elle peut avoir un impact sur le coût et sur le planning du chantier. Je préfère vous faire un point clair avant de changer quoi que ce soit. Cela évite les malentendus et permet de décider proprement."
      },
      {
        label: "Pédagogique",
        contenu:
          "Quand un projet évolue en cours de chantier, il faut vérifier les conséquences techniques et organisationnelles. Je vais vous indiquer précisément ce que cela change avant toute validation. Ensuite, nous déciderons ensemble de la meilleure option."
      },
      {
        label: "Directe",
        contenu:
          "Je peux prendre en compte cette demande, mais pas sans recalage du projet. Toute modification en cours de chantier doit être validée avant mise en œuvre. C'est indispensable pour rester clair sur le prix et le délai."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Préparation",
    titre: "Le client ne fournit pas les informations nécessaires",
    description:
      "Relancer un client qui bloque l'avancement faute d'informations complètes.",
    tags: ["informations", "préparation", "client", "blocage", "dossier"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Pour pouvoir avancer correctement sur votre projet, j'ai encore besoin de certains éléments. Dès que vous me les transmettez, je peux reprendre le dossier sans attendre. Je reste disponible si vous souhaitez que je précise ce qui manque."
      },
      {
        label: "Directe",
        contenu:
          "Sans les informations demandées, je ne peux pas sécuriser la suite du projet. J'ai besoin de ces éléments pour valider le chiffrage ou le planning. Dès réception, je vous confirme immédiatement la prochaine étape."
      },
      {
        label: "Rassurante",
        contenu:
          "Il manque encore quelques informations pour finaliser votre dossier dans de bonnes conditions. Une fois ces éléments reçus, je pourrai vous répondre de façon précise et éviter toute approximation. L'objectif est de vous proposer quelque chose de fiable."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Rendez-vous",
    titre: "Le client annule le rendez-vous au dernier moment",
    description:
      "Réagir à une annulation tardive de rendez-vous sans casser la relation.",
    tags: ["rendez-vous", "annulation", "planning", "client", "organisation"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends note de votre annulation. Merci de me tenir informé dès que vous êtes prêt à reprogrammer un créneau. Je ferai au mieux pour vous proposer une nouvelle disponibilité rapidement."
      },
      {
        label: "Directe",
        contenu:
          "J'avais bloqué ce créneau pour votre rendez-vous. En cas d'annulation tardive, cela complique mon organisation. Je reste disponible pour fixer une nouvelle date si votre projet avance toujours."
      },
      {
        label: "Transparente",
        contenu:
          "Je comprends qu'un imprévu puisse arriver. Pour la suite, je vous remercie simplement de me prévenir le plus tôt possible afin que je puisse réorganiser mon planning. Nous pouvons bien sûr reprogrammer un rendez-vous."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Urgence",
    titre: "Le client demande une intervention urgente",
    description:
      "Répondre à une demande urgente quand l'organisation doit rester maîtrisée.",
    tags: ["urgence", "intervention", "planning", "client", "priorité"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends l'urgence de votre situation. Je vais regarder immédiatement ce qu'il m'est possible de faire ou vous proposer le premier créneau compatible. Je reviens vers vous rapidement avec une réponse claire."
      },
      {
        label: "Directe",
        contenu:
          "Je prends bien note de l'urgence. Si je peux intervenir rapidement, je vous le confirme sans attendre. Dans le cas contraire, je vous proposerai la solution la plus rapide possible."
      },
      {
        label: "Transparente",
        contenu:
          "Je préfère vous dire honnêtement ce que je peux tenir. Une urgence demande parfois une réorganisation complète du planning, donc je vérifie d'abord mes possibilités réelles. Je vous réponds au plus vite avec un créneau précis."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Relance",
    titre: "Le client ne répond plus après la visite technique",
    description:
      "Relancer un client après visite technique et avant envoi ou validation d'une proposition.",
    tags: ["visite", "technique", "relance", "client", "suivi"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je me permets de revenir vers vous après notre visite technique. Avez-vous besoin d'un complément d'information avant la suite ? Je reste disponible pour répondre à vos questions."
      },
      {
        label: "Commerciale",
        contenu:
          "Suite à notre rendez-vous, je souhaitais savoir où en était votre réflexion. Si votre projet avance toujours, je peux vous aider à clarifier les prochains points pour faciliter votre décision. N'hésitez pas à me faire un retour."
      },
      {
        label: "Directe",
        contenu:
          "Je reviens vers vous après la visite technique pour savoir si le projet est toujours d'actualité. Sans retour, je ne peux pas savoir si je dois poursuivre la préparation. Un simple message me permettra de me positionner."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Paiement",
    titre: "Le client souhaite payer en plusieurs fois",
    description:
      "Répondre à une demande d'échelonnement de paiement.",
    tags: ["paiement", "échelonnement", "budget", "client", "conditions"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Nous pouvons regarder ensemble s'il est possible d'étaler le règlement. L'idée est de trouver un fonctionnement clair et sécurisé pour tout le monde. Je peux vous proposer un échéancier adapté au projet."
      },
      {
        label: "Transparente",
        contenu:
          "Un paiement en plusieurs fois peut être envisagé selon le montant et l'avancement du chantier. Je préfère le formaliser dès le départ pour que les conditions soient claires. Si cela vous convient, je vous propose une répartition simple."
      },
      {
        label: "Directe",
        contenu:
          "Oui, cela peut être étudié, mais dans un cadre défini à l'avance. J'ai besoin que les échéances soient fixées clairement avant le démarrage. Ainsi, tout reste simple et sécurisé pour les deux parties."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Devis",
    titre: "Le client estime que le devis manque de détails",
    description:
      "Répondre à un client qui souhaite un devis plus détaillé.",
    tags: ["devis", "détail", "clarté", "client", "prestation"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Je comprends votre besoin de visibilité. Le devis peut être détaillé davantage pour vous permettre de mieux identifier chaque poste. Je peux vous préparer une version plus précise si cela vous aide à vous projeter."
      },
      {
        label: "Transparente",
        contenu:
          "Mon objectif est que le devis soit parfaitement lisible pour vous. Si certains éléments méritent d'être mieux expliqués, je peux les reformuler ou les découper plus précisément. Cela permettra de valider le projet sur une base encore plus claire."
      },
      {
        label: "Commerciale",
        contenu:
          "Un devis bien détaillé facilite la décision et évite les zones d'ombre. Je peux vous l'ajuster rapidement afin que vous ayez une vision plus complète de la prestation. Vous pourrez ainsi comparer sur des bases solides."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Négociation",
    titre: "Le client veut négocier chaque poste du devis",
    description:
      "Gérer une négociation très détaillée sur chaque ligne du devis.",
    tags: ["négociation", "devis", "postes", "prix", "client"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Chaque poste du devis correspond à un besoin précis en temps, fourniture ou mise en œuvre. Nous pouvons bien sûr les revoir ensemble, mais l'idée est de garder une prestation cohérente dans son ensemble. Je préfère vous expliquer la logique plutôt que de modifier chaque ligne sans recul."
      },
      {
        label: "Diplomatique",
        contenu:
          "Je suis tout à fait prêt à reprendre le devis avec vous point par point. Cela dit, certains postes sont indispensables pour garantir un résultat sérieux. Si votre objectif est d'optimiser le budget, je peux surtout vous aider à identifier les options réellement ajustables."
      },
      {
        label: "Ferme",
        contenu:
          "Je peux commenter chaque poste, mais ils ne sont pas là par hasard. Le devis a été construit de manière globale pour assurer la bonne réalisation du projet. Je préfère ajuster le périmètre global plutôt que déstabiliser ligne par ligne la prestation."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Garantie",
    titre: "Le client demande une garantie supplémentaire",
    description:
      "Répondre à une demande de garantie renforcée avant engagement.",
    tags: ["garantie", "sécurité", "confiance", "client", "travaux"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends votre besoin d'être rassuré avant de vous engager. Je peux vous préciser les garanties déjà prévues dans la prestation et voir avec vous s'il faut formaliser un point complémentaire. L'objectif est que vous avanciez avec confiance."
      },
      {
        label: "Transparente",
        contenu:
          "Certaines garanties sont déjà incluses dans le cadre normal de mon intervention. Si vous attendez un engagement complémentaire, je dois d'abord vérifier ce qu'il est possible de formaliser proprement. Je vous répondrai clairement sur ce point."
      },
      {
        label: "Pédagogique",
        contenu:
          "Les garanties doivent correspondre à ce qui est réellement maîtrisable dans le cadre des travaux. Je peux vous expliquer précisément ce qui est couvert aujourd'hui et ce qui peut éventuellement être ajouté. Cela évite toute promesse floue."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Relation",
    titre: "Le voisin du chantier se plaint",
    description:
      "Répondre à une plainte d'un voisin liée au chantier en cours.",
    tags: ["voisin", "chantier", "plainte", "relation", "nuisance"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que le chantier puisse occasionner une gêne ponctuelle. Nous faisons le nécessaire pour limiter les nuisances autant que possible. Je prends en compte votre remarque et je vais voir ce qui peut être amélioré."
      },
      {
        label: "Rassurante",
        contenu:
          "Merci pour votre retour, je le prends au sérieux. Le chantier est temporaire, mais cela ne nous empêche pas d'ajuster certains points pour mieux préserver le voisinage. Je vais transmettre et corriger ce qui peut l'être rapidement."
      },
      {
        label: "Directe",
        contenu:
          "Le chantier entraîne forcément un minimum de contraintes, mais nous devons rester dans un cadre acceptable. Je vais faire un point immédiat avec l'équipe pour limiter ce qui pose problème. Merci de m'avoir signalé la situation."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Conseil",
    titre: "Le client hésite entre plusieurs solutions techniques",
    description:
      "Aider un client à choisir entre plusieurs options techniques.",
    tags: ["solution", "technique", "conseil", "client", "choix"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "C'est normal d'hésiter entre plusieurs solutions. Chacune a ses avantages selon votre budget, votre usage et le rendu attendu. Je peux vous faire une comparaison simple pour vous aider à choisir celle qui vous correspond le mieux."
      },
      {
        label: "Rassurante",
        contenu:
          "Mon rôle est justement de vous aider à faire un choix serein. Nous pouvons reprendre ensemble les différences essentielles sans entrer dans trop de complexité. L'objectif est de retenir la solution la plus adaptée à votre situation."
      },
      {
        label: "Factuelle",
        contenu:
          "Les options possibles ne répondent pas toutes de la même manière en termes de coût, de durée et de finition. Je vous propose un comparatif clair sur ces trois critères. Vous pourrez ensuite décider avec une vision plus objective."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Planning",
    titre: "Le client souhaite reporter le démarrage des travaux",
    description:
      "Répondre à un client qui souhaite décaler le démarrage après validation.",
    tags: ["report", "travaux", "planning", "démarrage", "client"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Je prends note de votre souhait de reporter le démarrage. Je vais regarder comment cela impacte le planning déjà prévu et je vous confirme rapidement les possibilités. L'essentiel est de repositionner le chantier de façon claire."
      },
      {
        label: "Directe",
        contenu:
          "Le report est possible, mais il faut vérifier la disponibilité des prochains créneaux. Une fois une date déplacée, je ne peux pas garantir de reprendre exactement au même moment que prévu initialement. Je vous propose donc un nouveau point de planning."
      },
      {
        label: "Rassurante",
        contenu:
          "Pas de souci, nous pouvons réétudier le calendrier. Mon objectif est que le chantier démarre dans de bonnes conditions pour vous comme pour moi. Je reviens vers vous avec une proposition de replanification simple."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Devis",
    titre: "Le client demande une estimation sans engagement",
    description:
      "Répondre à un client qui souhaite une estimation avant de s'engager.",
    tags: ["estimation", "devis", "engagement", "client", "budget"],
    variantes: [
      {
        label: "Commerciale",
        contenu:
          "Oui, je peux vous donner une première estimation pour vous aider à vous projeter. Elle vous donnera un ordre de grandeur réaliste avant d'aller plus loin. Si le projet se précise ensuite, nous pourrons passer sur un devis complet."
      },
      {
        label: "Transparente",
        contenu:
          "Je peux vous fournir une estimation indicative sans engagement de votre part. Elle restera bien sûr liée aux éléments dont nous disposons aujourd'hui. Pour un prix définitif, il faudra ensuite confirmer le périmètre exact."
      },
      {
        label: "Pédagogique",
        contenu:
          "Une estimation permet d'avoir une base budgétaire rapide, mais elle reste moins précise qu'un devis complet. Je peux vous la préparer à partir des informations disponibles. Ensuite, si vous souhaitez avancer, nous affinerons ensemble."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Imprévu",
    titre: "Le client refuse une augmentation de prix liée à un imprévu",
    description:
      "Expliquer une hausse de prix justifiée par un imprévu découvert en cours de chantier.",
    tags: ["imprévu", "augmentation", "prix", "chantier", "travaux"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Je comprends que cette hausse soit difficile à accepter. Elle vient d'un élément imprévu découvert en cours de chantier, qui n'était pas visible au départ. Je préfère vous l'expliquer clairement avant toute poursuite."
      },
      {
        label: "Factuelle",
        contenu:
          "Le montant complémentaire correspond à un travail ou à une fourniture non anticipable lors du devis initial. Sans cette adaptation, la prestation ne peut pas être menée correctement. Je peux vous détailler précisément ce qui justifie cet ajustement."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne peux pas absorber seul un coût lié à un imprévu réel découvert pendant l'intervention. Si le chantier doit continuer dans de bonnes conditions, cet ajustement doit être validé. Mon rôle est d'être clair avec vous à ce sujet."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Estimation",
    titre: "Le vendeur trouve l'estimation trop basse",
    description:
      "Répondre à un vendeur qui juge l'estimation insuffisante par rapport à son attente.",
    tags: ["estimation", "vendeur", "prix", "marché", "mandat"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Je comprends votre réaction. Mon estimation s'appuie sur les ventes réellement conclues dans votre secteur et sur les biens actuellement en concurrence. L'objectif est de positionner votre bien au bon niveau pour attirer rapidement des acheteurs sérieux."
      },
      {
        label: "Diplomatique",
        contenu:
          "Je sais qu'il n'est pas simple d'entendre un prix inférieur à ce que l'on espérait. Mon rôle est de vous apporter une vision réaliste du marché pour vendre dans de bonnes conditions. Nous pouvons reprendre ensemble les éléments qui fondent cette estimation."
      },
      {
        label: "Ferme",
        contenu:
          "Je préfère vous donner une estimation juste plutôt qu'un prix flatteur mais difficile à défendre face au marché. Un bien surestimé attire moins d'acheteurs et prend souvent plus de temps à se vendre. Mon objectif est de sécuriser une vente réaliste."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Prix",
    titre: "Le vendeur veut afficher un prix trop élevé",
    description:
      "Répondre à un vendeur qui souhaite mettre le bien au-dessus du marché.",
    tags: ["vendeur", "prix", "affichage", "marché", "stratégie"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Je comprends votre logique, mais un prix d'affichage trop haut peut freiner dès le départ les bons acheteurs. Les premières semaines sont cruciales pour capter l'attention du marché. Il vaut mieux entrer avec un positionnement crédible que devoir corriger plus tard."
      },
      {
        label: "Commerciale",
        contenu:
          "Un bien bien positionné génère plus de visites qualifiées et crée de meilleures conditions de négociation. L'enjeu n'est pas seulement d'afficher un prix, mais de déclencher de l'intérêt réel. Mon objectif est de vous aider à vendre efficacement, pas seulement à publier une annonce."
      },
      {
        label: "Ferme",
        contenu:
          "Un prix trop élevé risque surtout d'écarter les acheteurs dès la recherche. Le bien peut alors rester visible trop longtemps et perdre en attractivité. Je préfère vous recommander un prix de marché défendable."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Prix",
    titre: "Le vendeur refuse de baisser son prix",
    description:
      "Répondre à un vendeur qui refuse toute baisse malgré des signaux faibles.",
    tags: ["vendeur", "prix", "baisse", "marché", "délai"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre position et votre attachement à la valeur de votre bien. Mon rôle est de vous partager les retours du marché pour vous aider à prendre la meilleure décision possible. Nous pouvons analyser ensemble les signaux actuels avant de décider."
      },
      {
        label: "Factuelle",
        contenu:
          "Aujourd'hui, le niveau de visites et les retours reçus montrent que le prix freine l'intérêt. Une adaptation peut permettre de relancer la dynamique commerciale. L'idée n'est pas de baisser pour baisser, mais de retrouver de la traction."
      },
      {
        label: "Ferme",
        contenu:
          "Si le prix reste au-dessus des attentes du marché, le délai de vente risque de s'allonger fortement. Je préfère vous le dire clairement plutôt que de laisser la situation se figer. Un bon positionnement protège aussi la valeur perçue du bien."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Mandat",
    titre: "Le vendeur hésite à signer un mandat exclusif",
    description:
      "Répondre à un vendeur qui hésite sur l'exclusivité.",
    tags: ["mandat", "exclusivité", "vendeur", "agence", "confiance"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Le mandat exclusif ne vous enlève pas de liberté, il permet surtout de donner une vraie cohérence à la commercialisation. Vous avez un interlocuteur unique et une stratégie plus claire. Cela rassure aussi les acheteurs sur le sérieux de la vente."
      },
      {
        label: "Commerciale",
        contenu:
          "L'exclusivité permet généralement de mieux valoriser le bien et de concentrer davantage d'efforts commerciaux. La communication est plus lisible et le suivi plus rigoureux. C'est souvent ce qui donne les meilleurs résultats dans le temps."
      },
      {
        label: "Transparente",
        contenu:
          "L'exclusivité implique un engagement réciproque. De votre côté, vous confiez la commercialisation à un seul professionnel. Du mien, je mobilise plus de moyens et un suivi plus poussé pour atteindre l'objectif."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Mandat",
    titre: "Le vendeur souhaite vendre seul",
    description:
      "Répondre à un vendeur qui pense pouvoir vendre sans intermédiaire.",
    tags: ["vendeur", "mandat", "vente", "seul", "agence"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends tout à fait votre envie de garder la main sur la vente. Mon rôle n'est pas de vous en empêcher, mais de vous montrer ce qu'un accompagnement professionnel peut vous faire gagner en temps et en sécurité. Ensuite, la décision vous appartient."
      },
      {
        label: "Pédagogique",
        contenu:
          "Vendre seul est possible, mais cela demande du temps, de la disponibilité et une bonne maîtrise du marché. Il faut gérer les appels, les visites, les négociations et les aspects administratifs. Mon accompagnement vise justement à sécuriser toutes ces étapes."
      },
      {
        label: "Commerciale",
        contenu:
          "L'intérêt de passer par un professionnel est d'optimiser la visibilité du bien et de qualifier les acheteurs plus rapidement. Cela permet souvent de mieux vendre tout en vous évitant une forte charge de gestion. Je peux vous montrer concrètement la différence."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Honoraires",
    titre: "Le vendeur remet en question les honoraires",
    description:
      "Répondre à un vendeur qui trouve les honoraires trop élevés.",
    tags: ["honoraires", "vendeur", "valeur", "service", "agence"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Les honoraires couvrent l'ensemble de l'accompagnement : estimation, mise en marché, gestion des contacts, visites, négociation et suivi jusqu'à la signature. Ce n'est pas seulement une annonce en ligne. L'objectif est de vous faire gagner en efficacité et en sécurité."
      },
      {
        label: "Valorisation",
        contenu:
          "Notre travail consiste à défendre au mieux votre projet et à sécuriser chaque étape de la vente. Les honoraires reflètent ce niveau d'implication et les moyens mobilisés. Ils s'inscrivent dans une logique de résultat, pas de simple diffusion."
      },
      {
        label: "Ferme",
        contenu:
          "Les honoraires correspondent à une prestation complète jusqu'à l'aboutissement de la vente. Ils ne se résument pas à la mise en ligne d'un bien. Je préfère être clair sur la valeur du service proposé."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Vente",
    titre: "Le vendeur s'inquiète du délai de vente",
    description:
      "Rassurer un vendeur qui craint que la vente soit trop longue.",
    tags: ["vendeur", "délai", "vente", "marché", "stratégie"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "C'est une inquiétude très fréquente et tout à fait compréhensible. Le délai dépend surtout du positionnement prix, de la présentation du bien et du contexte local. Mon rôle est de réunir les bonnes conditions pour vendre dans un délai cohérent."
      },
      {
        label: "Factuelle",
        contenu:
          "Le marché donne aujourd'hui une tendance sur les délais moyens dans votre secteur. Nous allons nous appuyer sur ces repères pour suivre la commercialisation de façon réaliste. Si besoin, nous ajusterons rapidement la stratégie."
      },
      {
        label: "Commerciale",
        contenu:
          "L'objectif est d'éviter de laisser le bien s'installer sur le marché sans dynamique. Une bonne mise en valeur et un bon prix de départ augmentent fortement les chances de vendre plus vite. Je vous accompagnerai de manière proactive sur ce point."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Sélection",
    titre: "Le vendeur refuse certains acheteurs",
    description:
      "Répondre à un vendeur qui rejette certains profils d'acheteurs.",
    tags: ["vendeur", "acheteurs", "sélection", "visites", "vente"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que vous souhaitiez sécuriser la vente et éviter de perdre du temps. L'idée est surtout de qualifier les acheteurs sur des critères objectifs liés à leur projet et à leur capacité d'achat. Cela permet de rester efficace et serein."
      },
      {
        label: "Pédagogique",
        contenu:
          "En immobilier, ce qui compte avant tout est la solidité du projet d'achat. Il vaut mieux analyser la capacité de financement, la motivation et la cohérence du dossier. C'est sur cette base que je vous conseille de trier les candidats."
      },
      {
        label: "Ferme",
        contenu:
          "Je préfère que nous restions sur des critères strictement liés au projet et au dossier. C'est la seule manière de travailler proprement et d'éviter des refus contre-productifs. Mon rôle est de vous présenter des acquéreurs sérieux et qualifiés."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Commercialisation",
    titre: "Le vendeur veut interrompre la commercialisation",
    description:
      "Répondre à un vendeur qui veut suspendre la mise en vente.",
    tags: ["vendeur", "commercialisation", "pause", "vente", "mandat"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends note de votre souhait de mettre la vente en pause. Avant cela, je vous propose simplement de faire un point sur les raisons de cette décision. Cela nous permettra de voir s'il faut suspendre ou ajuster la stratégie."
      },
      {
        label: "Transparente",
        contenu:
          "Interrompre la commercialisation est possible, mais il est important d'en mesurer l'impact sur la dynamique du bien. Une pause peut casser l'élan créé auprès des acheteurs. Je vous propose de décider avec une vision claire des conséquences."
      },
      {
        label: "Rassurante",
        contenu:
          "Si vous avez besoin de prendre du recul, nous pouvons en parler calmement. Mon objectif est de vous accompagner dans la meilleure décision pour votre projet, pas de vous forcer la main. Un échange rapide permettra de voir ce qui est le plus adapté."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Négociation",
    titre: "L'acheteur veut faire une offre très basse",
    description:
      "Répondre à un acheteur qui veut présenter une offre très en dessous du prix.",
    tags: ["acheteur", "offre", "négociation", "prix", "vendeur"],
    variantes: [
      {
        label: "Prudente",
        contenu:
          "Je peux transmettre votre offre au vendeur, mais je préfère vous prévenir qu'elle est sensiblement en dessous de ses attentes. Souhaitez-vous que je la présente malgré tout ? Je peux aussi vous aider à la positionner de façon plus recevable."
      },
      {
        label: "Argumentée",
        contenu:
          "Votre offre peut être étudiée, surtout si elle s'appuie sur des éléments concrets. Plus elle sera justifiée, plus elle aura de chances d'être prise au sérieux. Je peux vous aider à la formuler de manière crédible."
      },
      {
        label: "Directe",
        contenu:
          "Je transmettrai votre offre si vous le souhaitez. Gardez simplement en tête qu'un écart trop important avec le prix demandé peut conduire à un refus immédiat. Il vaut mieux présenter une proposition qui ouvre une vraie discussion."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Visite",
    titre: "L'acheteur demande une deuxième visite",
    description:
      "Répondre à un acheteur qui veut revoir le bien avant décision.",
    tags: ["acheteur", "visite", "décision", "bien", "accompagnement"],
    variantes: [
      {
        label: "Disponible",
        contenu:
          "Bien sûr, avec plaisir. Une deuxième visite est souvent utile pour confirmer une décision importante et revoir certains points plus sereinement. Je peux vous proposer un nouveau créneau rapidement."
      },
      {
        label: "Professionnelle",
        contenu:
          "C'est une démarche tout à fait normale avant de vous positionner. Nous pourrons profiter de cette visite pour reprendre calmement les éléments qui comptent le plus pour vous. Je m'occupe de l'organisation."
      },
      {
        label: "Incitative",
        contenu:
          "Une seconde visite permet souvent de lever les derniers doutes avant une offre. C'est généralement une très bonne étape pour avancer concrètement. Nous pourrons aussi revoir ensemble les points qui méritent précision."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Négociation",
    titre: "L'acheteur hésite avant de faire une offre",
    description:
      "Accompagner un acheteur qui hésite à se positionner.",
    tags: ["acheteur", "offre", "hésitation", "décision", "bien"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "C'est normal d'hésiter avant une décision aussi importante. Si vous le souhaitez, nous pouvons reprendre ensemble les points qui vous freinent encore. L'objectif est que vous avanciez avec une vision claire."
      },
      {
        label: "Prudente",
        contenu:
          "Prenez le temps nécessaire, mais gardez à l'esprit qu'un bien peut évoluer rapidement sur le marché. Si votre intérêt est réel, une offre permet aussi d'ouvrir la discussion sans engagement irréfléchi. Je peux vous aider à la formuler sereinement."
      },
      {
        label: "Directe",
        contenu:
          "Si le bien vous intéresse vraiment, faire une offre est la seule façon de vous positionner concrètement. Sans cela, vous laissez la porte ouverte à d'autres acquéreurs. Je peux vous accompagner pour le faire de manière simple et claire."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Honoraires",
    titre: "L'acheteur trouve les honoraires élevés",
    description:
      "Répondre à un acheteur qui juge les honoraires trop importants.",
    tags: ["acheteur", "honoraires", "prix", "agence", "valeur"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Les honoraires couvrent tout l'accompagnement de la transaction : organisation des visites, négociation, vérification du dossier et suivi jusqu'à la signature. Ils participent à sécuriser l'opération. L'idée est que vous soyez accompagné jusqu'au bout."
      },
      {
        label: "Valorisation",
        contenu:
          "Au-delà du montant, les honoraires reflètent le travail qui permet d'aboutir à une acquisition dans de bonnes conditions. Ils garantissent un cadre plus fluide, plus sûr et mieux suivi. C'est une vraie valeur d'accompagnement."
      },
      {
        label: "Ferme",
        contenu:
          "Les honoraires font partie du cadre de la transaction et correspondent à une prestation complète. Ils ne se limitent pas à la visite du bien. Mon rôle est de vous accompagner de façon professionnelle jusqu'à la signature."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Comparaison",
    titre: "L'acheteur compare plusieurs biens",
    description:
      "Répondre à un acheteur qui hésite car il regarde plusieurs options.",
    tags: ["acheteur", "comparaison", "biens", "décision", "marché"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "C'est tout à fait normal de comparer plusieurs biens avant de décider. Le plus important est d'identifier celui qui répond vraiment à vos critères essentiels. Si vous le souhaitez, nous pouvons reprendre ensemble les points forts de celui-ci."
      },
      {
        label: "Pédagogique",
        contenu:
          "Comparer plusieurs biens est une bonne démarche, à condition de rester sur les mêmes critères : emplacement, état, budget et potentiel. Cela évite les hésitations floues. Je peux vous aider à faire cette comparaison de manière concrète."
      },
      {
        label: "Directe",
        contenu:
          "Vous avez raison de comparer, mais un bon bien ne reste pas toujours disponible longtemps. Si celui-ci correspond à l'essentiel de vos attentes, il peut être utile de vous positionner rapidement. Je peux répondre à vos derniers doutes si besoin."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Négociation",
    titre: "L'acheteur demande une réponse rapide",
    description:
      "Répondre à un acheteur qui veut une réponse très rapide à son offre ou à sa demande.",
    tags: ["acheteur", "réponse", "offre", "rapidité", "négociation"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends votre attente de rapidité. Je fais le nécessaire pour obtenir un retour dans les meilleurs délais et je vous tiens informé dès que j'ai une réponse. Mon objectif est d'éviter toute attente inutile."
      },
      {
        label: "Transparente",
        contenu:
          "Je relance immédiatement le vendeur, mais le délai final dépend aussi de sa disponibilité pour décider. Je préfère vous donner une information fiable plutôt qu'une promesse trop rapide. Je reviens vers vous dès que j'ai un retour concret."
      },
      {
        label: "Directe",
        contenu:
          "Je vais faire le maximum pour accélérer la réponse. En revanche, je ne peux pas décider à la place du vendeur. Dès que j'ai un retour, vous êtes informé sans délai."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Négociation",
    titre: "L'acheteur souhaite négocier après la visite",
    description:
      "Répondre à un acheteur qui veut négocier juste après la visite.",
    tags: ["acheteur", "visite", "négociation", "offre", "prix"],
    variantes: [
      {
        label: "Prudente",
        contenu:
          "Nous pouvons bien sûr parler de votre positionnement après la visite. L'important est de formuler une offre cohérente avec le bien et le marché. Je peux vous aider à construire une proposition réaliste."
      },
      {
        label: "Argumentée",
        contenu:
          "Une négociation a plus de poids lorsqu'elle repose sur des arguments concrets : travaux à prévoir, comparaison de marché ou contraintes particulières. Si vous souhaitez avancer, nous pouvons bâtir cela proprement. Cela donnera plus de crédibilité à votre offre."
      },
      {
        label: "Directe",
        contenu:
          "Oui, mais il faut que la négociation reste sérieuse. Une offre trop déconnectée du marché risque d'être écartée immédiatement. Je vous conseille de viser une proposition qui ouvre réellement la discussion."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Visite",
    titre: "L'acheteur découvre un défaut dans le bien",
    description:
      "Répondre lorsqu'un défaut est relevé pendant ou après la visite.",
    tags: ["acheteur", "défaut", "bien", "visite", "transparence"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Merci de l'avoir signalé, il est important de traiter ce point clairement. Mon rôle est justement de vous donner une vision la plus transparente possible du bien. Nous pouvons regarder ensemble l'impact réel de cet élément."
      },
      {
        label: "Rassurante",
        contenu:
          "Je comprends que cela puisse vous interroger. L'important est de mesurer si ce défaut remet réellement en cause votre projet ou s'il peut être intégré à votre réflexion. Je peux vous aider à prendre du recul sur ce point."
      },
      {
        label: "Factuelle",
        contenu:
          "Ce défaut doit être pris en compte dans l'analyse globale du bien. Selon sa nature, il peut relever d'un simple ajustement ou justifier une discussion sur le prix. Nous pouvons objectiver cela ensemble avant d'aller plus loin."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Financement",
    titre: "L'acheteur tarde à obtenir son financement",
    description:
      "Répondre à un acheteur en attente de validation bancaire.",
    tags: ["acheteur", "financement", "banque", "délai", "dossier"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends que ces délais puissent être stressants. L'obtention d'un financement prend parfois plus de temps que prévu selon les banques. L'important est de garder un bon suivi du dossier pour avancer dès que possible."
      },
      {
        label: "Transparente",
        contenu:
          "Tant que le financement n'est pas sécurisé, il faut rester prudent sur le calendrier. Je vous recommande de maintenir un contact régulier avec votre interlocuteur bancaire. De mon côté, je vous accompagne pour garder le dossier fluide."
      },
      {
        label: "Directe",
        contenu:
          "Le projet ne pourra avancer concrètement qu'une fois le financement confirmé. Plus vous avez de visibilité sur ce point, plus la suite sera simple. Tenez-moi informé de l'évolution pour que je puisse ajuster le suivi."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Compromis",
    titre: "Le compromis prend du retard",
    description:
      "Informer les parties quand la signature du compromis se décale.",
    tags: ["compromis", "retard", "signature", "vente", "dossier"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Je préfère vous tenir informé clairement : la préparation du compromis prend un peu de retard. Cela peut arriver lorsque certains éléments administratifs doivent encore être sécurisés. Je vous tiens au courant dès que j'ai un nouveau point précis."
      },
      {
        label: "Rassurante",
        contenu:
          "Je comprends que ce décalage puisse être source d'inquiétude. L'essentiel est de finaliser un dossier complet pour éviter des complications ensuite. Je reste mobilisé pour faire avancer les choses au plus vite."
      },
      {
        label: "Factuelle",
        contenu:
          "Le retard vient d'un point documentaire ou de coordination qui doit être réglé avant signature. Ce temps supplémentaire vise à sécuriser la transaction. Je vous communiquerai le prochain jalon dès qu'il est confirmé."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Administratif",
    titre: "Le notaire demande des documents complémentaires",
    description:
      "Répondre quand le notaire réclame des pièces supplémentaires.",
    tags: ["notaire", "documents", "administratif", "dossier", "vente"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Le notaire a besoin de quelques documents complémentaires pour finaliser le dossier correctement. C'est une étape assez classique dans une transaction. Dès que ces pièces sont réunies, la suite pourra avancer plus sereinement."
      },
      {
        label: "Rassurante",
        contenu:
          "Ce type de demande est fréquent et ne remet pas en cause le projet. L'objectif est simplement de sécuriser le dossier avant signature. Je peux vous aider à lister précisément ce qu'il faut transmettre."
      },
      {
        label: "Directe",
        contenu:
          "Sans ces documents, le notaire ne peut pas avancer jusqu'au bout. Il faut donc les rassembler rapidement pour éviter un retard supplémentaire. Dès réception, le dossier pourra reprendre son cours normal."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Gestion locative",
    titre: "Le propriétaire bailleur hésite à confier son bien",
    description:
      "Répondre à un bailleur qui hésite à déléguer la gestion ou la mise en location.",
    tags: ["bailleur", "location", "gestion", "confiance", "bien"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends que confier son bien demande de la confiance. Mon rôle est justement de vous simplifier la mise en location tout en sécurisant le choix du locataire. Vous gardez de la visibilité, sans avoir à tout gérer seul."
      },
      {
        label: "Pédagogique",
        contenu:
          "Confier son bien permet souvent de gagner du temps sur la diffusion, la sélection des dossiers et le suivi administratif. Cela aide aussi à cadrer la relation locative dès le départ. L'objectif est de rendre la gestion plus fluide pour vous."
      },
      {
        label: "Commerciale",
        contenu:
          "Un accompagnement professionnel permet de mettre le bien en valeur plus rapidement et d'attirer des candidatures mieux qualifiées. Cela peut vous éviter beaucoup d'allers-retours. Je peux vous expliquer concrètement comment cela se passe."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Location",
    titre: "Le locataire potentiel présente un dossier incomplet",
    description:
      "Répondre à un candidat locataire dont le dossier n'est pas complet.",
    tags: ["locataire", "dossier", "location", "documents", "candidat"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Merci pour votre dossier. Il manque encore quelques pièces pour que nous puissions l'étudier correctement. Dès que vous me les transmettez, je pourrai le présenter dans de bonnes conditions."
      },
      {
        label: "Directe",
        contenu:
          "Je ne peux pas finaliser l'étude de votre candidature tant que le dossier reste incomplet. J'ai besoin des documents manquants pour avancer. Une fois reçus, je vous fais un retour rapidement."
      },
      {
        label: "Rassurante",
        contenu:
          "Votre candidature peut bien sûr être étudiée, mais il nous manque encore certains éléments. Ce n'est pas bloquant si vous pouvez les envoyer rapidement. Je reste disponible si vous avez besoin d'aide pour vérifier la liste."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Location",
    titre: "Le locataire demande une réduction du loyer",
    description:
      "Répondre à une demande de baisse de loyer avant signature.",
    tags: ["locataire", "loyer", "négociation", "location", "budget"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends bien note de votre demande. Le loyer a été défini en fonction du bien, de son emplacement et du marché local. Je peux transmettre votre position au propriétaire si vous le souhaitez."
      },
      {
        label: "Prudente",
        contenu:
          "Une négociation reste possible, mais elle dépendra de la position du propriétaire et du niveau de demande sur le bien. Si vous souhaitez avancer, je peux lui présenter votre proposition de manière claire. Il décidera ensuite de la suite."
      },
      {
        label: "Directe",
        contenu:
          "Le loyer a été positionné selon le marché actuel. Je peux faire remonter votre demande, mais je ne peux pas garantir qu'elle sera acceptée. Si le bien vous intéresse réellement, il faut aussi tenir compte de la concurrence éventuelle."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Location",
    titre: "Le propriétaire refuse certains candidats",
    description:
      "Répondre à un propriétaire qui écarte trop vite des dossiers de location.",
    tags: ["propriétaire", "location", "candidats", "dossier", "sélection"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre prudence dans le choix du futur locataire. L'important est de rester sur des critères objectifs liés à la solidité du dossier et à la cohérence du projet. Cela permet de prendre une décision plus sereine."
      },
      {
        label: "Pédagogique",
        contenu:
          "Le bon réflexe consiste à analyser la stabilité, la solvabilité et la qualité des garanties apportées. C'est cela qui permet de sécuriser la location sur le fond. Je peux vous aider à comparer les dossiers avec cette grille."
      },
      {
        label: "Directe",
        contenu:
          "Si nous refusons trop vite des dossiers sans base solide, nous risquons d'allonger inutilement la vacance du bien. Je vous recommande de raisonner sur des éléments concrets. Mon rôle est de vous aider à sélectionner efficacement."
      }
    ]
  },
  {
    metier: "Immobilier",
    categorie: "Commercialisation",
    titre: "Le bien reçoit peu de visites",
    description:
      "Expliquer à un propriétaire pourquoi le bien attire peu de visites.",
    tags: ["bien", "visites", "annonce", "prix", "marché"],
    variantes: [
      {
        label: "Factuelle",
        contenu:
          "Le faible nombre de visites montre que quelque chose freine l'intérêt initial, souvent le prix, la présentation ou le positionnement par rapport au marché. Il faut analyser ces points rapidement pour relancer la dynamique. Plus l'ajustement est fait tôt, mieux c'est."
      },
      {
        label: "Transparente",
        contenu:
          "Je préfère vous le dire clairement : le niveau de visites actuel est inférieur à ce que l'on peut attendre. Cela ne veut pas dire que le bien ne se vendra pas, mais qu'un ajustement est sans doute nécessaire. Nous pouvons revoir ensemble la stratégie."
      },
      {
        label: "Commerciale",
        contenu:
          "Le but est maintenant de redonner de l'attractivité au bien pour générer davantage de contacts qualifiés. Une évolution sur la présentation ou sur le prix peut suffire à changer la dynamique. Je vous proposerai les actions les plus utiles."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Prix",
    titre: "Le prospect trouve le prix trop élevé",
    description:
      "Répondre à un prospect B2B qui juge l'offre trop chère.",
    tags: ["prospect", "prix", "valeur", "budget", "offre"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Je comprends votre remarque. Le prix reflète le périmètre de la solution, le niveau d'accompagnement et les résultats attendus. Si vous le souhaitez, nous pouvons reprendre ensemble ce que couvre précisément l'offre."
      },
      {
        label: "Commerciale",
        contenu:
          "L'enjeu n'est pas seulement le coût d'entrée, mais surtout la valeur générée sur la durée. Notre objectif est de vous apporter un résultat mesurable et un déploiement sérieux. Je peux vous aider à regarder cela sous l'angle du retour attendu."
      },
      {
        label: "Ferme",
        contenu:
          "Je préfère vous proposer une offre cohérente avec vos besoins plutôt qu'un prix artificiellement abaissé. Le montant correspond au niveau de service engagé. Si besoin, nous pouvons ajuster le périmètre, mais pas vider l'offre de sa substance."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Négociation",
    titre: "Le prospect demande une remise",
    description:
      "Répondre à une demande de remise commerciale d'un prospect.",
    tags: ["prospect", "remise", "négociation", "prix", "offre"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre demande. Avant de parler remise, j'aimerais m'assurer que le périmètre proposé correspond bien à votre besoin réel. Ensuite, nous pourrons voir s'il existe une marge d'ajustement ou une autre configuration plus adaptée."
      },
      {
        label: "Commerciale",
        contenu:
          "Si votre objectif est d'optimiser le budget, nous pouvons travailler sur le niveau de service ou sur le calendrier plutôt que sur une baisse frontale du prix. Cela permet de conserver une proposition solide. Je vous propose de regarder cela ensemble."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne peux pas accorder une remise sans contrepartie ni ajustement du périmètre. Le prix proposé correspond à l'équilibre de l'offre et aux engagements associés. En revanche, je peux vous proposer une version plus ciblée si nécessaire."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Relance",
    titre: "Le prospect ne répond plus après la démonstration",
    description:
      "Relancer un prospect après une démonstration restée sans réponse.",
    tags: ["prospect", "démo", "relance", "suivi", "réponse"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je me permets de revenir vers vous après notre démonstration. Avez-vous pu partager les éléments en interne et avancer dans votre réflexion ? Je reste à votre disposition si vous souhaitez un complément sur un point précis."
      },
      {
        label: "Commerciale",
        contenu:
          "Suite à notre échange, je voulais savoir si la solution reste une piste active de votre côté. Si certains points bloquent encore, nous pouvons les reprendre rapidement pour vous aider à vous positionner. Je peux aussi vous proposer une synthèse courte à partager en interne."
      },
      {
        label: "Directe",
        contenu:
          "Je reviens vers vous après la démonstration pour savoir si le sujet reste d'actualité. Sans retour, il m'est difficile de savoir si je dois poursuivre les échanges. Un simple message de votre part me permettra de me positionner."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Concurrence",
    titre: "Le prospect compare plusieurs fournisseurs",
    description:
      "Répondre à un prospect qui est en phase de comparaison.",
    tags: ["prospect", "comparaison", "fournisseurs", "concurrence", "choix"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "C'est normal de comparer plusieurs acteurs avant de décider. L'essentiel est de regarder le périmètre réel, le niveau d'accompagnement et les conditions de mise en œuvre. Je peux vous aider à poser une grille de comparaison simple."
      },
      {
        label: "Commerciale",
        contenu:
          "Au-delà du prix, il est souvent utile de comparer la capacité du partenaire à délivrer dans la durée. Notre force réside autant dans la solution que dans l'accompagnement autour. Si vous le souhaitez, je peux vous résumer nos points différenciants."
      },
      {
        label: "Directe",
        contenu:
          "Comparer est sain, à condition de rester sur des critères équivalents. Deux offres peuvent sembler proches tout en étant très différentes dans l'exécution. Je vous propose de regarder cela de façon concrète pour éviter une comparaison trompeuse."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Décision",
    titre: "Le prospect souhaite réfléchir",
    description:
      "Répondre à un prospect qui demande du temps pour réfléchir.",
    tags: ["prospect", "réflexion", "décision", "suivi", "vente"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Bien sûr, je comprends que vous souhaitiez prendre un peu de recul. Pour que je puisse vous accompagner au bon rythme, à quel horizon pensez-vous revenir vers moi ? Je reste disponible si une question se présente d'ici là."
      },
      {
        label: "Rassurante",
        contenu:
          "C'est tout à fait normal de vouloir réfléchir avant de vous engager. L'important est que vous ayez tous les éléments utiles pour décider sereinement. Si besoin, je peux vous envoyer une synthèse très simple à relire tranquillement."
      },
      {
        label: "Directe",
        contenu:
          "Je comprends, mais j'aimerais éviter que le sujet reste ouvert sans suite. Si vous le souhaitez, nous pouvons déjà convenir d'un point de reprise pour garder un cadre clair. Cela vous laisse le temps de réfléchir sans perdre le fil."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Décision",
    titre: "Le prospect reporte sa décision",
    description:
      "Relancer un prospect qui repousse plusieurs fois sa décision.",
    tags: ["prospect", "report", "décision", "relance", "priorité"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que le calendrier ait pu évoluer de votre côté. Pour bien me coordonner avec vos priorités, pouvez-vous me dire si le sujet est simplement décalé ou s'il est moins prioritaire à ce stade ? Cela m'aidera à adapter la suite."
      },
      {
        label: "Directe",
        contenu:
          "Le sujet semble être régulièrement repoussé, ce qui me fait penser qu'il manque peut-être encore un élément pour décider. Si c'est le cas, je préfère l'identifier avec vous plutôt que de laisser le dossier flotter. Nous pouvons en parler simplement."
      },
      {
        label: "Commerciale",
        contenu:
          "Si le projet reste pertinent mais que le timing est compliqué, nous pouvons envisager une approche plus progressive. L'idée est de maintenir la dynamique sans vous mettre de pression inutile. Je peux vous proposer un format plus souple si cela aide."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Décision",
    titre: "Le prospect veut consulter sa direction",
    description:
      "Répondre quand le prospect doit valider avec sa direction.",
    tags: ["prospect", "direction", "validation", "décision", "interne"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "C'est une étape tout à fait normale. Si cela peut vous aider, je peux vous préparer une synthèse claire à partager avec votre direction. L'idée est de vous faire gagner du temps dans cette validation."
      },
      {
        label: "Commerciale",
        contenu:
          "Je peux vous fournir les éléments les plus utiles pour faciliter la décision en interne : objectifs, bénéfices attendus et cadre de mise en œuvre. Cela vous permettra de défendre le sujet plus facilement. Dites-moi simplement le format le plus pratique."
      },
      {
        label: "Directe",
        contenu:
          "Très bien, dans ce cas je vous propose de structurer ensemble ce qui doit être présenté à votre direction. Plus le dossier est clair, plus la décision peut avancer vite. Nous pouvons faire cela en quelques points simples."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Budget",
    titre: "Le prospect estime ne pas avoir le budget",
    description:
      "Répondre à un prospect qui dit ne pas avoir le budget disponible.",
    tags: ["prospect", "budget", "prix", "priorité", "offre"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que le budget soit une contrainte. La bonne question est peut-être de voir si le besoin doit être traité maintenant ou plus tard, et sous quelle forme. Nous pouvons regarder une version plus ciblée si cela a du sens."
      },
      {
        label: "Commerciale",
        contenu:
          "Quand le budget est serré, il peut être utile de prioriser le périmètre pour traiter d'abord l'essentiel. Cela permet d'avancer sans renoncer complètement au projet. Je peux vous proposer un cadre plus progressif."
      },
      {
        label: "Directe",
        contenu:
          "Si le budget n'est pas disponible aujourd'hui, il faut clarifier si le sujet reste important ou non. Cela évite de prolonger des échanges sans perspective réelle. S'il y a un besoin, nous pouvons voir s'il existe une alternative plus adaptée."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Priorité",
    titre: "Le prospect considère que ce n'est pas une priorité",
    description:
      "Répondre à un prospect qui repousse le sujet faute de priorité.",
    tags: ["prospect", "priorité", "timing", "décision", "projet"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends que d'autres sujets puissent passer avant aujourd'hui. Mon objectif est simplement de savoir si ce besoin est différé ou réellement mis de côté. Cela me permettra de vous recontacter au bon moment."
      },
      {
        label: "Commerciale",
        contenu:
          "Si le sujet n'est pas prioritaire maintenant, nous pouvons peut-être le cadrer pour plus tard sans vous mobiliser davantage. L'idée est de garder une base claire pour le reprendre au bon moment. Je peux vous laisser une synthèse simple pour cela."
      },
      {
        label: "Directe",
        contenu:
          "Merci pour votre franchise. Si ce n'est pas une priorité, je préfère le noter clairement plutôt que de relancer dans le vide. Dites-moi simplement s'il faut revenir vers vous plus tard ou clôturer le sujet pour l'instant."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Réassurance",
    titre: "Le prospect demande des références clients",
    description:
      "Répondre à une demande de références ou cas clients.",
    tags: ["prospect", "références", "cas client", "preuve", "confiance"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Bien sûr, c'est une demande tout à fait légitime. Je peux vous partager des références pertinentes par rapport à votre contexte et à votre taille d'organisation. Cela vous donnera une vision concrète de notre manière de travailler."
      },
      {
        label: "Commerciale",
        contenu:
          "Nous avons plusieurs retours clients et exemples d'accompagnement que je peux vous transmettre. L'idée est de vous montrer des cas proches de votre réalité métier. Cela permet souvent de mieux se projeter dans la mise en œuvre."
      },
      {
        label: "Transparente",
        contenu:
          "Oui, je peux vous envoyer des références adaptées à votre besoin. Je préfère sélectionner des exemples vraiment comparables plutôt qu'une liste générique. Vous aurez ainsi des repères plus utiles pour décider."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Offre",
    titre: "Le prospect demande un essai gratuit",
    description:
      "Répondre à une demande d'essai gratuit ou de test préalable.",
    tags: ["prospect", "essai", "gratuit", "test", "offre"],
    variantes: [
      {
        label: "Commerciale",
        contenu:
          "Je comprends votre besoin de vous projeter avant de vous engager. Selon le contexte, nous pouvons envisager une approche de découverte ou un cadrage limité pour valider l'intérêt de la solution. L'idée est de trouver un format utile et réaliste pour les deux parties."
      },
      {
        label: "Transparente",
        contenu:
          "Nous ne proposons pas forcément un essai gratuit standard dans tous les cas, mais nous pouvons regarder un dispositif adapté à votre contexte. Je préfère vous proposer quelque chose de cadré plutôt qu'un test peu exploitable. Parlons de ce que vous cherchez à valider précisément."
      },
      {
        label: "Directe",
        contenu:
          "Un essai n'a de sens que s'il répond à un objectif clair. Si vous voulez mesurer un point précis, je peux vous proposer une manière structurée de le faire. Cela évite un test trop large qui ne mènerait à aucune décision."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Offre",
    titre: "Le prospect demande une proposition plus détaillée",
    description:
      "Répondre à une demande de proposition enrichie.",
    tags: ["prospect", "proposition", "détail", "offre", "clarté"],
    variantes: [
      {
        label: "Pédagogique",
        contenu:
          "Bien sûr, je peux vous fournir une version plus détaillée. L'objectif est que vous ayez une lecture claire du périmètre, des livrables et des conditions de mise en œuvre. Cela vous permettra de valider le projet sur une base plus solide."
      },
      {
        label: "Commerciale",
        contenu:
          "Une proposition plus détaillée est souvent utile pour aligner toutes les parties prenantes. Je peux vous préparer un document plus complet, tout en restant lisible et orienté décision. Dites-moi simplement les points que vous souhaitez voir davantage développés."
      },
      {
        label: "Transparente",
        contenu:
          "Oui, c'est possible. Je préfère simplement m'assurer que le niveau de détail attendu vous sera vraiment utile pour décider. Si nous ciblons les bons points, je pourrai vous envoyer une version enrichie rapidement."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Contrat",
    titre: "Le prospect souhaite raccourcir le contrat",
    description:
      "Répondre à une demande de durée contractuelle plus courte.",
    tags: ["prospect", "contrat", "durée", "engagement", "négociation"],
    variantes: [
      {
        label: "Prudente",
        contenu:
          "Je comprends votre souhait de limiter la durée d'engagement. Nous pouvons regarder si une formule plus courte est envisageable, en fonction du cadre proposé. L'idée est de trouver un équilibre entre souplesse et cohérence économique."
      },
      {
        label: "Transparente",
        contenu:
          "La durée du contrat n'est pas fixée au hasard, elle correspond souvent au temps nécessaire pour déployer correctement la solution et en tirer de la valeur. Cela dit, nous pouvons étudier des alternatives si votre contexte le justifie. Je préfère vous dire clairement ce que cela change."
      },
      {
        label: "Directe",
        contenu:
          "Oui, on peut en parler, mais raccourcir la durée modifie l'équilibre global de l'offre. Si nous réduisons l'engagement, il faudra peut-être ajuster d'autres paramètres. Je préfère poser cela clairement dès le départ."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Contrat",
    titre: "Le prospect refuse l'engagement proposé",
    description:
      "Répondre à un refus sur le niveau d'engagement contractuel.",
    tags: ["prospect", "engagement", "contrat", "risque", "négociation"],
    variantes: [
      {
        label: "Rassurante",
        contenu:
          "Je comprends votre réserve sur ce point. L'engagement proposé vise surtout à donner un cadre stable au projet et à garantir les conditions de déploiement. Nous pouvons en parler pour identifier ce qui vous freine exactement."
      },
      {
        label: "Transparente",
        contenu:
          "Le niveau d'engagement fait partie de l'équilibre de notre proposition. Si ce point bloque, il faut regarder s'il existe un format différent qui reste cohérent pour les deux parties. Je préfère ajuster proprement plutôt que de forcer un cadre qui ne vous convient pas."
      },
      {
        label: "Directe",
        contenu:
          "Si l'engagement proposé ne vous convient pas, il faut clarifier tout de suite ce que vous êtes prêt à accepter. Cela nous évitera de continuer sur une base fragile. Ensuite, nous verrons s'il existe une alternative réaliste."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Renégociation",
    titre: "Le client demande une renégociation tarifaire",
    description:
      "Répondre à un client existant qui demande une baisse de tarif.",
    tags: ["client", "renégociation", "tarif", "prix", "contrat"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends bien note de votre demande. Avant de parler tarif, j'aimerais que nous reprenions ensemble le périmètre réellement utilisé et les enjeux actuels de votre contrat. Cela nous permettra d'avoir une discussion utile et objective."
      },
      {
        label: "Factuelle",
        contenu:
          "Une renégociation ne peut pas se limiter à un montant isolé, elle doit prendre en compte le service rendu, l'usage réel et les engagements associés. Si vous le souhaitez, nous pouvons faire ce point de façon structurée. Ensuite, nous verrons ce qui est envisageable."
      },
      {
        label: "Ferme",
        contenu:
          "Je suis ouvert à en discuter, mais pas à réduire le tarif sans revoir le cadre global. Le prix actuel correspond à un périmètre et à un niveau de service donnés. Toute évolution doit donc rester cohérente avec cela."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Concurrence",
    titre: "Le client menace de partir chez un concurrent",
    description:
      "Répondre à une menace de départ vers un concurrent.",
    tags: ["client", "concurrent", "départ", "fidélisation", "négociation"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends votre retour très au sérieux. Avant toute décision, j'aimerais comprendre précisément ce qui vous fait envisager cette option. Si nous pouvons clarifier le point de blocage, nous aurons peut-être une solution adaptée."
      },
      {
        label: "Rassurante",
        contenu:
          "Notre objectif est de construire une relation durable, donc votre retour est important. S'il y a une insatisfaction ou une attente non couverte, je préfère la traiter clairement avec vous. Nous pouvons faire un point rapide pour voir ce qui peut être amélioré."
      },
      {
        label: "Directe",
        contenu:
          "Si un concurrent vous semble plus adapté, il faut regarder cela de manière factuelle. Comparons ce qui est réellement proposé, les engagements et les impacts pour vous. Ensuite, vous pourrez décider sur une base claire."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Périmètre",
    titre: "Le client demande des fonctionnalités supplémentaires",
    description:
      "Répondre à une demande de fonctionnalités en plus de l'accord initial.",
    tags: ["client", "fonctionnalités", "périmètre", "évolution", "offre"],
    variantes: [
      {
        label: "Commerciale",
        contenu:
          "Votre demande est intéressante et nous pouvons l'étudier. L'essentiel est de voir si elle relève du cadre actuel ou d'une évolution complémentaire. Je vous propose de qualifier le besoin pour vous faire un retour précis."
      },
      {
        label: "Transparente",
        contenu:
          "Ces fonctionnalités supplémentaires ne sont pas forcément incluses dans le périmètre initial. Avant de vous répondre définitivement, je dois vérifier l'impact sur la charge, le planning et le cadre contractuel. Je préfère vous faire une proposition claire."
      },
      {
        label: "Directe",
        contenu:
          "Je peux regarder cette demande, mais elle doit être cadrée avant d'être intégrée. Dès qu'on sort du périmètre initial, il faut vérifier les conséquences sur le projet. Ensuite, nous pourrons décider si cela s'ajoute ou non."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Déploiement",
    titre: "Le client se plaint du délai de mise en œuvre",
    description:
      "Répondre à une insatisfaction sur le délai de déploiement.",
    tags: ["client", "délai", "mise en oeuvre", "déploiement", "projet"],
    variantes: [
      {
        label: "Transparente",
        contenu:
          "Je comprends votre insatisfaction sur ce délai. La mise en œuvre dépend de plusieurs étapes de coordination, et je préfère vous partager une vision réaliste plutôt qu'une promesse imprécise. Nous allons faire un point clair sur la suite."
      },
      {
        label: "Rassurante",
        contenu:
          "Je comprends que ce timing puisse vous mettre sous pression. Mon objectif est de sécuriser le déploiement sans brûler d'étapes qui pourraient générer des difficultés ensuite. Nous pouvons revoir ensemble les prochaines échéances."
      },
      {
        label: "Factuelle",
        contenu:
          "Le délai observé vient de points précis dans la mise en œuvre, qu'il s'agisse de validation, de préparation ou de coordination. Je vais vous détailler cela pour que vous ayez une vision concrète. Ensuite, nous pourrons ajuster le plan si nécessaire."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Négociation",
    titre: "Le client demande un geste commercial",
    description:
      "Répondre à une demande de geste commercial d'un client existant.",
    tags: ["client", "geste commercial", "négociation", "relation", "tarif"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je prends bien note de votre demande. Avant de vous répondre, j'aimerais regarder le contexte global de notre collaboration et ce qui motive cette attente. Cela me permettra de vous faire un retour cohérent."
      },
      {
        label: "Commerciale",
        contenu:
          "Si un geste commercial peut aider à fluidifier la relation, nous pouvons bien sûr l'étudier. L'important est qu'il s'inscrive dans un cadre équilibré et utile pour la suite. Je vous propose de regarder cela ensemble rapidement."
      },
      {
        label: "Ferme",
        contenu:
          "Je ne souhaite pas promettre un geste commercial sans analyse du contexte. Toute évolution doit rester cohérente avec le service rendu et avec notre cadre actuel. Je préfère vous répondre clairement après vérification."
      }
    ]
  },
  {
    metier: "Commercial B2B",
    categorie: "Signature",
    titre: "Le client tarde à signer le contrat",
    description:
      "Relancer un client qui a validé le fond mais tarde à signer.",
    tags: ["client", "contrat", "signature", "relance", "décision"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je me permets de revenir vers vous concernant le contrat transmis. Y a-t-il un point qui bloque encore la signature de votre côté ? Je reste disponible pour lever rapidement toute question restante."
      },
      {
        label: "Directe",
        contenu:
          "Le projet semble prêt sur le fond, mais la signature tarde encore. J'aimerais m'assurer qu'il n'y a pas de point de blocage particulier. Un retour de votre part me permettra d'avancer de manière plus claire."
      },
      {
        label: "Commerciale",
        contenu:
          "Si tout vous convient sur le fond, nous pouvons finaliser rapidement pour enclencher la suite sans perdre de temps. Si un détail doit encore être ajusté, autant le traiter maintenant. L'idée est de sécuriser le démarrage dans de bonnes conditions."
      }
    ]
  }
] as const;
