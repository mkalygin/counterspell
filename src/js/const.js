export const Font = Object.freeze({
  DefaultFamily: 'Gremlin, monospace',
  LargeSize: '20px',
  NormalSize: '16px',
  SmallSize: '12px',
});

export const Color = Object.freeze({
  Accent: 0xa2a2fe,
});

export const Size = Object.freeze({
  ScreenWidth: 1024,
  ScreenHeight: 768,
  TileSize: 20,
});

export const Depth = Object.freeze({
  Hud: 100,
  Debug: 20,
});

export const BarType = Object.freeze({
  Green: 13,
  Purple: 14,
  Red: 15,
  Yellow: 16,
  Blue: 17,
  White: 18
});

export const InventoryCellType = Object.freeze({
  Empty: 26,
});

export const Character = Object.freeze({
  InventorySize: 2,
});

export const SpellKeyIdx = {
  'od': 0,
  're': 1,
  'mi': 2,
  'fa': 3,
  'so': 4,
  'la': 5,
  'si': 6
};

export const SpellPoolCellType = Object.freeze({
  'empty': (38*32 + 6),
  'fireball': (51*32 + 1),
  'blink': (51*32 + 2)
});

export const SpellerColors = {
  1 : 0xff0000, //каждый
  2 : 0xffa500, // охотник
  3 : 0xffff00,
  4 : 0x008000,
  5 : 0x0000ff,
  6 : 0x4b0082,
  7 : 0xee82ee
};

