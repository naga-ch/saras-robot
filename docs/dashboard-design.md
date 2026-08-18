# Version 1 Web Dashboard Design

## 1. Purpose

The Version 1 web dashboard will provide a browser-based interface for monitoring and manually controlling the Saras robot.

The dashboard will run on the Raspberry Pi and will be accessed from a laptop or desktop computer through the local network.

The dashboard must use the same safety layer as the future AI planner. No dashboard command may bypass movement validation, obstacle checks, speed limits, or the emergency-stop system.

## 2. Technology

- Backend: Python FastAPI
- Real-time updates: WebSocket
- Frontend: HTML, CSS, and JavaScript
- Camera stream: MJPEG for Version 1
- Robot communication: USB serial between Raspberry Pi and ESP32
- Data logging: SQLite or JSON logs
- Access: Local network browser

## 3. Dashboard layout

```text
+-------------------------------------------------------------+
| SARAS ROBOT                     Connection: CONNECTED       |
+-------------------------------------------------------------+
|                                                             |
|  EMERGENCY STOP                                             |
|  [ STOP ROBOT ]                                             |
|                                                             |
|  Manual Control              Camera Feed                    |
|  [ Forward ]                 +-------------------------+    |
|  [ Left ] [ Stop ] [ Right ] |                         |    |
|  [ Backward ]                |     LIVE CAMERA         |    |
|                              |                         |    |
|  Speed: [---------] 25%      +-------------------------+    |
|                                                             |
+-------------------------------------------------------------+
| LiDAR View                    Robot Status                 |
| +-------------------------+   Battery: -- V               |
| |                         |   Left Encoder:  --           |
| |    360-degree scan      |   Right Encoder: --           |
| |                         |   Motors: DISABLED            |
| +-------------------------+   Fault: NONE                 |
+-------------------------------------------------------------+
| Event Log                                                   |
| [10:30:20] Robot connected                                  |
| [10:30:24] LiDAR data received                              |
| [10:30:31] Movement blocked by obstacle                     |
+-------------------------------------------------------------+
```

## 4. Dashboard sections

### 4.1 Header

The header must display:

- Project name: Saras Robot
- Software version
- Connection status
- Raspberry Pi hostname
- Current time
- Emergency-stop state

Possible connection states:

```text
CONNECTED
DISCONNECTED
CONNECTING
FAULT
```

### 4.2 Emergency-stop control

The emergency-stop control must be clearly visible on every dashboard screen.

Button label:

```text
STOP ROBOT
```

When pressed, it must:

1. Send a stop command to the Raspberry Pi.
2. Send a stop command to the ESP32.
3. Disable movement commands.
4. Display the emergency-stop state.
5. Record an event in the log.

The robot must require a deliberate reset action before movement is enabled again.

Suggested controls:

```text
[ STOP ROBOT ]
[ RESET SAFETY STATE ]
```

The dashboard must not allow movement while the emergency-stop state is active.

### 4.3 Manual movement controls

The dashboard must provide:

```text
[ FORWARD ]

[ LEFT ] [ STOP ] [ RIGHT ]

[ BACKWARD ]
```

Each movement command must include:

- Direction
- Left motor value
- Right motor value
- Speed
- Duration
- Timestamp
- Command source

The Version 1 dashboard must use short, timed movements rather than unlimited continuous movement.

Example:

```json
{
  "direction": "forward",
  "speed": 0.25,
  "duration_ms": 300,
  "source": "web_dashboard"
}
```

### 4.4 Speed control

The dashboard must include a speed slider.

Recommended Version 1 limits:

```text
Minimum: 0%
Maximum: 30%
Default: 15%
```

The maximum speed must be enforced by the Raspberry Pi safety layer and the ESP32 firmware. The browser must not be trusted to enforce the limit by itself.

### 4.5 Camera feed

The camera section must display:

- Live camera image.
- Camera connection state.
- Last frame timestamp.
- Resolution.
- Capture button.

Possible states:

```text
CAMERA CONNECTED
CAMERA DISCONNECTED
FRAME STALE
```

The dashboard should display a warning if the camera frame is older than the configured timeout.

### 4.6 LiDAR display

The LiDAR section must display:

- 360-degree scan visualization.
- Robot position at the center.
- Detected obstacles.
- Front clearance.
- Front-left clearance.
- Front-right clearance.
- Left clearance.
- Right clearance.
- Rear clearance.
- Last scan timestamp.

Example sector data:

```json
{
  "front_mm": 820,
  "front_left_mm": 1100,
  "front_right_mm": 440,
  "left_mm": 970,
  "right_mm": 610,
  "rear_mm": 1300,
  "timestamp": "2026-08-18T10:00:00Z"
}
```

The dashboard must show a warning when:

```text
Front clearance is below the configured safety threshold.
LiDAR data is stale.
LiDAR is disconnected.
LiDAR reports invalid data.
```

### 4.7 Robot status

The status section must display:

- Battery voltage.
- Battery percentage, if reliable battery telemetry is available.
- Motor state.
- ESP32 connection state.
- Pi connection state.
- Emergency-stop state.
- Left encoder count.
- Right encoder count.
- Current fault.
- Last command.
- Last sensor update.

Example:

```json
{
  "battery_voltage": 13.1,
  "battery_percentage": null,
  "motors_enabled": false,
  "esp32_connected": true,
  "emergency_stop": false,
  "left_encoder_ticks": 184,
  "right_encoder_ticks": 181,
  "fault": null,
  "last_command": "stop"
}
```

### 4.8 Fault messages

Fault messages must be displayed prominently.

Possible faults:

```text
ESP32 DISCONNECTED
LIDAR DISCONNECTED
CAMERA DISCONNECTED
EMERGENCY STOP ACTIVE
STALE SENSOR DATA
OBSTACLE TOO CLOSE
MOTOR TIMEOUT
INVALID COMMAND
LOW BATTERY
UNKNOWN HARDWARE FAULT
```

Each fault must include:

- Fault name.
- Fault description.
- Timestamp.
- Recommended action.
- Whether movement is blocked.

### 4.9 Event log

The event log must record:

- Robot startup.
- Robot shutdown.
- ESP32 connection and disconnection.
- Motor enable and disable.
- Movement commands.
- Stop commands.
- Emergency-stop events.
- LiDAR faults.
- Camera faults.
- Obstacle blocks.
- Invalid commands.
- Battery warnings.
- MCP tool calls.
- Runtime planner decisions.

Example:

```text
[2026-08-18 10:30:20] Robot connected
[2026-08-18 10:30:24] ESP32 connected
[2026-08-18 10:30:28] LiDAR data received
[2026-08-18 10:30:31] Forward command accepted
[2026-08-18 10:30:31] Movement stopped after 300 ms
[2026-08-18 10:30:35] Movement blocked: front clearance 220 mm
```

## 5. API endpoints

The initial backend should provide these endpoints:

```text
GET  /api/status
POST /api/robot/enable
POST /api/robot/disable
POST /api/robot/move
POST /api/robot/stop
POST /api/robot/safety-reset
GET  /api/encoders
GET  /api/lidar
GET  /api/camera/snapshot
GET  /api/events
WS   /ws/status
WS   /ws/lidar
WS   /ws/events
```

## 6. Movement request format

```json
{
  "direction": "forward",
  "speed": 0.2,
  "duration_ms": 300
}
```

Allowed directions:

```text
forward
backward
left
right
stop
```

The backend must reject:

- Unknown direction.
- Speed below 0.
- Speed above the configured maximum.
- Duration below the minimum.
- Duration above the configured maximum.
- Movement while emergency stop is active.
- Movement when the ESP32 is disconnected.
- Movement when LiDAR data is stale.
- Movement toward an unsafe obstacle.

## 7. Safety behavior

The dashboard is an interface only. Safety decisions must be made by the Raspberry Pi safety layer and the ESP32 firmware.

The browser must not directly control GPIO pins, PWM, or motor-driver outputs.

## 8. Version 1 dashboard acceptance criteria

The dashboard will be accepted when:

- It loads from a browser on the local network.
- It shows Pi connection status.
- It shows ESP32 connection status.
- It shows the camera feed.
- It shows LiDAR data.
- It shows encoder values.
- It shows battery voltage.
- It provides short manual movement commands.
- It has a working emergency stop.
- It blocks movement when a fault exists.
- It records all commands and faults.
- It remains usable when the AI planner is disconnected.