export default function makeRunNumberTable({ Table, SettingTypes }) {
  return class RunNumberTable extends Table {
    static displayName = 'Run Number Table';
    static name = 'RunNumberTable';

    static get settingSchema() {
      return {
        ...super.settingSchema,
        dataUrl: {
          type: SettingTypes.STRING,
          default: 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/run_number',
          label: 'Data URL',
          onChange: 'onUpdateTick',
          advanced: true,
        },
      };
    }

    constructor(props) {
      super(props);
      this.state = { runNumber: null, loading: true, error: null };
    }

    onInit() {
      this.fetchRunNumber();
    }

    onUpdateTick() {
      this.fetchRunNumber();
    }

    fetchRunNumber() {
      fetch(this.getDataUrl())
        .then(res => res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`))
        .then(json => {
          const runNumber = json?.data;
          if (runNumber === undefined || runNumber === null) {
            throw new Error('No run number found.');
          }
          this.setState({ runNumber, loading: false, error: null });
        })
        .catch(err => {
          this.setState({ error: err.message, loading: false });
        });
    }

    render() {
      const { loading, error, runNumber } = this.state;
      if (loading) return <div>Loading...</div>;
      if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

      const displayValue = runNumber < 0
        ? 'waiting for start of next run'
        : runNumber;

      return (
        <div className="no-drag" style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr><th style={thStyle}>Metric</th><th style={thStyle}>Value</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Run Number</td>
                <td style={tdStyle}>{displayValue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };
}

const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f5f5f5',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};
