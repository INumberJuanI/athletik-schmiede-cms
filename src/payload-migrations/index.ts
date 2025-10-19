import * as migration_20251019_180322 from './20251019_180322';

export const migrations = [
  {
    up: migration_20251019_180322.up,
    down: migration_20251019_180322.down,
    name: '20251019_180322'
  },
];
