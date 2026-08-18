import { useState } from 'react'
import './App.css'

const sampleEvents = [
  '[10:30:20] Dashboard loaded',
  '[10:30:21] Robot disconnected',
  '[10:30:22] Simulation mode active'
]

function App() {
  const [speed, setSpeed] = useState(15)
  const [events, setEvents] = useState(sampleEvents)
  const [lastCommand, setLastCommand] = useState('None')

  function sendCommand(command) {
    setLastCommand(command)

    const timestamp = new Date().toLocaleTimeString()
    setEvents((currentEvents) => [
      `[${timestamp}] Simulation command: ${command}`,
      ...currentEvents
    ])
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">PROJECT</p>
          <h1>Saras Robot</h1>
          <p className="subtitle">Version 1 Dashboard Prototype</p>
        </div>

        <div className="connection-card">
          <span className="status-dot disconnected"></span>
          <div>
            <span className="label">Robot status</span>
            <strong>Disconnected</strong>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="panel control-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CONTROL</p>
              <h2>Manual controls</h2>
            </div>
            <span className="simulation-badge">SIMULATION</span>
          </div>

          <div className="stop-area">
            <button
              className="stop-button"
              onClick={() => sendCommand('Emergency stop')}
            >
              EMERGENCY STOP
            </button>
          </div>

          <div className="direction-pad">
            <button
              className="direction-button forward"
              onClick={() => sendCommand('Forward')}
            >
              ▲
              <span>Forward</span>
            </button>

            <div className="middle-controls">
              <button
                className="direction-button"
                onClick={() => sendCommand('Left')}
              >
                ◀
                <span>Left</span>
              </button>

              <button
                className="direction-button stop-small"
                onClick={() => sendCommand('Stop')}
              >
                ■
                <span>Stop</span>
              </button>

              <button
                className="direction-button"
                onClick={() => sendCommand('Right')}
              >
                ▶
                <span>Right</span>
              </button>
            </div>

            <button
              className="direction-button backward"
              onClick={() => sendCommand('Backward')}
            >
              ▼
              <span>Backward</span>
            </button>
          </div>

          <div className="speed-control">
            <div className="metric-row">
              <span>Speed limit</span>
              <strong>{speed}%</strong>
            </div>

            <input
              type="range"
              min="0"
              max="30"
              value={speed}
              onChange={(event) => setSpeed(event.target.value)}
            />

            <p className="helper-text">
              Movement is disabled because the robot is disconnected.
            </p>
          </div>

          <div className="last-command">
            <span>Last simulated command</span>
            <strong>{lastCommand}</strong>
          </div>
        </section>

        <section className="panel camera-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">VISION</p>
              <h2>Camera feed</h2>
            </div>
            <span className="status-tag warning">No data</span>
          </div>

          <div className="camera-placeholder">
            <div className="camera-icon">◉</div>
            <h3>Camera unavailable</h3>
            <p>Connect the Raspberry Pi camera to display live video.</p>
          </div>
        </section>

        <section className="panel lidar-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">SENSORS</p>
              <h2>LiDAR scan</h2>
            </div>
            <span className="status-tag warning">No data</span>
          </div>

          <div className="lidar-view">
            <div className="lidar-ring ring-one"></div>
            <div className="lidar-ring ring-two"></div>
            <div className="lidar-ring ring-three"></div>
            <div className="lidar-cross horizontal"></div>
            <div className="lidar-cross vertical"></div>
            <div className="lidar-center"></div>
            <span className="lidar-label front-label">FRONT</span>
            <span className="lidar-label left-label">LEFT</span>
            <span className="lidar-label right-label">RIGHT</span>
            <span className="lidar-label rear-label">REAR</span>
          </div>
        </section>

        <section className="panel status-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">TELEMETRY</p>
              <h2>Robot status</h2>
            </div>
            <span className="status-tag neutral">Prototype</span>
          </div>

          <div className="status-list">
            <div className="status-row">
              <span>Battery</span>
              <strong>-- V</strong>
            </div>
            <div className="status-row">
              <span>Left encoder</span>
              <strong>0</strong>
            </div>
            <div className="status-row">
              <span>Right encoder</span>
              <strong>0</strong>
            </div>
            <div className="status-row">
              <span>Motors</span>
              <strong className="muted-value">Disabled</strong>
            </div>
            <div className="status-row">
              <span>Fault</span>
              <strong className="success-value">None</strong>
            </div>
          </div>
        </section>

        <section className="panel events-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">SYSTEM</p>
              <h2>Event log</h2>
            </div>
            <button
              className="clear-button"
              onClick={() => setEvents([])}
            >
              Clear
            </button>
          </div>

          <div className="event-list">
            {events.length === 0 ? (
              <p className="empty-message">No events recorded.</p>
            ) : (
              events.map((event, index) => (
                <div className="event-item" key={`${event}-${index}`}>
                  <span className="event-dot"></span>
                  <span>{event}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Simulation dashboard — no physical robot commands are connected.</span>
        <span>Version 0.1.0</span>
      </footer>
    </div>
  )
}

export default App