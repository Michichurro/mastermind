// FASE 2: LA ENTREVISTA CIEGA (Micro-Filtro)
// 5 preguntas, cada respuesta suma +3 puntos a un arquetipo específico

export const phase2Questions = {
    es: [
        {
            id: 1,
            title: "PREGUNTA 1: El Enemigo",
            question: "¿Qué es lo peor que le podría pasar a tu marca?",
            options: [
                { text: "Que nos vean aburridos", archetype: 'bufon', points: 3 },
                { text: "Que haya caos y descontrol", archetype: 'gobernante', points: 3 },
                { text: "Que seamos irrelevantes o débiles", archetype: 'heroe', points: 3 },
                { text: "Quedarnos estancados o atrapados", archetype: 'explorador', points: 3 },
                { text: "Hacer daño a alguien o ser egoístas", archetype: 'cuidador', points: 3 },
                { text: "Ser engañados o ignorantes", archetype: 'sabio', points: 3 }
            ]
        },
        {
            id: 2,
            title: "PREGUNTA 2: La Promesa",
            question: "Cuando un cliente te compra, en el fondo, ¿qué está comprando?",
            options: [
                { text: "Una experiencia mágica que transforma su realidad", archetype: 'mago', points: 3 },
                { text: "Status, éxito y exclusividad", archetype: 'gobernante', points: 3 },
                { text: "Algo simple, puro y feliz", archetype: 'inocente', points: 3 },
                { text: "Una herramienta para romper las reglas", archetype: 'rebelde', points: 3 },
                { text: "Algo que dura para siempre y está bien hecho", archetype: 'creador', points: 3 },
                { text: "Amor, placer y belleza", archetype: 'amante', points: 3 }
            ]
        },
        {
            id: 3,
            title: "PREGUNTA 3: El Tono de Voz",
            question: "Si tu marca hablara en una cena, ¿cómo sería?",
            options: [
                { text: "Intelectual, analítica y experta", archetype: 'sabio', points: 3 },
                { text: "Rebelde, sarcástica o disruptiva", archetype: 'rebelde', points: 3 },
                { text: "Amigable, realista y 'uno más del grupo'", archetype: 'hombre_comun', points: 3 },
                { text: "Cálida, maternal y protectora", archetype: 'cuidador', points: 3 },
                { text: "Inspiradora, enérgica y motivadora", archetype: 'heroe', points: 3 },
                { text: "Creativa, artística y visionaria", archetype: 'creador', points: 3 }
            ]
        },
        {
            id: 4,
            title: "PREGUNTA 4: El Valor Central",
            question: "¿Qué valora más tu marca por encima de todo?",
            options: [
                { text: "La conexión profunda y las relaciones genuinas", archetype: 'amante', points: 3 },
                { text: "La innovación y crear algo único", archetype: 'creador', points: 3 },
                { text: "La aventura y la exploración constante", archetype: 'explorador', points: 3 },
                { text: "La alegría y hacer que la vida sea divertida", archetype: 'bufon', points: 3 },
                { text: "El poder de transformar realidades", archetype: 'mago', points: 3 },
                { text: "La pureza y la simplicidad", archetype: 'inocente', points: 3 }
            ]
        },
        {
            id: 5,
            title: "PREGUNTA 5: La Motivación",
            question: "¿Qué impulsa realmente a tu marca cada día?",
            options: [
                { text: "Demostrar que somos los mejores", archetype: 'heroe', points: 3 },
                { text: "Desafiar el status quo y crear cambio", archetype: 'rebelde', points: 3 },
                { text: "Cuidar y proteger a nuestra comunidad", archetype: 'cuidador', points: 3 },
                { text: "Ser parte de algo más grande", archetype: 'hombre_comun', points: 3 },
                { text: "Mantener el control y la excelencia", archetype: 'gobernante', points: 3 },
                { text: "Descubrir y compartir la verdad", archetype: 'sabio', points: 3 }
            ]
        },
        {
            id: 6,
            title: "PREGUNTA 6: El Legado",
            question: "¿Qué huella imborrable quieres dejar en el mundo?",
            options: [
                { text: "Que la vida es para disfrutarla con alegría", archetype: 'bufon', points: 3 },
                { text: "Que hay un mundo infinito por descubrir", archetype: 'explorador', points: 3 },
                { text: "Que la realidad siempre puede transformarse", archetype: 'mago', points: 3 },
                { text: "Que la felicidad es simple y pura", archetype: 'inocente', points: 3 },
                { text: "Que cada persona es especial y digna de amor", archetype: 'amante', points: 3 },
                { text: "Que todos somos iguales y pertenecemos", archetype: 'hombre_comun', points: 3 }
            ]
        }
    ],
    en: [
        {
            id: 1,
            title: "QUESTION 1: The Enemy",
            question: "What is your brand most afraid of? What's the worst that could happen?",
            options: [
                { text: "Being seen as boring", archetype: 'bufon', points: 3 },
                { text: "Chaos and lack of control", archetype: 'gobernante', points: 3 },
                { text: "Being irrelevant or weak", archetype: 'heroe', points: 3 },
                { text: "Getting stuck or trapped", archetype: 'explorador', points: 3 },
                { text: "Hurting someone or being selfish", archetype: 'cuidador', points: 3 },
                { text: "Being deceived or ignorant", archetype: 'sabio', points: 3 }
            ]
        },
        {
            id: 2,
            title: "QUESTION 2: The Promise",
            question: "When a customer buys from you, what are they really buying?",
            options: [
                { text: "A magical experience that transforms their reality", archetype: 'mago', points: 3 },
                { text: "Status, success, and exclusivity", archetype: 'gobernante', points: 3 },
                { text: "Something simple, pure, and happy", archetype: 'inocente', points: 3 },
                { text: "A tool to break the rules", archetype: 'rebelde', points: 3 },
                { text: "Something that lasts forever and is well-made", archetype: 'creador', points: 3 },
                { text: "Love, pleasure, and beauty", archetype: 'amante', points: 3 }
            ]
        },
        {
            id: 3,
            title: "QUESTION 3: The Voice",
            question: "If your brand spoke at a dinner party, how would it sound?",
            options: [
                { text: "Intellectual, analytical, and expert", archetype: 'sabio', points: 3 },
                { text: "Rebellious, sarcastic, or disruptive", archetype: 'rebelde', points: 3 },
                { text: "Friendly, down-to-earth, and relatable", archetype: 'hombre_comun', points: 3 },
                { text: "Warm, nurturing, and protective", archetype: 'cuidador', points: 3 },
                { text: "Inspiring, energetic, and motivating", archetype: 'heroe', points: 3 },
                { text: "Creative, artistic, and visionary", archetype: 'creador', points: 3 }
            ]
        },
        {
            id: 4,
            title: "QUESTION 4: Core Value",
            question: "What does your brand value most above all else?",
            options: [
                { text: "Deep connection and genuine relationships", archetype: 'amante', points: 3 },
                { text: "Innovation and creating something unique", archetype: 'creador', points: 3 },
                { text: "Adventure and constant exploration", archetype: 'explorador', points: 3 },
                { text: "Joy and making life fun", archetype: 'bufon', points: 3 },
                { text: "The power to transform realities", archetype: 'mago', points: 3 },
                { text: "Purity and simplicity", archetype: 'inocente', points: 3 }
            ]
        },
        {
            id: 5,
            title: "QUESTION 5: Motivation",
            question: "What really drives your brand every day?",
            options: [
                { text: "Proving we're the best", archetype: 'heroe', points: 3 },
                { text: "Challenging the status quo and creating change", archetype: 'rebelde', points: 3 },
                { text: "Caring for and protecting our community", archetype: 'cuidador', points: 3 },
                { text: "Being part of something bigger", archetype: 'hombre_comun', points: 3 },
                { text: "Maintaining control and excellence", archetype: 'gobernante', points: 3 },
                { text: "Discovering and sharing the truth", archetype: 'sabio', points: 3 }
            ]
        },
        {
            id: 6,
            title: "QUESTION 6: The Legacy",
            question: "What indelible mark do you want to leave on the world?",
            options: [
                { text: "That life is meant to be enjoyed with joy", archetype: 'bufon', points: 3 },
                { text: "That there is an infinite world to discover", archetype: 'explorador', points: 3 },
                { text: "That reality can always be transformed", archetype: 'mago', points: 3 },
                { text: "That happiness is simple and pure", archetype: 'inocente', points: 3 },
                { text: "That everyone is special and worthy of love", archetype: 'amante', points: 3 },
                { text: "That we are all equal and we belong", archetype: 'hombre_comun', points: 3 }
            ]
        }
    ]
};
