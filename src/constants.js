// Size of the map tiles. Smaller cell --> biger map
const TILESIZE = 12;

// Player "speed" in ms between path points
const SPEED = 100;

// NPCs speeds (px/ms)
const MIN_SPEED = 50 / 1000;
const MAX_SPEED = 300 / 1000;

// Colors
const COLOR_BACKGROUND = 0xe9efec;
const COLOR_FOREGROUND = 0x555568;
const COLOR_NPC = 0x11dd11;
const COLOR_PLAYER = 0xdd1111;

export { 
    COLOR_BACKGROUND,
    COLOR_FOREGROUND,
    COLOR_NPC,
    COLOR_PLAYER,
    MAX_SPEED, 
    MIN_SPEED, 
    SPEED, 
    TILESIZE,
 };