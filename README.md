# Saras Robot

Version 1 indoor AI mobile robot prototype inspired by the Saras 2.0 agentic robotics project.

## Project links

- **GitHub repository:** https://github.com/naga-ch/saras-robot
- **Dashboard prototype:** https://naga-ch.github.io/saras-robot/

> The dashboard is currently a simulation-only prototype and is not connected to physical robot hardware.

## Objective

Build a safe 4WD indoor mobile robot using an ESP32 motor controller, Raspberry Pi 5, LD06 360-degree LiDAR, camera, MCP hardware tools, and a browser-based web dashboard.

The project separates high-level AI planning from real-time motor control:

- The ESP32 handles motor control, encoder feedback, watchdog protection, and emergency-stop input.
- The Raspberry Pi handles sensors, safety validation, MCP tools, dashboard services, and logging.
- Ollama and Claude Code support local software development, testing, debugging, and documentation.
- The web dashboard provides manual monitoring and simulated control during the initial software phase.

## Current stage

**Phase 0: Requirements, procurement, architecture, software planning, and dashboard prototyping**

### Completed

- GitHub repository created and organized.
- Phase 0 project structure created.
- Version 1 requirements documented.
- System architecture documented.
- ESP32 serial communication protocol documented.
- Robot safety requirements documented.
- Version 1 test plan documented.
- Web-dashboard architecture documented.
- Simulation dashboard created.
- Dashboard deployed using GitHub Pages.
- GitHub Issues created for Phase 0 tracking.
- Dashboard and test-plan tasks completed.

### In progress

- Hardware procurement approval.
- Motor and encoder specification verification.
- Final motor-driver selection.
- LiFePO4 battery configuration.
- Power architecture.
- Wiring diagram.
- Version 1 form-sheet chassis design.
- Raspberry Pi software plan.
- ESP32 firmware plan.

## Version 1 scope

Version 1 will focus on creating a safe and testable robot platform.

### Included

- 4WD form-sheet prototype chassis.
- Four geared DC motors with encoders.
- ESP32 low-level motor controller.
- Raspberry Pi 5 robot computer.
- LD06 360-degree LiDAR.
- Raspberry Pi Camera Module 3 Wide.
- FastAPI web dashboard.
- Encoder feedback.
- Deterministic obstacle stopping.
- Physical emergency-stop system.
- MCP tools for robot status, movement, stopping, encoders, LiDAR, and camera capture.
- SQLite or JSON event logging.
- Ollama and Claude Code development workflow.

### Not included in Version 1

- Voice interaction.
- 7-inch display.
- Second floor-facing camera.
- TOF sensor.
- Custom 3D-printed enclosure.
- Full personality system.
- Autonomous object seeking.
- ROS 2 navigation.
- Unrestricted AI motor control.

## Main systems

### ESP32 motor and encoder controller

Responsibilities:

- Motor PWM.
- Motor direction.
- Encoder reading.
- Motor enable and disable.
- Communication watchdog.
- Emergency-stop input.
- Low-level fault reporting.

### Raspberry Pi 5 robot computer

Responsibilities:

- LiDAR processing.
- Camera capture.
- Safety validation.
- Web dashboard.
- MCP server.
- Event logging.
- Communication with the ESP32.
- Future runtime-planning services.

### LD06 360-degree LiDAR

Responsibilities:

- Indoor obstacle detection.
- Directional clearance measurement.
- Environmental scan data.
- Safety-layer input.
- Future navigation support.

### Raspberry Pi Camera Module 3 Wide

Responsibilities:

- Front-facing visual input.
- Dashboard camera feed.
- Future object and scene recognition.
- Future AI-assisted navigation.

### FastAPI web dashboard

Responsibilities:

- Robot connection status.
- Emergency-stop control.
- Manual movement interface.
- Speed-limit control.
- Camera-feed display.
- LiDAR visualization.
- Encoder values.
- Battery status.
- Fault messages.
- Event log.

The dashboard currently uses simulated data and does not control physical motors.

### MCP hardware tools

Planned tools:

```text
robot_status
move
stop
read_encoders
scan_lidar
capture_image
```

All MCP commands must pass through the Raspberry Pi safety layer. MCP tools must not provide unrestricted PWM or direct shell access.

### Ollama and Claude Code

Ollama and Claude Code are used on the development computer for:

- ESP32 firmware development.
- Raspberry Pi software development.
- MCP server development.
- Dashboard development.
- Testing.
- Debugging.
- Log analysis.
- Documentation.
- Future AI-agent integration.

## Repository structure

```text
saras-robot/
├── .github/
│   └── workflows/
│       └── deploy-dashboard.yml
├── dashboard/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── firmware/
│   └── esp32-motor-controller/
├── pi/
│   ├── hardware/
│   ├── safety/
│   ├── sensors/
│   ├── mcp/
│   ├── dashboard/
│   ├── runtime/
│   └── logging/
├── tests/
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── wiring.md
│   ├── safety.md
│   ├── test-plan.md
│   ├── dashboard-design.md
│   └── serial-protocol.md
├── config/
├── logs/
├── CLAUDE.md
├── README.md
└── .gitignore
```

## Safety principles

- Motors must be disabled when the ESP32 starts.
- Motors must stop if communication times out.
- Motors must stop when the emergency stop is activated.
- Invalid PWM values must be rejected.
- Maximum movement duration must be enforced.
- The Raspberry Pi must reject movement when LiDAR data is stale.
- The Raspberry Pi must reject movement toward an unsafe obstacle.
- Every movement command must be logged.
- The AI must not have unrestricted motor authority.
- The ESP32 and Raspberry Pi safety layers must work without an AI model.
- Battery charging must use the correct LiFePO4 charger profile.
- Hardware testing must begin with the wheels raised.

## Development workflow

```text
Create or update code
        ↓
Run the dashboard or test locally
        ↓
Run the linter
        ↓
Run the production build
        ↓
Review changes in GitHub Desktop
        ↓
Commit to the development branch
        ↓
Push to GitHub
        ↓
GitHub Actions deploys the dashboard
        ↓
Team reviews the deployed dashboard
```

Recommended dashboard commands:

```bash
cd dashboard
npm run dev
npm run lint
npm run build
```

## Branches

### `main`

Stable project branch.

### `phase-0-software-preparation`

Current development branch for:

- Documentation.
- Dashboard prototype.
- Software planning.
- GitHub Pages deployment.
- Phase 0 changes.

## GitHub Issues and milestone

Current milestone:

```text
Phase 0 – Requirements and Procurement
```

Issue areas include:

- Motor specifications.
- Encoder specifications.
- Motor-driver selection.
- Battery configuration.
- Charger verification.
- Power architecture.
- Wiring diagram.
- Chassis design.
- Raspberry Pi software plan.
- ESP32 firmware plan.
- Dashboard architecture.
- Version 1 test plan.

## Dashboard feedback

The team can review the dashboard at:

https://naga-ch.github.io/saras-robot/

Feedback should cover:

- Overall layout.
- Manual-control arrangement.
- Emergency-stop visibility.
- LiDAR display.
- Camera-feed placement.
- Robot-status information.
- Event-log design.
- Missing controls.
- Mobile layout.
- Future hardware integration requirements.

## Future Version 2 scope

The full Saras-style version may include:

- Custom 3D-printed enclosure.
- 7-inch HDMI display.
- Second floor-facing camera.
- 8×8 TOF sensor.
- Microphone and speaker.
- Speech recognition.
- Text-to-speech.
- Robot personality.
- Autonomous object seeking.
- Improved obstacle avoidance.
- Room mapping.
- ROS 2 and Nav2 integration.
- Local runtime AI planner.
- Advanced logging and monitoring.

## Project status

The project is currently in the software-planning and dashboard-prototyping stage.

The immediate next steps are:

1. Complete procurement tracking.
2. Confirm motor and encoder specifications.
3. Finalize the power architecture.
4. Prepare the wiring diagram.
5. Finalize the Version 1 chassis layout.
6. Complete the Raspberry Pi software plan.
7. Complete the ESP32 firmware plan.
8. Gather team feedback on the dashboard.
9. Begin hardware integration after procurement approval.

## Version 1 chassis design

The Version 1 robot will use a modular form-sheet chassis for low-cost prototyping.

The design includes:

- 4WD skid-steer layout.
- 65 mm wheels.
- Central low-mounted battery.
- Side-mounted motor drivers.
- ESP32 controller deck.
- Removable upper electronics deck.
- Front camera mounting position.
- Future LiDAR mounting platform.
- Accessible emergency-stop and main power switch.
- Mechanical reinforcement around motor mounts.

10. Top-view layout

                         FRONT
        ┌─────────────────────────────────┐
        │       Future camera mount       │
        │              [ K ]              │
        │                                 │
        │  O                         O    │
        │  FL motor              FR motor │
        │                                 │
        │        ┌──────────────┐         │
        │        │   LiFePO4    │         │
        │        │   BATTERY    │         │
        │        └──────────────┘         │
        │                                 │
        │  O                         O    │
        │  RL motor              RR motor │
        │                                 │
        │     [Left driver] [Right driver]│
        │          [ ESP32 ]              │
        └─────────────────────────────────┘
                          REAR

The battery should be mounted low and close to the center of the chassis. The motor drivers should be placed near the motors to keep high-current wires short. The ESP32 should be mounted away from the motor-driver heat sink and high-current wiring.

11. Side-view layout

                 Future LiDAR
                     │
              ┌──────┴──────┐
              │ upper deck  │
      camera  │ Raspberry Pi│
        │     └─────────────┘
  ┌─────┴────────────────────┐
  │       form-sheet body    │
  │       battery low        │
  └──────────────────────────┘
       O                    O
            25–35 mm clearance

The future LiDAR should be installed level and high enough to see walls and furniture. The future camera should be mounted above the front bumper with a clear view ahead.

12. Wheel and motor placement

Use a left/right differential-drive arrangement:

Left side:
- Front-left motor
- Rear-left motor

Right side:
- Front-right motor
- Rear-right motor


The Version 1 chassis is intentionally modular so the layout can be adjusted after the motors, battery, and electronics are received.

Detailed design:
`docs/chassis-design.md`
