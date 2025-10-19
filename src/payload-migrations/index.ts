import * as migration_20251019_180206 from './20251019_180206';

export const migrations = [
  {
    up: migration_20251019_180206.up,
    down: migration_20251019_180206.down,
    name: '20251019_180206'
  },
];
