// Word banks for band name generation
const fantasyWords = [
    'Dragon', 'Shadow', 'Crystal', 'Mystic', 'Phoenix', 'Raven', 'Storm', 'Frost',
    'Ancient', 'Ethereal', 'Celestial', 'Crimson', 'Midnight', 'Twilight', 'Enchanted',
    'Arcane', 'Mythic', 'Astral', 'Eldritch', 'Fae',
    'Beholder', 'Mindflayer', 'Lich', 'Dracolich', 'Tarrasque', 'Owlbear',
    'Displacer', 'Wyrm', 'Chimera', 'Revenant', 'Drow', 'Aboleth',
    'Portal', 'Phylactery', 'Artifact', 'Vault', 'Spellbook', 'Grimoire',
    'Sanctum', 'Covenant', 'Planar', 'Sigil', 'Threshold',
    'Warlock', 'Paladin', 'Artificer', 'Necromancer', 'Archfey', 'Hexblade'
];

const emoWords = [
    'Tears', 'Heart', 'Sorrow', 'Broken', 'Silence', 'Whisper', 'Memory', 'Lost',
    'Autumn', 'Winter', 'Darkness', 'Echo', 'Hollow', 'Despair', 'Moonlight',
    'Requiem', 'Lament', 'Solitude', 'Melancholy', 'Void',
    'Anguish', 'Agony', 'Torment', 'Suffering', 'Misery', 'Heartache', 'Grief', 'Pain',
    'Regret', 'Longing', 'Yearning', 'Demise', 'Desolation', 'Affliction',
    'Twilight', 'Midnight', 'Reverie', 'Embrace', 'Passion', 'Romance', 'Desire',
    'Symphony', 'Elegy', 'Nocturne', 'Rhapsody', 'Ballad',
    'Storm', 'Rain', 'Frost', 'Shadow', 'Mist', 'Thunder', 'Eclipse', 'Dusk',
    'Abyss', 'Fog', 'Snow', 'Tempest', 'Dawn', 'Ember'
];

const adjectiveWords = [
    'Gloomy', 'Serene', 'Enigmatic', 'Dreary', 'Ethereal', 'Mysterious', 'Haunting', 'Somber',
    'Forsaken', 'Spectral', 'Mournful', 'Twilight', 'Nocturnal', 'Shadowy', 'Forlorn', 'Desolate',
    'Arcane', 'Celestial', 'Ancient', 'Mystical', 'Enchanted', 'Astral', 'Eldritch', 'Mythical',
    'Melancholic', 'Wistful', 'Yearning', 'Forgotten', 'Lonesome', 'Sorrowful', 'Woeful', 'Tragic',
    'Misty', 'Stormy', 'Frozen', 'Windswept', 'Moonlit', 'Starlit', 'Winterborn', 'Thunderous'
];

const numberToWords = [
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
];

// Helper function to pluralize words
function pluralize(word) {
    const specialCases = {
        'Phoenix': 'Phoenixes',
        'Lich': 'Liches',
        'Dracolich': 'Dracoliches',
        'Sanctuary': 'Sanctuaries',
        'Memory': 'Memories',
        'Prophecy': 'Prophecies',
    };

    if (specialCases[word]) {
        return specialCases[word];
    }

    if (word.endsWith('y')) {
        return word.slice(0, -1) + 'ies';
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z') || 
               word.endsWith('ch') || word.endsWith('sh')) {
        return word + 'es';
    } else {
        return word + 's';
    }
}

const bandNameTemplates = [
    (fantasy, emo, adjective, number) => `${fantasy} and ${emo}`,
    (fantasy, emo, adjective, number) => `${emo} and ${fantasy}`,
    (fantasy, emo, adjective, number) => `${emo} ${fantasy}`,
    (fantasy, emo, adjective, number) => `${adjective} ${fantasy} ${emo}`,
    (fantasy, emo, adjective, number) => `The ${adjective} ${fantasy} of ${emo}`,
    (fantasy, emo, adjective, number) => `${number} ${adjective} ${pluralize(fantasy)}`,
    (fantasy, emo, adjective, number) => `The ${fantasy} ${emo}`,
    (fantasy, emo, adjective, number) => `${fantasy} in ${emo}`,
    (fantasy, emo, adjective, number) => `Beyond the ${fantasy}'s ${emo}`,
    (fantasy, emo, adjective, number) => `Through the ${fantasy}'s ${emo}`,
    (fantasy, emo, adjective, number) => `My ${fantasy} ${emo}`,
    (fantasy, emo, adjective, number) => `Dear ${adjective} ${fantasy}`,
    (fantasy, emo, adjective, number) => `Your ${fantasy} in My ${emo}`,
    (fantasy, emo, adjective, number) => `We, the ${adjective} ${pluralize(fantasy)}`,
    (fantasy, emo, adjective, number) => `${fantasy} of ${emo}`,
    (fantasy, emo, adjective, number) => `${emo} of the ${adjective} ${fantasy}`
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateBandName() {
    const fantasyWord = getRandomElement(fantasyWords);
    const emoWord = getRandomElement(emoWords);
    const adjectiveWord = getRandomElement(adjectiveWords);
    const numberToWord = getRandomElement(numberToWords);
    const template = getRandomElement(bandNameTemplates);
    return template(fantasyWord, emoWord, adjectiveWord, numberToWord);
}

// DOM Elements
const bandNameElement = document.getElementById('bandName');
const generateButton = document.getElementById('generateBtn');
let isGenerating = false;

function updateBandName() {
    if (isGenerating) return;
    
    isGenerating = true;
    generateButton.disabled = true;
    
    try {
        bandNameElement.textContent = generateBandName();
    } catch (error) {
        console.error('Error generating band name:', error);
        bandNameElement.textContent = 'Error generating name';
    } finally {
        // Keep button disabled briefly to prevent spam
        setTimeout(() => {
            isGenerating = false;
            generateButton.disabled = false;
        }, 250);
    }
}

// Event Listeners
generateButton.addEventListener('click', updateBandName);

// Generate initial band name
document.addEventListener('DOMContentLoaded', updateBandName);
