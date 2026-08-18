# Saras Robot Safety Requirements

## 1. Purpose

This document defines the mandatory electrical, mechanical, firmware, software, and operational safety requirements for the Version 1 robot.

Safety requirements take priority over user commands, dashboard commands, MCP tools, runtime AI decisions, and development convenience.

## 2. Core safety principle

The robot must fail toward a stopped state.

If the system is uncertain, disconnected, overheated, or receiving invalid data, the motors must stop.

The AI must never have unrestricted access to PWM, GPIO, shell commands, or motor-driver outputs.

## 3. Electrical safety

- Use a certified battery pack with an appropriate BMS.
- Install a fuse close to the battery positive terminal.
- Use a DC-rated main power switch.
- Use a physical emergency-stop switch.
- Keep motor power separate from Raspberry Pi power.
- Use regulated power converters for the Raspberry Pi and ESP32.
- Verify all voltages with a multimeter before connection.
- Use correctly rated wires and connectors.
- Insulate all exposed conductors.
- Secure battery connections against movement.
- Do not charge a damaged, swollen, or hot battery.
- Do not leave the battery charging unattended.
- Charge the LiFePO4 pack only with a verified LiFePO4 charger profile.
- Charge only on a nonflammable surface.
- Keep a suitable fire extinguisher available.
- Do not modify battery wiring without confirming polarity and voltage.

## 4. Mechanical safety

- Secure all motors firmly.
- Secure all wheels and hubs.
- Keep wiring away from wheels and shafts.
- Protect the LiDAR from impact.
- Keep the center of gravity low.
- Prevent the battery from moving inside the chassis.
- Use removable covers for service access.
- Do not operate the robot with loose structural components.
- Keep fingers, clothing, and cables away from rotating wheels.
- Test the robot with wheels lifted before floor operation.

## 5. ESP32 firmware safety

The ESP32 must:

- Start with motors disabled.
- Set PWM outputs to zero during boot.
- Reject invalid commands.
- Reject PWM values outside the allowed range.
- Reject movement durations outside the allowed range.
- Stop motors when the watchdog expires.
- Stop motors when the emergency-stop input is active.
- Stop motors after a motor fault.
- Stop motors after an encoder fault.
- Report faults to the Raspberry Pi.
- Require an explicit enable command before movement.
- Disable motors after a reset.
- Accept the stop command in every operating state.

## 6. Raspberry Pi safety

The Raspberry Pi safety service must:

- Validate every movement request.
- Enforce maximum speed.
- Enforce maximum movement duration.
- Reject movement if the ESP32 is disconnected.
- Reject movement if LiDAR data is unavailable.
- Reject movement if LiDAR data is stale.
- Reject movement toward an obstacle.
- Stop movement when a new obstacle is detected.
- Stop movement when communication fails.
- Stop movement when an emergency-stop event is received.
- Prevent simultaneous conflicting commands.
- Log all safety decisions.
- Keep the stop function available independently of the AI planner.

## 7. Sensor safety rules

### LiDAR

- Reject scans with invalid data.
- Reject scans older than the configured freshness limit.
- Detect LiDAR disconnection.
- Stop the robot if no valid front clearance is available.
- Do not rely on a single unverified LiDAR reading for high-speed movement.

### Camera

- Treat camera data as informational.
- Do not use camera interpretation as the only collision-prevention mechanism.
- Display a stale-frame warning.
- Do not allow the AI to claim target completion without confirmation.

### Encoders

- Detect unexpected encoder inactivity.
- Detect impossible speed or count changes.
- Stop if encoder feedback disagrees with the movement command.
- Reset encoder counts only when the robot is stopped.

## 8. Initial safety thresholds

These values are starting points and must be validated experimentally:

```text
Maximum PWM: 80/255
Maximum movement duration: 1000 ms
Front obstacle threshold: 350 mm
Critical obstacle threshold: 250 mm
Sensor data freshness limit: 500 ms
ESP32 communication watchdog: 500 ms
Heartbeat interval: 100 ms
```

The robot must operate at very low speed during initial testing.

## 9. Dashboard safety

The web dashboard must:

- Display emergency-stop status.
- Display the connection state.
- Display active faults.
- Disable movement buttons during unsafe conditions.
- Use short timed movement commands.
- Display a warning before the first movement.
- Provide a stop button on every control screen.
- Require a safety reset after an emergency stop.
- Never send direct motor-driver commands.

## 10. AI and MCP safety

- The AI may request high-level movement only.
- MCP tools must validate every parameter.
- MCP tools must not expose arbitrary shell execution.
- MCP tools must not expose unrestricted PWM.
- MCP tools must not bypass the safety service.
- The AI must receive structured sensor summaries.
- The AI must not control the robot when sensor data is stale.
- The AI must use short movement actions.
- The AI must rescan after each movement.
- The AI must stop when uncertain.
- The AI must not be the only emergency-stop mechanism.

## 11. Battery and charging safety

Before using the iMAX B6AC charger:

- Confirm the battery is LiFePO4/LFP.
- Confirm the pack is 4S.
- Confirm the battery has a correctly wired 4S balance connector.
- Select LiFe balance mode.
- Confirm the charger detects 4S.
- Begin at a low current for the first supervised charge.
- Connect both the main leads and the balance connector when required.
- Stop charging if any cell shows an abnormal voltage.
- Stop charging if the battery becomes hot, swollen, or damaged.

## 12. Testing restrictions

- Do not test the robot near stairs.
- Do not test near people, pets, glass, or valuable equipment.
- Do not test on public roads or public spaces.
- Do not test with a damaged battery.
- Do not test with loose wiring.
- Do not test autonomous movement before manual stop testing passes.
- Do not test high speed during Version 1.
- Keep one person responsible for the physical emergency stop.
- Keep the robot on a clear floor.
- Test with wheels raised before floor testing.

## 13. Fault response

When a safety fault occurs:

1. Stop the motors.
2. Disable motor output.
3. Display the fault.
4. Log the event.
5. Inspect the robot physically.
6. Correct the cause.
7. Reset the safety state deliberately.
8. Test again at low speed.

## 14. Safety acceptance criteria

The safety system will be accepted when:

- Motors are disabled at startup.
- Invalid commands are rejected.
- PWM limits work.
- Duration limits work.
- Watchdog stopping works.
- Emergency-stop stopping works.
- Pi-to-ESP32 communication loss stops the robot.
- Stale LiDAR data blocks movement.
- Close obstacles block movement.
- Dashboard movement cannot bypass safety rules.
- MCP movement cannot bypass safety rules.
- Faults are logged.
- Safety reset is required after emergency stop.