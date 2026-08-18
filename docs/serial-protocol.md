# ESP32 Serial Communication Protocol

## 1. Purpose

This document defines the communication protocol between the Raspberry Pi and the ESP32 motor controller.

The Raspberry Pi is responsible for high-level commands, safety validation, sensor integration, web-dashboard control, MCP tools, and logging.

The ESP32 is responsible for low-level motor control, encoder reading, command timeouts, and emergency-stop handling.

## 2. Transport

- Physical connection: USB serial
- Data format: JSON
- Message format: One JSON object per line
- Encoding: UTF-8
- Default baud rate: 115200
- Line ending: Newline
- Communication direction: Bidirectional

Example:

```text
Raspberry Pi → ESP32:
{"cmd":"status"}\n

ESP32 → Raspberry Pi:
{"ok":true,"motors_enabled":false,"fault":null}\n
```

## 3. General rules

1. Every command must contain a `cmd` field.
2. Every message must occupy one line.
3. The ESP32 must return one response for every valid command.
4. Invalid JSON must produce an error response.
5. Unknown commands must produce an error response.
6. The ESP32 must start with motors disabled.
7. The ESP32 must stop motors when the communication watchdog expires.
8. The Raspberry Pi must validate commands before sending them.
9. The ESP32 must validate commands again.
10. The Raspberry Pi must log commands and responses.

## 4. Command: enable

Enables motor output after safety checks have passed.

### Request

```json
{
  "cmd": "enable"
}
```

### Success response

```json
{
  "ok": true,
  "cmd": "enable",
  "motors_enabled": true,
  "fault": null
}
```

### Failure response

```json
{
  "ok": false,
  "cmd": "enable",
  "motors_enabled": false,
  "error": "EMERGENCY_STOP_ACTIVE"
}
```

## 5. Command: disable

Disables motor output.

### Request

```json
{
  "cmd": "disable"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "disable",
  "motors_enabled": false,
  "fault": null
}
```

## 6. Command: drive

Commands the left and right motor groups.

Positive and negative values represent direction.

### Request

```json
{
  "cmd": "drive",
  "left": 80,
  "right": 80,
  "duration_ms": 300
}
```

### Field definitions

```text
left:
  Left-side motor command.
  Range: -255 to 255.

right:
  Right-side motor command.
  Range: -255 to 255.

duration_ms:
  Maximum movement duration in milliseconds.
  Must be within the configured safety limit.
```

### Success response

```json
{
  "ok": true,
  "cmd": "drive",
  "left": 80,
  "right": 80,
  "duration_ms": 300,
  "motors_enabled": true,
  "fault": null
}
```

### Blocked response

```json
{
  "ok": false,
  "cmd": "drive",
  "motors_enabled": false,
  "error": "MOTORS_NOT_ENABLED"
}
```

### Invalid-value response

```json
{
  "ok": false,
  "cmd": "drive",
  "error": "PWM_OUT_OF_RANGE"
}
```

## 7. Command: stop

Immediately stops both motor channels.

### Request

```json
{
  "cmd": "stop"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "stop",
  "left_pwm": 0,
  "right_pwm": 0,
  "motors_enabled": false,
  "fault": null
}
```

The stop command must be accepted even if:

- Motors are already stopped.
- The robot is disabled.
- A movement timeout occurred.
- A non-critical fault exists.

## 8. Command: read_encoders

Returns the current encoder counts.

### Request

```json
{
  "cmd": "read_encoders"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "read_encoders",
  "left_ticks": 184,
  "right_ticks": 181,
  "left_direction": "forward",
  "right_direction": "forward",
  "timestamp_ms": 123456
}
```

## 9. Command: reset_encoders

Resets encoder counts to zero.

### Request

```json
{
  "cmd": "reset_encoders"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "reset_encoders",
  "left_ticks": 0,
  "right_ticks": 0
}
```

## 10. Command: status

Returns the current controller state.

### Request

```json
{
  "cmd": "status"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "status",
  "motors_enabled": false,
  "left_pwm": 0,
  "right_pwm": 0,
  "left_ticks": 184,
  "right_ticks": 181,
  "emergency_stop": false,
  "watchdog_active": true,
  "fault": null,
  "uptime_ms": 123456
}
```

## 11. Command: heartbeat

Keeps the communication watchdog active.

### Request

```json
{
  "cmd": "heartbeat"
}
```

### Response

```json
{
  "ok": true,
  "cmd": "heartbeat",
  "watchdog_active": true
}
```

The Raspberry Pi should send heartbeat messages periodically while the system is enabled.

## 12. Error response format

All errors must use this structure:

```json
{
  "ok": false,
  "error": "ERROR_CODE",
  "message": "Human-readable explanation"
}
```

Possible error codes:

```text
INVALID_JSON
UNKNOWN_COMMAND
MOTORS_NOT_ENABLED
EMERGENCY_STOP_ACTIVE
PWM_OUT_OF_RANGE
DURATION_OUT_OF_RANGE
SERIAL_TIMEOUT
WATCHDOG_STOP
ENCODER_FAULT
MOTOR_FAULT
INVALID_PARAMETER
```

## 13. Safety limits

Initial Version 1 limits:

```text
Minimum PWM: 0
Maximum PWM: 80
Maximum movement duration: 1000 ms
Communication watchdog timeout: 500 ms
Heartbeat interval: 100 ms
```

These values must be configurable and tested at low speed first.

The ESP32 must not accept unlimited-duration movement commands.

## 14. Watchdog behavior

If the ESP32 does not receive a valid command or heartbeat within the configured timeout:

1. Set left PWM to zero.
2. Set right PWM to zero.
3. Disable motor output.
4. Set the watchdog fault state.
5. Return a fault status when communication resumes.
6. Log the event on the Raspberry Pi.

## 15. Emergency-stop behavior

When the emergency-stop input is active:

1. Stop both motors immediately.
2. Disable motor output.
3. Reject movement commands.
4. Report `EMERGENCY_STOP_ACTIVE`.
5. Require a safety reset before enabling motors.

## 16. Protocol acceptance criteria

The protocol will be accepted when:

- Valid commands produce valid responses.
- Invalid JSON is rejected.
- Unknown commands are rejected.
- PWM limits are enforced.
- Duration limits are enforced.
- Stop works in every state.
- Encoders return stable values.
- Reset encoders works.
- Watchdog stopping works.
- Emergency-stop behavior works.
- Communication loss is detected.
- Every command and response can be logged.