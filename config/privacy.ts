export type PrivacyLevel = 'cloud' | 'hybrid' | 'sovereign';

export interface PrivacyConfig {
  modelSource: 'local' | 'api';
  vectorDB: 'local' | 'remote';
  dataPolicy: 'offline' | 'hybrid' | 'cloud';
}

export function getPrivacyConfig(level: PrivacyLevel = (process.env.PRIVACY_LEVEL as PrivacyLevel) || 'cloud'): PrivacyConfig {
  switch (level) {
    case 'sovereign':
      return {
        modelSource: 'local',
        vectorDB: 'local',
        dataPolicy: 'offline',
      };
    case 'hybrid':
      return {
        modelSource: 'local',
        vectorDB: 'local',
        dataPolicy: 'hybrid',
      };
    case 'cloud':
    default:
      return {
        modelSource: 'api',
        vectorDB: 'remote',
        dataPolicy: 'cloud',
      };
  }
}
