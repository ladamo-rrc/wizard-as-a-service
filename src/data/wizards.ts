interface Wizards {
    id: string;
    name: string;
    domain: string;
    description: string;
    positiveResponses: string[],
    negativeResponses: string[],
    imageUrl: string;
}

export const wizardsArray: Wizards[] = [
    {
        id: "wizard1",
        name: "Grand Wizard Gwyn",
        domain: "Domain of Light",
        description: `Grand Wizard Gwyn is over a million years old. 
        He is the founder and guardian of the Wizard Tower, 
        a refuge where wizards and magic are able to flourish freely. 
        The wizard tower is a place of infinite learning, camaraderie, and power. 
        Despite his immense age and wisdom, Gwyn maintains a warm humour and serves as 
        a guiding light to all who seek his council. He believe magic is to be shared, 
        and that even the mightiest wizard never stops learning. His hobbies change every 
        few millennia. He's currently fascinated with mortal superstitions about magic, 
        (He finds it rather silly.) and collecting spoons.`,
        positiveResponses: [
            "Quite the strong prophecy",
            "It seems fortune is on your side today",
        ],
        negativeResponses: [
            "Goodness Gracious! Would you like me to cast a protection spell for you?",
            "...yikes",
            "Not even my grandiose power can save you from this amount of bad luck."
        ],
        imageUrl: "image here"
    },

    {
        id: "wizard2",
        name: "Blizzard the Wizard Lizard",
        domain: "Domain of Frost",
        description: `Blizzard is a Siamese blue crested lizard who stowed away 
        in Gwyn's hood during one of his travels. 
        Gwyn unknowingly brought the little lizard back to the tower, 
        ut they soon became fast friends. The seasons changed, and winter eventually came. 
        The little lizard was enchanted by snow, something that should have killed him. 
        Heartbroken by the lizard's longing, Gwyn reached across dimensions for stardust from his 
        interdimensional wizard friend, Nul. After successful tests on vegetables 
        (which now waddle about the tower), Gwyn injected the stardust into the little lizard's heart, 
        lacing his blood and essence with the power of the stars that would keep him warm forever. 
        The moment he could safely touch snow, he burst outside and rolled in it with pure joy, earning his
        name as the warm glow from his heart made his scales sparkle. Only later did Gwyn realize he'd created
        someone with the potential to become the universe's greatest winter mage`,
        positiveResponses: [
            "krrrrr--rkkk ~ !/n(Wow that sounds great!)",
            "gggrrrrr zzzzrrkrkkkk !!! /n(I think I'm getting good at this!)",
        ],

        negativeResponses: [
            "grrrrrr.... rrkkkkkrrr- /n(Uh oh, maybe the ball is broken.",
            "rkkkkk! rrrrrgrrrr sssss /n(Wow, I haven't seen a prophecy that bad in a while)",
            "sssszzzzz.. rrkrrrkkkkk. /n(Do you have a will prepared?)"
        ],
        imageUrl: "path/to/image"
    },

    {
        id: "wizard3",
        name: "Nul",
        domain: "???",
        description: `Nul is an interdimensional being Gwyn befriended during his travels across the universe. 
        It was there, in Nul's home realm, that the two became close and Gwyn learned to understand the 
        shimmering celestial symbols through which Nul communicates. Years later, Nul simply appeared at the Wizard 
        Tower one day—and never left. Days became months, months became years, years became centuries, and he's 
        remained at the tower ever since. Draped in opulent purple robes with his hood perpetually raised, his 
        true face remains a mystery; beneath the fabric, his limbs are inky tendrils that can morph into any form 
        and harden into the strongest, unbreakable solid. When Gwyn once tried to remove his hood when studying his 
        fascinating essence, Nul screamed and nearly created a black hole that would have destroyed the Tower, 
        Gwyn now understands that the hood stays on. His reasons for staying at the Tower remain as enigmatic as 
        everything else about him`,
        positiveResponses:[
            "⟡ ✶⋆✸˙ ˖✦⊹✶⋆✧° ⟢✧˖✦✧✴˙✧ ⋆✷⋆✧ ⟡˙˙ ✦☆✧☆˚˙✧◦⋆✧ ˖✦✧✷⋆✧ ⊹⟡˙ ✸˙⊹˚✷⋆ ❀⊹☆˚⋆⟡˙✧⟢✧°/n(In my home, these are normal everyday happenings, but I believe here on your planet, it's called 'good luck!')",
            "⋆☆˚ ✦☆⋆☆˚☆˚ ⋆☆˚✴˙⊹ ✴˙˖✦⊹♪⊹✧⟡⟡⟡ ✶⋆✧ ⋆⟡˙ ˙✶⋆⋆✩⊹✧ ⊹❋✺ ✸˙⊹˚ ♪⊹˙⟢✧˖✦ ✸˙⊹˚✷⋆ ❀⊹⋆⟡˙⟢✧✴˙ ❀⊹˚☆˚☆˚☆˚✧⟡⟡⟡ ⟡⟡⟡⊹♪⊹⟡˙✦! /n(Oh my! The stars are practically dancing! Either that or I need to clean this crystal ball better)"
        ],
        negativeResponses:[
            "✧˙⟡⟡⟡⟡⟡˙⟡˙✩⊹✦˚✴˙⊹ ✴˙ ˖✦⊹✶⋆✧° ⟢✧˖✦✧✴˙✧ ⋆✷ ˖✦⊹⟢✧˖✦✧✴˙✶⋆✧° ⟢✧˖✦✧✴˙✧ ⋆✷ /n(Well... at least it can't get worse than this! Actually, wait, let me check again. Oh no, it can)",
            "⟢✧˖✦✧✴˙⟢✧˖✦✧✴☆˚☆˚ ⋆☆˚✴˙⊹ ✴˙˖˙˙ ˖✦⊹✶⋆✧˙ ˖✦⊹✶⋆✧˙˖✦⊹♪⊹✧⟡⟡⟡ ✶⋆✧ ⋆⟡ ✦ ✸˙⊹˚✷⋆ ❀⊹⋆⟡˙⟢✧✴˙ /n(I've consulted the stars, the crystal ball, and my better judgment. They all recommend hiding)",

        ],
        imageUrl: "path/here"
    },
    {
        id: "wizard4",
        name: "Patch",
        domain: "???",
        description: ``,
        positiveResponses:[],
        negativeResponses:[],
        imageUrl: "path/here"
    },
    {
        id: "wizard5",
        name: "Arthur",
        domain: "???",
        description: ``,
        positiveResponses:[],
        negativeResponses:[],
        imageUrl: "path/here"
    },
    {
        id: "wizard6",
        name: "Ooloh",
        domain: "???",
        description: ``,
        positiveResponses:[],
        negativeResponses:[],
        imageUrl: "path/here"
    },
    {
        id: "wizard7",
        name: "Nul",
        domain: "???",
        description: ``,
        positiveResponses:[],
        negativeResponses:[],
        imageUrl: "path/here"
    },
]