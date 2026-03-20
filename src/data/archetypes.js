export const archetypes = [
    // 🔴 GRUPO ROJO: ACCIÓN
    {
        id: 'inocente',
        group: 'red',
        groupName: { es: 'ACCIÓN', en: 'ACTION' },
        color: '#E05066',
        keyword: { es: 'OPTIMISMO', en: 'OPTIMISM' },
        image: '/images/archetypes/inocente.svg',
        cardImage: '/images/archetypes/card_inocente.svg',
        name: { es: 'El Inocente', en: 'The Innocent' },
        groupDescription: { es: 'INDEPENDENCIA & REALIZACIÓN', en: 'INDEPENDENCE & ACHIEVEMENT' },
        tagline: { es: 'CREATIVIDAD, IMPULSO, CONOCIMIENTO', en: 'CREATIVITY, DRIVE, KNOWLEDGE' },
        keywords: { es: ['Optimismo', 'Seguridad', 'Simplicidad'], en: ['Optimism', 'Safety', 'Simplicity'] },
        description: {
            es: 'Se esfuerza por ser feliz y libre. Teme hacer algo malo y ser castigado.',
            en: 'Strives to be happy and free. They fear doing something wrong and being punished.'
        },
        examples: ['Coca-Cola', 'Dove', 'Nintendo', 'Aveeno', 'Innocent Drinks', 'Evian']
    },
    {
        id: 'explorador',
        group: 'red',
        groupName: { es: 'ACCIÓN', en: 'ACTION' },
        color: '#E05066',
        keyword: { es: 'LIBERTAD', en: 'FREEDOM' },
        image: '/images/archetypes/explorador.svg',
        cardImage: '/images/archetypes/card_explorador.svg',
        name: { es: 'El Explorador', en: 'The Explorer' },
        groupDescription: { es: 'INDEPENDENCIA & REALIZACIÓN', en: 'INDEPENDENCE & ACHIEVEMENT' },
        tagline: { es: 'CREATIVIDAD, IMPULSO, CONOCIMIENTO', en: 'CREATIVITY, DRIVE, KNOWLEDGE' },
        keywords: { es: ['Libertad', 'Descubrimiento', 'Autonomía'], en: ['Freedom', 'Discovery', 'Autonomy'] },
        description: {
            es: 'Mantiene su independencia y anhela el paraíso. Teme quedar atrapado.',
            en: 'Maintains independence and yearns for paradise. They fear getting trapped.'
        },
        examples: ['Jeep', 'North Face', 'Patagonia', 'NASA', 'GoPro', 'National Geographic']
    },
    {
        id: 'sabio',
        group: 'red',
        groupName: { es: 'ACCIÓN', en: 'ACTION' },
        color: '#E05066',
        keyword: { es: 'CONOCIMIENTO', en: 'KNOWLEDGE' },
        image: '/images/archetypes/sabio.svg',
        cardImage: '/images/archetypes/card_sabio.svg',
        name: { es: 'El Sabio', en: 'The Sage' },
        groupDescription: { es: 'INDEPENDENCIA & REALIZACIÓN', en: 'INDEPENDENCE & ACHIEVEMENT' },
        tagline: { es: 'CREATIVIDAD, IMPULSO, CONOCIMIENTO', en: 'CREATIVITY, DRIVE, KNOWLEDGE' },
        keywords: { es: ['Sabiduría', 'Inteligencia', 'Verdad'], en: ['Wisdom', 'Intelligence', 'Truth'] },
        description: {
            es: 'Busca comprender el mundo a través de la inteligencia y el análisis.',
            en: 'Seeks to understand the world through intelligence and analysis.'
        },
        examples: ['Google', 'BBC', 'TED', 'Harvard', 'The Economist', 'Discovery Channel']
    },

    // 🔵 GRUPO AZUL: CONEXIÓN
    {
        id: 'amante',
        group: 'blue',
        groupName: { es: 'CONEXIÓN', en: 'CONNECTION' },
        color: '#6CCDF5',
        keyword: { es: 'INTIMIDAD', en: 'INTIMACY' },
        image: '/images/archetypes/amante.svg',
        cardImage: '/images/archetypes/card_amante.svg',
        name: { es: 'El Amante', en: 'The Lover' },
        groupDescription: { es: 'AFILIACIÓN & CONEXIÓN', en: 'AFFILIATION & CONNECTION' },
        tagline: { es: 'EMOCIONES, VÍNCULO & AMOR', en: 'EMOTIONS, BOND & LOVE' },
        keywords: { es: ['Intimidad', 'Pasión', 'Conexión'], en: ['Intimacy', 'Passion', 'Connection'] },
        description: {
            es: 'Busca tener una relación con las personas, el trabajo y el entorno que ama.',
            en: 'Seeks to be in a relationship with the people, work and surroundings they love.'
        },
        examples: ['Chanel', 'Victoria\'s Secret', 'Godiva', 'Alfa Romeo', 'Häagen-Dazs', 'Baileys']
    },
    {
        id: 'bufon',
        group: 'blue',
        groupName: { es: 'CONEXIÓN', en: 'CONNECTION' },
        color: '#6CCDF5',
        keyword: { es: 'DIVERSIÓN', en: 'FUN' },
        image: '/images/archetypes/bufon.svg',
        cardImage: '/images/archetypes/card_bufon.svg',
        name: { es: 'El Bufón', en: 'The Jester' },
        groupDescription: { es: 'AFILIACIÓN & CONEXIÓN', en: 'AFFILIATION & CONNECTION' },
        tagline: { es: 'EMOCIONES, VÍNCULO & AMOR', en: 'EMOTIONS, BOND & LOVE' },
        keywords: { es: ['Alegría', 'Humor', 'Juego'], en: ['Joy', 'Humor', 'Play'] },
        description: {
            es: 'Vive el momento con total disfrute. Teme aburrirse o aburrir a otros.',
            en: 'Lives in the moment with full enjoyment. They fear being bored or boring others.'
        },
        examples: ['M&M\'s', 'Old Spice', 'Ben & Jerry\'s', 'Fanta', 'Mailchimp', 'Skittles']
    },
    {
        id: 'cuidador',
        group: 'blue',
        groupName: { es: 'CONEXIÓN', en: 'CONNECTION' },
        color: '#6CCDF5',
        keyword: { es: 'SERVICIO', en: 'SERVICE' },
        image: '/images/archetypes/cuidador.svg',
        cardImage: '/images/archetypes/card_cuidador.svg',
        name: { es: 'El Cuidador', en: 'The Caregiver' },
        groupDescription: { es: 'AFILIACIÓN & CONEXIÓN', en: 'AFFILIATION & CONNECTION' },
        tagline: { es: 'EMOCIONES, VÍNCULO & AMOR', en: 'EMOTIONS, BOND & LOVE' },
        keywords: { es: ['Servicio', 'Compasión', 'Generosidad'], en: ['Service', 'Compassion', 'Generosity'] },
        description: {
            es: 'Impulsado por el deseo de proteger y cuidar a otros. Teme el egoísmo y la ingratitud.',
            en: 'Driven by the desire to protect and care for others. They fear selfishness and ingratitude.'
        },
        examples: ['Johnson & Johnson', 'UNICEF', 'Volvo', 'Pampers', 'WWF', 'Toms']
    },

    // 🟡 GRUPO AMARILLO: DESCUBRIMIENTO
    {
        id: 'heroe',
        group: 'yellow',
        groupName: { es: 'DESCUBRIMIENTO', en: 'DISCOVERY' },
        color: '#F3D55A',
        keyword: { es: 'SUPERACIÓN', en: 'MASTERY' },
        image: '/images/archetypes/heroe.svg',
        cardImage: '/images/archetypes/card_heroe.svg',
        name: { es: 'El Héroe', en: 'The Hero' },
        groupDescription: { es: 'CAMBIO Y RIESGO', en: 'CHANGE & RISK' },
        tagline: { es: 'DESAFÍO, CONFLICTO & TRANSFORMACIÓN', en: 'CHALLENGE, CONFLICT & TRANSFORMATION' },
        keywords: { es: ['Maestría', 'Coraje', 'Crecimiento'], en: ['Mastery', 'Courage', 'Growth'] },
        description: {
            es: 'Quiere demostrar su valor a través de actos valientes. Teme la debilidad y la vulnerabilidad.',
            en: 'Wants to prove their worth through courageous acts. They fear weakness and vulnerability.'
        },
        examples: ['Nike', 'FedEx', 'BMW', 'Adidas', 'Gatorade', 'Under Armour']
    },
    {
        id: 'rebelde',
        group: 'yellow',
        groupName: { es: 'DESCUBRIMIENTO', en: 'DISCOVERY' },
        color: '#F3D55A',
        keyword: { es: 'INDEPENDENCIA', en: 'INDEPENDENCE' },
        image: '/images/archetypes/rebelde.svg',
        cardImage: '/images/archetypes/card_rebelde.svg',
        name: { es: 'El Rebelde', en: 'The Outlaw' },
        groupDescription: { es: 'CAMBIO Y RIESGO', en: 'CHANGE & RISK' },
        tagline: { es: 'DESAFÍO, CONFLICTO & TRANSFORMACIÓN', en: 'CHALLENGE, CONFLICT & TRANSFORMATION' },
        keywords: { es: ['Revolución', 'Disrupción', 'Liberación'], en: ['Revolution', 'Disruption', 'Liberation'] },
        description: {
            es: 'Impulsado por un deseo de revolución o venganza. Teme ser impotente.',
            en: 'Driven by a desire for revolution or revenge. They fear being powerless.'
        },
        examples: ['Harley-Davidson', 'Virgin', 'Diesel', 'MTV', 'Red Bull', 'Vans']
    },
    {
        id: 'mago',
        group: 'yellow',
        groupName: { es: 'DESCUBRIMIENTO', en: 'DISCOVERY' },
        color: '#F3D55A',
        keyword: { es: 'TRANSFORMACIÓN', en: 'TRANSFORMATION' },
        image: '/images/archetypes/mago.svg',
        cardImage: '/images/archetypes/card_mago.svg',
        name: { es: 'El Mago', en: 'The Magician' },
        groupDescription: { es: 'CAMBIO Y RIESGO', en: 'CHANGE & RISK' },
        tagline: { es: 'DESAFÍO, CONFLICTO & TRANSFORMACIÓN', en: 'CHALLENGE, CONFLICT & TRANSFORMATION' },
        keywords: { es: ['Transformación', 'Visión', 'Poder'], en: ['Transformation', 'Vision', 'Power'] },
        description: {
            es: 'Quiere comprender las leyes fundamentales del universo. Teme las consecuencias negativas no deseadas.',
            en: 'Wants to understand the fundamental laws of the universe. They fear unintended negative consequences.'
        },
        examples: ['Apple', 'Disney', 'Dyson', 'Tesla', 'Mastercard', 'TEDx']
    },

    // 🟢 GRUPO VERDE: ESTRUCTURA
    {
        id: 'creador',
        group: 'green',
        groupName: { es: 'ESTRUCTURA', en: 'STRUCTURE' },
        color: '#5CAA8C',
        keyword: { es: 'IMAGINACIÓN', en: 'INNOVATION' },
        image: '/images/archetypes/creador.svg',
        cardImage: '/images/archetypes/card_creador.svg',
        name: { es: 'El Creador', en: 'The Creator' },
        groupDescription: { es: 'ESTABILIDAD & CONTROL', en: 'STABILITY & CONTROL' },
        tagline: { es: 'SEGURIDAD, PERMANENCIA', en: 'SECURITY, PERMANENCE' },
        keywords: { es: ['Innovación', 'Arte', 'Imaginación'], en: ['Innovation', 'Artistry', 'Imagination'] },
        description: {
            es: 'Impulsado por el deseo de crear cosas de valor duradero. Teme la mediocridad.',
            en: 'Driven by the desire to create things of enduring value. They fear mediocrity.'
        },
        examples: ['Lego', 'Adobe', 'Pinterest', 'Etsy', 'Canon', 'Pixar']
    },
    {
        id: 'hombre_comun',
        group: 'green',
        groupName: { es: 'ESTRUCTURA', en: 'STRUCTURE' },
        color: '#5CAA8C',
        keyword: { es: 'PERTENECER', en: 'BELONGING' },
        image: '/images/archetypes/hombre_comun.svg',
        cardImage: '/images/archetypes/card_hombre_comun.svg',
        name: { es: 'El Hombre Común', en: 'The Everyman' },
        groupDescription: { es: 'ESTABILIDAD & CONTROL', en: 'STABILITY & CONTROL' },
        tagline: { es: 'SEGURIDAD, PERMANENCIA', en: 'SECURITY, PERMANENCE' },
        keywords: { es: ['Conexión', 'Comodidad', 'Igualdad'], en: ['Connection', 'Comfort', 'Equality'] },
        description: {
            es: 'Quiere pertenecer y encajar. Teme destacar o ser rechazado.',
            en: 'Wants to belong and fit in. They fear standing out or being rejected.'
        },
        examples: ['IKEA', 'Visa', 'Levi\'s', 'Gap', 'Ford', 'Nivea']
    },
    {
        id: 'gobernante',
        group: 'green',
        groupName: { es: 'ESTRUCTURA', en: 'STRUCTURE' },
        color: '#5CAA8C',
        keyword: { es: 'AUTORIDAD', en: 'POWER' },
        image: '/images/archetypes/gobernante.svg',
        cardImage: '/images/archetypes/card_gobernante.svg',
        name: { es: 'El Gobernante', en: 'The Ruler' },
        groupDescription: { es: 'ESTABILIDAD & CONTROL', en: 'STABILITY & CONTROL' },
        tagline: { es: 'SEGURIDAD, PERMANENCIA', en: 'SECURITY, PERMANENCE' },
        keywords: { es: ['Control', 'Liderazgo', 'Responsabilidad'], en: ['Control', 'Leadership', 'Responsibility'] },
        description: {
            es: 'Crea orden del caos. Teme el caos y ser derrocado.',
            en: 'Creates order from chaos. They fear chaos and being overthrown.'
        },
        examples: ['Rolex', 'Mercedes-Benz', 'Microsoft', 'American Express', 'Hugo Boss', 'Louis Vuitton']
    }
];

export const getArchetypesByGroup = (group) => {
    return archetypes.filter(archetype => archetype.group === group);
};
