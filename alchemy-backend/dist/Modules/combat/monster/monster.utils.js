"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolTheProtector = exports.FireSerpent = exports.FireSpirit = exports.TheEye = exports.LavaGolem = exports.ChaoticDragon = exports.SpiderQueen = exports.VampireLord = exports.CarnivorousPlant = exports.Tangleroot = exports.IceWyvern = exports.IceGiant = exports.FrozenTerror = exports.FrostTroll = exports.Mammoth = exports.Manticore = exports.SandGolem = exports.DustDevil = exports.SandBeast = exports.SandCrab = exports.GoblinChief = exports.GoblinBerserker = exports.Hobgoblin = exports.GoblinArcher = exports.Goblin = exports.Meats = exports.Breads = exports.Potatoes = exports.Onions = void 0;
const body_utils_1 = require("./items/body.utils");
const consumable_utils_1 = require("./items/consumable.utils");
const hands_utils_1 = require("./items/hands.utils");
const legs_utils_1 = require("./items/legs.utils");
const offhand_utils_1 = require("./items/offhand.utils");
const weapon_utils_1 = require("./items/weapon.utils");
exports.Onions = Object.freeze({
    name: 'Onion',
    health: 20,
    maxHealth: 20,
    attack: 11,
    defence: 1,
    evasion: 640,
    accuracy: 640,
    level: 1,
    xp: 30,
    gold: 1,
    attackSpeed: 3,
    loot: Object.freeze([consumable_utils_1.Onion]),
    area: 0,
    description: `
  The Onion was born in a humble garden plot, nestled between rows of carrots and potatoes. It was a small and unremarkable onion, with a modest bulb and thin green shoots that reached toward the sun.`
});
exports.Potatoes = Object.freeze({
    name: 'Potato',
    health: 50,
    maxHealth: 50,
    attack: 30,
    defence: 10,
    evasion: 480,
    accuracy: 640,
    level: 10,
    xp: 100,
    gold: 10,
    attackSpeed: 4,
    loot: Object.freeze([consumable_utils_1.Potato]),
    area: 0,
    description: `
  The Potato was grown in the rich soil of the nearby mountains, and it's a hearty specimen with a thick skin and a dense, starchy flesh. Don't be fooled by its appearance, though - this tuber packs a punch and won't go down without a fight.`
});
exports.Breads = Object.freeze({
    name: 'Bread',
    health: 100,
    maxHealth: 100,
    attack: 50,
    defence: 20,
    evasion: 320,
    accuracy: 640,
    level: 20,
    xp: 250,
    gold: 20,
    attackSpeed: 5,
    loot: Object.freeze([consumable_utils_1.Bread]),
    area: 0,
    description: `
  The Bread is a hearty loaf made from the finest wheat and grains, baked to perfection in the village bakery. But don't be fooled by its comforting aroma and soft crust - this bread is a formidable opponent, and it won't go down without a fight.`
});
exports.Meats = Object.freeze({
    name: 'Meat',
    health: 200,
    maxHealth: 200,
    attack: 100,
    defence: 40,
    evasion: 160,
    accuracy: 640,
    level: 30,
    xp: 500,
    gold: 50,
    attackSpeed: 6,
    loot: Object.freeze([consumable_utils_1.Meat]),
    area: 0,
    description: `
  The Meat is a massive beast with bulging muscles and razor-sharp teeth. It's the ultimate challenge for any adventurer, and many have fallen to its brutal attacks. If you encounter this fearsome foe, be prepared for the fight of your life.`
});
exports.Goblin = Object.freeze({
    name: 'Goblin',
    health: 50,
    maxHealth: 50,
    attack: 23,
    defence: 1,
    evasion: 640,
    accuracy: 640,
    level: 1,
    xp: 30,
    gold: 5,
    attackSpeed: 4,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 1,
    description: `Goblins are small, mischievous monsters typically depicted as having green skin, pointy ears, and sharp, crooked teeth. They are often depicted as wearing tattered clothing or armor and carrying crude weapons such as spears or clubs. Goblins are known for their cunning and love of causing trouble, often sneaking into human settlements to steal food and valuables or playing pranks on unsuspecting travelers. They are considered to be one of the lowest and most cowardly of the humanoid monsters, but their tenacity and resourcefulness can make them formidable opponents in large numbers.`
});
exports.GoblinArcher = Object.freeze({
    name: 'Goblin Archer',
    health: 100,
    maxHealth: 100,
    attack: 27,
    defence: 1,
    evasion: 896,
    accuracy: 896,
    level: 6,
    xp: 75,
    gold: 15,
    attackSpeed: 3,
    loot: Object.freeze([
        weapon_utils_1.Shortbow,
        weapon_utils_1.Longbow,
        body_utils_1.LeatherBody,
        legs_utils_1.LeatherChaps,
        hands_utils_1.LeatherGloves,
    ]),
    area: 1,
    description: `A goblin archer is a small, agile monster that is skilled in the use of a bow and arrow. They typically have green or brown skin, long pointy ears, and sharp teeth, and they are often dressed in rags or tattered clothing. Goblin archers are known for their accuracy and quick reflexes, and they are often employed as scouts and ranged attackers by their larger goblin tribes. They are also adept at setting traps and ambushes, using their bows to strike from a distance before disappearing back into the shadows. Despite their small size, goblin archers can be dangerous foes, especially when they are able to attack from a distance and keep their enemies at bay.`
});
exports.Hobgoblin = Object.freeze({
    name: 'Hobgoblin',
    health: 150,
    maxHealth: 150,
    attack: 32,
    defence: 1,
    evasion: 1216,
    accuracy: 1216,
    level: 12,
    xp: 200,
    gold: 35,
    attackSpeed: 4,
    loot: Object.freeze([
        weapon_utils_1.Shortbow,
        weapon_utils_1.Longbow,
        body_utils_1.LeatherBody,
        legs_utils_1.LeatherChaps,
        hands_utils_1.LeatherGloves,
    ]),
    area: 1,
    description: `A hobgoblin is a larger and more powerful cousin to the goblin, typically standing over six feet tall and possessing a muscular build. They have reddish-brown or dark green skin, prominent fangs, and often wear crude armor and wield weapons like axes or maces. Hobgoblins are known for their intelligence and cunning, and are often leaders or commanders of goblin tribes. They are more disciplined and organized than their smaller counterparts, and can form effective military units on the battlefield. Hobgoblins are also skilled in hand-to-hand combat, and can overpower their opponents with their strength and ferocity. Despite their brutish appearance, hobgoblins can be shrewd negotiators and are often found working as mercenaries or agents for more powerful factions.`
});
exports.GoblinBerserker = Object.freeze({
    name: 'Goblin Berserker',
    health: 250,
    maxHealth: 250,
    attack: 52,
    defence: 1,
    evasion: 3276,
    accuracy: 2886,
    level: 33,
    xp: 250,
    gold: 55,
    attackSpeed: 4,
    loot: Object.freeze([
        weapon_utils_1.Shortbow,
        weapon_utils_1.Longbow,
        body_utils_1.LeatherBody,
        legs_utils_1.LeatherChaps,
        hands_utils_1.LeatherGloves,
    ]),
    area: 1,
    description: `A goblin berserker is a ferocious and unpredictable monster that specializes in close combat. They are smaller than hobgoblins, but more muscular and aggressive, with bulging muscles and wild, unkempt hair. Goblin berserkers are often adorned with warpaint and bone jewelry, and they charge into battle with reckless abandon, wielding large weapons like two-handed swords or battle axes. They are known for their bloodlust and lack of fear, often pushing themselves to the brink of exhaustion in order to overwhelm their opponents. In battle, goblin berserkers are difficult to control, sometimes attacking their own allies in their frenzied state. Despite their lack of discipline, goblin berserkers can be formidable foes, especially in large numbers, and they are often used as shock troops by goblin tribes.`
});
exports.GoblinChief = Object.freeze({
    name: 'Goblin Chief',
    health: 800,
    maxHealth: 800,
    attack: 212,
    defence: 1,
    evasion: 18216,
    accuracy: 14256,
    level: 101,
    xp: 1000,
    gold: 150,
    attackSpeed: 4,
    loot: Object.freeze([
        weapon_utils_1.Shortbow,
        weapon_utils_1.Longbow,
        body_utils_1.LeatherBody,
        legs_utils_1.LeatherChaps,
        hands_utils_1.LeatherGloves,
    ]),
    area: 1,
    description: `A goblin chief is a cunning and ruthless leader that commands respect and fear from their subordinates. They are often larger and more imposing than other goblins, with ornate armor and weapons that distinguish them from their underlings. Goblin chiefs are skilled in both combat and strategy, and they are able to rally their troops and inspire them to fight with greater ferocity. They are also known for their treachery and betrayal, and will not hesitate to backstab allies or enemies if it benefits their own interests. Goblin chiefs often rely on subterfuge and deception to achieve their goals, using their wits and guile to outmaneuver their opponents. Despite their small stature, goblin chiefs are formidable foes, and their armies can be a significant threat to larger and more organized factions.`
});
exports.SandCrab = Object.freeze({
    name: 'Sand Crab',
    health: 600,
    maxHealth: 600,
    attack: 42,
    defence: 1,
    evasion: 2886,
    accuracy: 2001,
    level: 33,
    xp: 30,
    gold: 30,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 2,
    description: `A sand crab is a burrowing creature that lives in arid and desert regions. It has a tough exoskeleton that protects it from predators and the harsh environment, and large pincers that it uses for defense and to catch prey. Sand crabs are expert diggers, able to quickly disappear beneath the sand when threatened or searching for food. They are omnivorous, feeding on insects, small animals, and plants that they find in the desert. Sand crabs are also able to extract moisture from the sand, allowing them to survive in areas where water is scarce. Despite their ability to burrow, sand crabs are not completely safe from predators, and are often hunted by birds of prey and other desert-dwelling predators. However, they are an important part of the desert ecosystem, providing a source of food for many other creatures and helping to aerate the sand.`
});
exports.SandBeast = Object.freeze({
    name: 'Sand Beast',
    health: 600,
    maxHealth: 600,
    attack: 124,
    defence: 1,
    evasion: 5500,
    accuracy: 5700,
    level: 60,
    xp: 65,
    gold: 65,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 2,
    description: `A sand beast is a fearsome predator that stalks the arid dunes and desert plains. It is a massive, muscular creature with powerful legs that allow it to run at incredible speeds across the sand. Its thick hide is covered in coarse, matted fur that helps to protect it from the intense heat of the sun, and its long, sharp claws are capable of tearing through the toughest of prey. Sand beasts are opportunistic hunters, preying on anything that crosses their path, from small rodents to large desert animals. They are also known for their ability to burrow beneath the sand, lying in wait for unsuspecting prey to come within range. Despite their fearsome reputation, sand beasts are not invincible, and they are often hunted by skilled desert hunters and other apex predators. Nonetheless, encountering a sand beast in the wild is a terrifying prospect, and few creatures are able to match its speed and ferocity in combat.`
});
exports.DustDevil = Object.freeze({
    name: 'Dust Devil',
    health: 800,
    maxHealth: 800,
    attack: 148,
    defence: 2,
    evasion: 5700,
    accuracy: 5900,
    level: 70,
    xp: 85,
    gold: 85,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 2,
    description: `A dust devil monster is a fearsome creature that resembles the natural phenomenon it's named after. It is a towering vortex of swirling dust and debris, with multiple twisting arms that lash out at anything in their path. The dust devil monster is capable of creating powerful gusts of wind that can knock over even the sturdiest of structures, and its rotating arms can tear apart anything they come into contact with. It is a relentless and unstoppable force of destruction that leaves chaos and devastation in its wake. The dust devil monster is often summoned by powerful desert sorcerers or shaman, who use its destructive power for their own purposes. It is a creature of chaos, and its arrival is often accompanied by ominous signs such as howling winds and dark clouds of dust. Few creatures are able to stand up to the might of the dust devil monster, and those that do often find themselves battered and broken by its relentless assault.`
});
exports.SandGolem = Object.freeze({
    name: 'Sand Golem',
    health: 1000,
    maxHealth: 1000,
    attack: 172,
    defence: 4,
    evasion: 5900,
    accuracy: 6100,
    level: 80,
    xp: 105,
    gold: 105,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 2,
    description: `A sand golem monster is a massive creature made entirely of sand and rock. It is brought to life by powerful magic, often by sorcerers seeking to create a powerful guardian or weapon. The sand golem monster towers over its opponents, standing several times the height of an average human. Its body is a mass of swirling sand and rock, constantly shifting and reshaping itself as it moves. The sand golem monster is nearly impervious to physical attacks, as its body is able to absorb and disperse the force of blows. It is also able to control the sand and rock around it, using them to create powerful whirlwinds or hurl projectiles at its enemies. Despite its formidable size and strength, the sand golem monster is not invincible. It is vulnerable to water and can be weakened or even destroyed by large quantities of it. However, few opponents are able to muster the resources or skill required to defeat this powerful creature. The sand golem monster is a force to be reckoned with, and those who cross its path do so at their own peril.`
});
exports.Manticore = Object.freeze({
    name: 'Manticore',
    health: 1200,
    maxHealth: 1200,
    attack: 196,
    defence: 6,
    evasion: 6100,
    accuracy: 6300,
    level: 90,
    xp: 125,
    gold: 125,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 2,
    description: `A manticore monster is a fearsome creature that combines the features of a lion, a scorpion, and a dragon. It is a massive creature, with the body of a lion, the tail of a scorpion, and the wings of a dragon. Its body is covered in tough, scaly armor, and its long tail is tipped with a deadly venomous stinger. The manticore monster is also able to breathe fire, making it an even more dangerous opponent. The manticore monster is a solitary hunter, preying on anything that crosses its path. It is known for its incredible strength and speed, as well as its cunning intelligence. The manticore monster is also able to speak, and is said to have a voice that can drive men mad with fear. Few creatures are able to stand up to the might of the manticore monster, and those that do often do so at great peril. The manticore monster is a creature of legend, and its very presence is enough to strike fear into the hearts of even the bravest warriors.`
});
exports.Mammoth = Object.freeze({
    name: 'Mammoth',
    health: 1200,
    maxHealth: 1200,
    attack: 196,
    defence: 6,
    evasion: 6100,
    accuracy: 6300,
    level: 90,
    xp: 125,
    gold: 125,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 3,
    description: `A mammoth monster is a colossal creature that resembles the prehistoric woolly mammoth. It is a massive, shaggy beast, standing several stories tall at the shoulders. Its body is covered in a thick coat of fur that is impervious to cold and wind, and its tusks are long and razor-sharp, capable of tearing through even the toughest of materials. The mammoth monster is an unstoppable force of nature, capable of demolishing entire buildings or charging through armies with ease. It is a solitary creature, roaming the frigid wastelands and tundras in search of food and shelter. The mammoth monster is a formidable opponent, and its massive size and strength make it nearly invincible to all but the most powerful of attacks. However, it is also a creature of instinct, and can sometimes be distracted or deterred by unexpected obstacles or events. Despite its fearsome reputation, the mammoth monster is not inherently evil, and some tribes of humans and other creatures have been known to form alliances with it, using its immense power for their own purposes.`
});
exports.FrostTroll = Object.freeze({
    name: 'Frost Troll',
    health: 1400,
    maxHealth: 1400,
    attack: 220,
    defence: 8,
    evasion: 6300,
    accuracy: 6500,
    level: 100,
    xp: 145,
    gold: 145,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 3,
    description: `A frost troll monster is a fearsome creature that roams the icy tundras and mountains of the world. It is a towering beast, standing several times the height of an average human, with skin as hard as stone and claws like razors. Its body is covered in thick, shaggy fur that provides it with protection from the cold, and its eyes are like glowing red coals that seem to burn with an inner fire. The frost troll monster is a savage predator, hunting any prey that it comes across, and is capable of taking down even the largest of creatures. It is also known for its incredible regenerative abilities, able to heal from even the most grievous of wounds in a matter of hours. The frost troll monster is a creature of the wild, and is rarely encountered in areas inhabited by humans or other civilized beings. However, when it does cross paths with such beings, it is a formidable opponent, capable of unleashing a barrage of attacks that can quickly incapacitate or kill its foes. The frost troll monster is a creature of legend, feared by all who know of its existence, and is said to be almost impossible to kill, save for a few rare weaknesses that must be exploited to bring it down.`
});
exports.FrozenTerror = Object.freeze({
    name: 'Frozen Terror',
    health: 1600,
    maxHealth: 1600,
    attack: 244,
    defence: 10,
    evasion: 6500,
    accuracy: 6700,
    level: 110,
    xp: 165,
    gold: 165,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 3,
    description: `The Frozen Terror is a monstrous creature that dwells in the icy tundras and frozen wastelands. It is a towering beast, covered in thick fur and ice crystals that glitter in the sunlight. Its eyes are a piercing blue, and its claws are sharp as razors. The Frozen Terror is a formidable predator, capable of taking down prey many times its size. It is also incredibly resilient to cold, able to withstand even the harshest blizzards without so much as a shiver. Those who encounter the Frozen Terror should beware, as it is a fearsome foe that will stop at nothing to claim its next meal.`
});
exports.IceGiant = Object.freeze({
    name: 'Ice Giant',
    health: 1800,
    maxHealth: 1800,
    attack: 268,
    defence: 12,
    evasion: 6700,
    accuracy: 6900,
    level: 120,
    xp: 185,
    gold: 185,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 3,
    description: `The Ice Giant is a towering creature of immense size and strength. It stands at least ten feet tall, with broad shoulders and powerful muscles rippling beneath its icy blue skin. Its eyes glow with an inner light, and its beard is made of jagged icicles. The Ice Giant is a master of the frozen tundras and snow-capped mountains, capable of manipulating ice and snow with ease to create formidable obstacles and deadly traps. Its massive hands can crush boulders and its roar can shake the very earth. The Ice Giant is a force to be reckoned with, and those who dare to cross its path would do well to beware its wrath.`
});
exports.IceWyvern = Object.freeze({
    name: 'Ice Wyvern',
    health: 2000,
    maxHealth: 2000,
    attack: 292,
    defence: 14,
    evasion: 6900,
    accuracy: 7100,
    level: 130,
    xp: 205,
    gold: 205,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 3,
    description: `The Ice Wyvern is a fearsome creature with the body of a dragon and the wings of a bat, but with shimmering scales and razor-sharp claws made of ice. Its eyes are a piercing blue, and its breath is a blast of frozen air that can freeze even the toughest of foes. The Ice Wyvern is a master of the skies, soaring effortlessly through the freezing clouds and attacking its prey from above with deadly precision. Its long, slender tail can strike with lightning speed, knocking its enemies off balance and leaving them vulnerable to its freezing attacks. Those who face the Ice Wyvern in battle must be quick and agile to avoid its freezing breath and powerful strikes, or risk being frozen solid by its icy grip.`
});
exports.Tangleroot = Object.freeze({
    name: 'Tangleroot',
    health: 2200,
    maxHealth: 2200,
    attack: 316,
    defence: 16,
    evasion: 7100,
    accuracy: 7300,
    level: 140,
    xp: 225,
    gold: 225,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 4,
    description: `The Tangleroot is a terrifying creature that lurks in the depths of the forest, waiting to ensnare its prey in its tangle of roots and vines. Its body is made up of twisted wood and thorny vines, and its eyes glow with an eerie green light. The Tangleroot is a master of camouflage, blending in perfectly with the trees and foliage around it, making it difficult to spot until it's too late. Its tendrils can whip out with lightning speed, entangling its victims and dragging them closer to its gnashing teeth. The Tangleroot is a deadly predator, capable of taking down even the strongest of prey with its powerful jaws and deadly roots. Those who venture into the forest should be wary of the Tangleroot, lest they become trapped in its clutches forever.`
});
exports.CarnivorousPlant = Object.freeze({
    name: 'Carnivorous Plant',
    health: 2400,
    maxHealth: 2400,
    attack: 340,
    defence: 18,
    evasion: 7300,
    accuracy: 7500,
    level: 150,
    xp: 245,
    gold: 245,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 4,
    description: `The Carnivorous Plant is a monstrous entity that resembles a giant, fleshy flower with a gaping maw lined with razor-sharp teeth. It waits in the shadows, its leaves and tendrils twitching with anticipation, waiting for unsuspecting prey to come within reach. The scent it emits is sweet and alluring, tempting creatures to come closer and fall prey to its insatiable hunger. Once something comes too close, the Carnivorous Plant strikes with lightning speed, snaring its victim with its tendrils and dragging it into its gaping maw. The plant's digestive enzymes dissolve its prey within seconds, leaving nothing but a pile of bones and clothing behind. The Carnivorous Plant is a dangerous predator that can be found in swamps, jungles, and other places where moisture and heat are plentiful. Anyone who ventures into its territory should be careful not to fall into its clutches.`
});
exports.VampireLord = Object.freeze({
    name: 'Vampire Lord',
    health: 2600,
    maxHealth: 2600,
    attack: 364,
    defence: 20,
    evasion: 7500,
    accuracy: 7700,
    level: 160,
    xp: 265,
    gold: 265,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 4,
    description: 'The Vampire Lord is an ancient and powerful creature of the night, with a regal bearing and an insatiable thirst for blood. Its skin is as white as snow, its eyes are a piercing red, and its fangs are long and razor-sharp. The Vampire Lord is a master of deception, able to charm and manipulate even the strongest of wills with its hypnotic gaze and seductive voice. It can also control lesser vampires and other undead creatures, using them as its minions to do its bidding. The Vampire Lord is nearly invulnerable to most forms of attack, able to regenerate quickly from even the most grievous wounds. Its strength and speed are also unmatched, allowing it to effortlessly overpower its prey. The Vampire Lord is a feared and respected creature among the undead, ruling over its domain with an iron fist. Those who cross its path should beware, as they may find themselves powerless to resist its charms and doomed to become its next meal.'
});
exports.SpiderQueen = Object.freeze({
    name: 'Spider Queen',
    health: 2800,
    maxHealth: 2800,
    attack: 388,
    defence: 22,
    evasion: 7700,
    accuracy: 7900,
    level: 170,
    xp: 285,
    gold: 285,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 4,
    description: `The Spider Queen is a monstrous creature that lurks in the dark corners of abandoned caves and deep forests, surrounded by her web of loyal arachnid minions. Her body is that of a giant spider, with multiple sets of legs and a bloated abdomen filled with venomous sacs. But she is also different from her spider minions, with a humanoid torso, an alluring yet terrifying face, and a crown of fangs that could crush bones. The Spider Queen is a master of deception and illusion, able to ensnare even the most experienced adventurer in her web of lies. She is also a formidable fighter, using her razor-sharp fangs and venomous attacks to cripple and paralyze her prey before slowly feeding on their flesh. The Spider Queen's domain is a twisted and dark place, filled with webbed corridors and sticky traps that are nearly impossible to escape. Those who venture into her lair should be careful, lest they become entangled in her web and become her next meal.`
});
exports.ChaoticDragon = Object.freeze({
    name: 'Chaotic Dragon',
    health: 3000,
    maxHealth: 3000,
    attack: 412,
    defence: 24,
    evasion: 7900,
    accuracy: 8100,
    level: 180,
    xp: 305,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 4,
    description: `The Chaotic Dragon Owl is a fearsome and unpredictable creature, with a body resembling that of a great horned owl but with iridescent scales of every color covering its feathers. Its eyes are a brilliant gold, and its talons are razor-sharp, capable of tearing through stone and steel with ease. The Chaotic Dragon Owl is a master of the elements, able to summon powerful winds, bolts of lightning, and streams of fire to rain down upon its enemies. It is also a creature of chaos, with an unpredictable nature that can cause havoc and destruction wherever it goes. The Chaotic Dragon Owl's powers and temperament are linked, so the more chaotic it becomes, the more powerful its attacks become. Those who face the Chaotic Dragon Owl in battle should be prepared for anything, as its powers and tactics are constantly changing. The Chaotic Dragon Owl is a formidable opponent that few are brave enough to face.`
});
exports.LavaGolem = Object.freeze({
    name: 'Lava Golem',
    health: 4000,
    maxHealth: 4000,
    attack: 516,
    defence: 32,
    evasion: 8000,
    accuracy: 8200,
    level: 200,
    xp: 405,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 5,
    description: `A Lava Golem is a fearsome creature born from the depths of volcanic activity. Its massive body is made of molten lava, giving it a fiery appearance and a terrifying aura. It towers over most beings, with its immense size and strength making it a force to be reckoned with. The creature's body constantly oozes magma, creating a hazardous environment for anything nearby. Its eyes glow with an intense heat, and its roar is like the rumble of an erupting volcano. Beware the Lava Golem, for it is a formidable foe that few can withstand.`
});
exports.TheEye = Object.freeze({
    name: 'The Eye',
    health: 6000,
    maxHealth: 6000,
    attack: 724,
    defence: 48,
    evasion: 8200,
    accuracy: 8400,
    level: 240,
    xp: 605,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 5,
    description: `The Eye is a mysterious monster that appears to be nothing more than a giant, disembodied eyeball. Its single eye is massive, and it glows with a strange and eerie light. The Eye is known for its ability to see all, even through walls and obstacles, and it is said that it can even peer into the minds of those around it. The creature is incredibly elusive and difficult to catch, as it has the ability to disappear into thin air at will. Those who have encountered The Eye report feeling a sense of unease, as if they are being watched and studied by an unknown entity. Beware The Eye, for it is a monster that holds many secrets and has the power to uncover your own.`
});
exports.FireSpirit = Object.freeze({
    name: 'Fire Spirit',
    health: 8000,
    maxHealth: 8000,
    attack: 932,
    defence: 64,
    evasion: 8400,
    accuracy: 8600,
    level: 280,
    xp: 805,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 5,
    description: `A Fire Spirit is a mischievous monster that is born from the flames themselves. It takes the form of a small, glowing creature that dances and flickers like a flame. Despite its small size, the Fire Spirit is incredibly powerful and can manipulate flames to its will. It is known for playing pranks on those who cross its path, using its fire powers to set things ablaze or create illusions to confuse its enemies. The Fire Spirit is also fiercely loyal to those who earn its trust, and it can be a valuable ally in battle. However, it is important to remember that this creature is not to be underestimated, as it has the potential to cause great harm if provoked. Beware the Fire Spirit, for its flames are not to be trifled with.`
});
exports.FireSerpent = Object.freeze({
    name: 'Lava Monster',
    health: 7000,
    maxHealth: 7000,
    attack: 828,
    defence: 56,
    evasion: 8300,
    accuracy: 8500,
    level: 260,
    xp: 705,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 5,
    description: `A Lava monster is a formidable creature that is born from the molten core of a volcano. Its body is made entirely of lava and magma, giving it a fearsome appearance and a scorching heat. The Lava monster's movements are slow and deliberate, as if it is taking its time to savor the destruction it leaves in its wake. Its body constantly emits intense heat, and anything that comes into contact with it is instantly incinerated. The creature's roar is like the rumble of an erupting volcano, and it can create waves of molten lava with a single stomp of its foot. The Lava monster is a force of nature that few can withstand, and it is not to be trifled with. Beware the Lava monster, for its fiery wrath is relentless.`
});
exports.SolTheProtector = Object.freeze({
    name: 'Sol The Protector',
    health: 5000,
    maxHealth: 5000,
    attack: 1000,
    defence: 40,
    evasion: 8100,
    accuracy: 8300,
    level: 220,
    xp: 505,
    gold: 305,
    attackSpeed: 3,
    loot: Object.freeze([weapon_utils_1.BronzeAxe, offhand_utils_1.BronzeShield, weapon_utils_1.BronzeDagger]),
    area: 5,
    description: `Sol the Protector is a fearsome Lava Dragon that rules over the fiery depths of a volcano. Its scales are made of hardened lava, giving it an impervious defense against most attacks. Sol is a powerful and cunning creature that possesses a fierce intelligence, and it uses its strategic mind to plot and scheme against those who seek to oppose it. Despite its fearsome appearance, Sol is not inherently evil - it simply seeks to protect its home and its treasures from those who would seek to take them. However, its definition of "protection" often involves deadly force, and it will stop at nothing to defend what it holds dear. Those who cross Sol's path do so at their own peril, for the creature is a formidable foe that is not easily defeated.`
});
//# sourceMappingURL=monster.utils.js.map