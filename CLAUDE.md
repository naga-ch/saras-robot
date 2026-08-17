# Saras Robot Development Rules

## Project objective

Build a safe Version 1 indoor mobile robot using an ESP32, Raspberry Pi 5, encoder motors, LD06 LiDAR, camera, MCP tools, and a FastAPI web dashboard.

## Safety rules

- Never bypass the emergency stop.
- Never send unrestricted motor commands.
- Never modify motor firmware without review.
- Reject movement when sensor data is stale.
- Reject movement when obstacle clearance is unsafe.
- Test all motor code with wheels raised before floor testing.
- Keep hardware-specific values in configuration files.
- Log all movement commands and faults.

## Architecture rules

- ESP32 handles PWM, encoders, watchdog, and emergency stop.
- Raspberry Pi handles sensors, safety, MCP, dashboard, and logging.
- The AI may select high-level actions but may not directly control PWM.
- All movement must pass through the safety layer.