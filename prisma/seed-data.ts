export const situations = [
  {
    metier: "Artisan",
    categorie: "Devis",
    titre: "Le client trouve le devis trop cher",
    description:
      "Répondre avec clarté et professionnalisme quand un client estime que le devis dépasse son budget.",
    tags: ["prix", "objection", "valeur", "devis"],
    variantes: [
      {
        label: "Diplomatique",
        contenu:
          "Je comprends votre remarque. Ce devis reflète le temps nécessaire, la qualité des matériaux et le soin apporté à l'intervention. Si vous le souhaitez, je peux vous détailler chaque poste pour vous aider à mieux visualiser la valeur de la prestation."
      },
      {
        label: "Ferme",
        contenu:
          "Le tarif proposé correspond au niveau de qualité, au temps d'exécution et aux garanties incluses. Je préfère vous présenter un prix juste pour un travail fiable plutôt qu'une estimation sous-évaluée."
      },
      {
        label: "Négociation",
        contenu:
          "Si ce budget est trop élevé pour vous, nous pouvons regarder ensemble s'il existe une alternative sur le périmètre ou les finitions, tout en conservant une solution cohérente et professionnelle."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Relance",
    titre: "Le client ne répond plus après l'envoi du devis",
    description:
      "Relancer sans pression excessive après l'envoi d'un devis, tout en restant disponible et crédible.",
    tags: ["suivi", "relance", "devis", "client"],
    variantes: [
      {
        label: "Relance douce",
        contenu:
          "Je me permets de revenir vers vous concernant le devis transmis. N'hésitez pas à me dire si vous avez besoin d'une précision ou d'un ajustement, je reste à votre disposition."
      },
      {
        label: "Relance classique",
        contenu:
          "Je reviens vers vous au sujet du devis envoyé afin de savoir si vous avez pu en prendre connaissance. Je reste disponible pour échanger et répondre à vos questions si besoin."
      },
      {
        label: "Dernière relance",
        contenu:
          "Sans retour de votre part, je me permets de faire un dernier point concernant le devis transmis. Si votre projet est toujours d'actualité, je peux bien sûr reprendre avec vous quand vous le souhaitez."
      }
    ]
  },
  {
    metier: "Artisan",
    categorie: "Planning",
    titre: "Le client demande une intervention urgente alors que le planning est complet",
    description:
      "Répondre à une demande urgente en préservant la relation client, même quand l'agenda ne permet pas d'intervenir immédiatement.",
    tags: ["urgence", "planning", "disponibilite", "organisation"],
    variantes: [
      {
        label: "Empathique",
        contenu:
          "Je comprends l'urgence de votre situation. Mon planning est actuellement complet, mais je peux regarder si une solution se libère rapidement ou vous proposer le premier créneau disponible."
      },
      {
        label: "Directe",
        contenu:
          "Je préfère être transparent avec vous: je n'ai pas de disponibilité immédiate à ce jour. En revanche, je peux vous positionner sur mon prochain créneau libre."
      },
      {
        label: "Alternative",
        contenu:
          "Je ne peux pas intervenir en urgence dans l'immédiat, mais je peux soit vous proposer mon prochain créneau, soit vous orienter vers une autre solution si cela peut vous aider à gagner du temps."
      }
    ]
  }
] as const;
