import * as migration_20251011_112751 from './20251011_112751';

export const migrations = [
  {
    up: migration_20251011_112751.up,
    down: migration_20251011_112751.down,
    name: '20251011_112751'
  },
];
