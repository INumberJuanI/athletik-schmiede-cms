import * as migration_20250929_131050 from './20250929_131050';

export const migrations = [
  {
    up: migration_20250929_131050.up,
    down: migration_20250929_131050.down,
    name: '20250929_131050'
  },
];
