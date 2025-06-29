import makeRunNumberTable from './figures/RunNumberTable.jsx';

function registerFigures({ registry, baseClasses }) {
  const { Plot, SettingTypes, Table } = baseClasses;

  const RunNumberTable = makeRunNumberTable({ Table, SettingTypes });

  registry.register(RunNumberTable.name, RunNumberTable);
}

// Export for ES module import
export default registerFigures;

// Also expose globally for eval/script loading
if (typeof window !== 'undefined') {
  window.PluginRegister = registerFigures;
}
