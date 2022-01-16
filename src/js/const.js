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
  'do': 0,
  're': 1,
  'mi': 2,
  'fa': 3,
  'sol': 4,
  'la': 5,
  'si': 6
};

export const SpellPoolCellType = Object.freeze({
  'empty': (38*32 + 6),
  'fireball': (51*32 + 1),
  'blink': (51*32 + 2)
});
