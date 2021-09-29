type Configs = {
  [key: string]: Object | null,
};

function getAllConfigs(): Configs {
  const context = require.context('./', false, /\.(js|ts)$/i);
  const itemCfg: Configs = {};

  context.keys().forEach((key) => {
    if (key === './index.ts' || key === './type.ts') {
      return;
    }

    const name = key.match(/\w+/)?.[0];

    if (name) {
      itemCfg[name] = context(key).default;
    }
  });

  return itemCfg;
}

const allConfigs = getAllConfigs();

/**
 * ex:
 * config('app.environment')
 *
 * @param {string} chain
 * @param {any} defaultValue
 */
function config(chain: string, defaultValue?: any) {
  if (chain && typeof chain === 'string') {
    return chain
      .split('.')
      .reduce((acc, cur: string) => (acc ? acc[cur] : defaultValue || undefined), allConfigs);
  }

  return defaultValue;
}

export default config;
