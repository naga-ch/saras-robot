# Saras Robot Version 1 Test Plan

## 1. Purpose

This document defines the tests required to validate the Version 1 robot before autonomous or AI-controlled operation.

Tests must be completed in sequence. A failed safety or motor-control test must be corrected before proceeding to higher-level software tests.

## 2. Test environment

### Required equipment

- Version 1 robot chassis.
- Raspberry Pi 5.
- ESP32 motor controller.
- Motor driver.
- Encoder motors.
- LiDAR.
- Camera.
- Battery or current-limited bench supply.
- Digital multimeter.
- Laptop or MacBook.
- Web dashboard.
- Physical emergency-stop switch.
- Clear test area.
- Fire extinguisher suitable for electrical equipment.

### General test conditions

- Test indoors on a clear, flat surface.
- Keep the robot away from stairs and fragile objects.
- Use low motor speed.
- Keep a person near the physical emergency stop.
- Test with wheels raised for initial motor tests.
- Record the date, operator, firmware version, and software commit.
- Stop the test immediately if wiring, battery, or motor behavior is abnormal.

## 3. Test result format

Use this format for every test:

```text
Test name:
Test ID:
Date:
Operator:
Firmware version:
Software commit:
Purpose:
Setup:
Procedure:
Expected result:
Actual result:
Pass/fail:
Notes:
Corrective action:
```

---

## 4. ESP32 startup test

### Test name

ESP32 startup test

### Test ID

TEST-001

### Purpose

Verify that the ESP32 starts safely with motors disabled.

### Setup

- Connect the ESP32.
- Connect the motor driver.
- Keep the robot wheels raised.
- Do not enable motors.
- Confirm the emergency stop is released.

### Procedure

1. Power on the ESP32.
2. Observe the motor outputs.
3. Send the `status` command.
4. Inspect the response.

### Expected result

- Motors remain stopped.
- PWM outputs are zero.
- `motors_enabled` is false.
- No unexpected wheel movement occurs.
- A valid status response is returned.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

### Notes

```text
Record startup messages and any unexpected output.
```

---

## 5. Motor-enable test

### Test name

Motor-enable test

### Test ID

TEST-002

### Purpose

Verify that motors remain disabled until an explicit enable command is received.

### Setup

- Complete TEST-001.
- Keep wheels raised.
- Ensure no active safety fault exists.

### Procedure

1. Send a low-speed `drive` command without enabling motors.
2. Verify that the command is rejected.
3. Send the `enable` command.
4. Send a low-speed drive command.
5. Send the `stop` command.

### Expected result

- Movement is rejected before enable.
- Motors enable only after the `enable` command.
- Low-speed movement occurs after enable.
- The stop command stops both motor channels.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 6. Motor-direction test

### Test name

Motor-direction test

### Test ID

TEST-003

### Purpose

Verify correct forward, backward, left, and right movement directions.

### Setup

- Wheels raised from the floor.
- Motors enabled.
- Low PWM limit configured.

### Procedure

1. Drive both sides forward.
2. Confirm left and right wheels rotate in the intended forward direction.
3. Drive both sides backward.
4. Confirm reverse direction.
5. Drive left side forward and right side backward.
6. Confirm rotation in one direction.
7. Reverse the left/right commands.
8. Confirm rotation in the opposite direction.

### Expected result

- Motor direction matches software commands.
- Both motors on each side rotate consistently.
- No motor runs unexpectedly.
- The stop command works after each test.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 7. Stop-command test

### Test name

Stop-command test

### Test ID

TEST-004

### Purpose

Verify that the stop command immediately stops both motor channels.

### Setup

- Wheels raised.
- Motors enabled.
- Robot moving at low speed.

### Procedure

1. Send a drive command.
2. Wait briefly.
3. Send the `stop` command.
4. Observe both motor groups.
5. Request status.

### Expected result

- Both motor channels stop immediately.
- PWM values become zero.
- Status reports motors stopped.
- No residual movement continues.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 8. Encoder test

### Test name

Encoder test

### Test ID

TEST-005

### Purpose

Verify that encoder signals are detected and reported correctly.

### Setup

- Wheels raised.
- Encoder wiring connected.
- Motors disabled initially.

### Procedure

1. Record encoder values.
2. Rotate each wheel by hand.
3. Read encoder values again.
4. Drive slowly forward.
5. Read encoder values.
6. Drive slowly backward.
7. Read encoder values.

### Expected result

- Encoder values change when wheels rotate.
- Left and right encoder channels are identified correctly.
- Forward and reverse direction are distinguishable.
- Encoder values remain stable when wheels are stationary.
- No encoder channel is permanently stuck.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 9. Serial-timeout test

### Test name

Serial-timeout test

### Test ID

TEST-006

### Purpose

Verify that the ESP32 stops motors when communication is interrupted.

### Setup

- Wheels raised.
- Motors enabled.
- Robot moving at low speed.
- Watchdog configured.

### Procedure

1. Start a low-speed movement.
2. Disconnect or disable the Raspberry Pi serial connection.
3. Wait longer than the watchdog timeout.
4. Observe the motors.
5. Reconnect the serial link.
6. Request status.

### Expected result

- Motors stop automatically after the timeout.
- Motor output is disabled.
- A watchdog fault is reported.
- The robot does not restart movement automatically.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 10. Emergency-stop test

### Test name

Emergency-stop test

### Test ID

TEST-007

### Purpose

Verify that the physical emergency stop immediately stops the motors.

### Setup

- Wheels raised initially.
- Motors enabled.
- Emergency-stop circuit connected.
- Person assigned to operate the physical stop.

### Procedure

1. Start low-speed movement.
2. Press the emergency-stop button.
3. Observe the motor response.
4. Check dashboard and ESP32 status.
5. Attempt another movement command.
6. Reset the safety state.
7. Verify that movement remains disabled until explicitly enabled.

### Expected result

- Motors stop immediately.
- Motor output is disabled.
- Movement commands are rejected.
- Dashboard displays emergency-stop state.
- A deliberate safety reset is required.
- Motors do not restart automatically.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 11. LiDAR test

### Test name

LiDAR test

### Test ID

TEST-008

### Purpose

Verify that the Raspberry Pi receives valid 360-degree LiDAR data.

### Setup

- LiDAR mounted level.
- Raspberry Pi powered.
- LiDAR driver running.
- Clear indoor environment.

### Procedure

1. Start the LiDAR service.
2. Record scan data.
3. Place an object in front of the robot.
4. Rotate the object or robot relative to the scanner.
5. Observe sector values.
6. Disconnect the LiDAR.
7. Observe fault behavior.

### Expected result

- Valid scan data is received.
- Front obstacle appears in the front sector.
- Obstacles appear in the correct approximate direction.
- Scan timestamps update continuously.
- LiDAR disconnection is detected.
- Stale or missing LiDAR data creates a safety fault.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 12. Camera test

### Test name

Camera test

### Test ID

TEST-009

### Purpose

Verify that the Raspberry Pi can capture and display camera frames.

### Setup

- Camera mounted securely.
- Camera cable connected.
- Camera service running.

### Procedure

1. Start the camera service.
2. Capture a still image.
3. Display the image in the dashboard.
4. Start the live stream.
5. Disconnect the camera.
6. Observe the dashboard.

### Expected result

- A valid image is captured.
- The image is displayed correctly.
- The live stream updates.
- Frame timestamps update.
- Camera disconnection is detected.
- A stale-frame warning appears.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 13. Web-dashboard test

### Test name

Web-dashboard test

### Test ID

TEST-010

### Purpose

Verify that the dashboard displays robot state and sends validated commands.

### Setup

- FastAPI dashboard running.
- Raspberry Pi and MacBook connected to the same network.
- ESP32 connected.
- Robot wheels raised initially.

### Procedure

1. Open the dashboard in a browser.
2. Verify connection status.
3. Verify encoder values.
4. Verify camera display.
5. Verify LiDAR display.
6. Press each movement button at low speed.
7. Press the stop button.
8. Activate the emergency stop.
9. Attempt movement while the emergency stop is active.
10. Review the event log.

### Expected result

- Dashboard loads successfully.
- Status values update.
- Movement commands are validated.
- Stop works.
- Emergency stop blocks movement.
- Faults are displayed.
- Events are logged.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 14. MCP-tool test

### Test name

MCP-tool test

### Test ID

TEST-011

### Purpose

Verify that MCP tools expose safe robot functions without bypassing the safety layer.

### Setup

- MCP server running.
- Robot hardware services running.
- Wheels raised initially.
- Safety layer enabled.

### Required tools

```text
robot_status
move
stop
read_encoders
scan_lidar
capture_image
```

### Procedure

1. Call `robot_status`.
2. Call `read_encoders`.
3. Call `scan_lidar`.
4. Call `capture_image`.
5. Attempt a safe low-speed movement.
6. Call `stop`.
7. Attempt an invalid speed.
8. Attempt an excessive duration.
9. Activate the emergency stop.
10. Attempt movement again.

### Expected result

- Valid tools return structured data.
- Safe movement passes through the safety layer.
- Invalid values are rejected.
- Excessive duration is rejected.
- Emergency-stop state blocks movement.
- No tool can directly set unrestricted PWM.
- All tool calls are logged.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 15. Obstacle-stop test

### Test name

Obstacle-stop test

### Test ID

TEST-012

### Purpose

Verify that the robot stops or refuses movement when an obstacle is too close.

### Setup

- Robot on a clear floor.
- LiDAR running.
- Safety thresholds configured.
- Low movement speed.
- Person assigned to emergency stop.

### Procedure

1. Place a soft obstacle in front of the robot.
2. Confirm the LiDAR detects it.
3. Attempt a forward movement.
4. Move the robot slowly toward a safe obstacle.
5. Observe the safety response.
6. Remove the obstacle.
7. Confirm movement remains blocked or resumes only according to the configured safety policy.

### Expected result

- Movement is rejected when clearance is below the threshold.
- Robot stops if the obstacle becomes unsafe during movement.
- Dashboard displays `OBSTACLE TOO CLOSE`.
- An event is recorded.
- The AI or dashboard cannot override the safety block.

### Pass/fail

```text
Pass: [ ]
Fail: [ ]
```

---

## 16. Test completion criteria

Version 1 hardware and software testing may proceed to AI runtime integration only when:

- TEST-001 passes.
- TEST-002 passes.
- TEST-003 passes.
- TEST-004 passes.
- TEST-005 passes.
- TEST-006 passes.
- TEST-007 passes.
- TEST-008 passes.
- TEST-009 passes.
- TEST-010 passes.
- TEST-011 passes.
- TEST-012 passes.

Any failed safety test must be corrected and repeated before autonomous operation.