import * as migration_20250929_130836_init from './20250929_130836_init';

export const migrations = [
  {
    up: migration_20250929_130836_init.up,
    down: migration_20250929_130836_init.down,
    name: '20250929_130836_init'
  },
];
