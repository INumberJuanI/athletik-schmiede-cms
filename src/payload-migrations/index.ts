import * as migration_20251019_165217 from './20251019_165217';
import * as migration_20251019_165951 from './20251019_165951';

export const migrations = [
  {
    up: migration_20251019_165217.up,
    down: migration_20251019_165217.down,
    name: '20251019_165217',
  },
  {
    up: migration_20251019_165951.up,
    down: migration_20251019_165951.down,
    name: '20251019_165951'
  },
];
