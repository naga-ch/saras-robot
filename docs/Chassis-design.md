# Saras Robot Version 1 Form-Sheet Chassis Plan

## 1. Purpose

This plan defines a simple, low-cost, removable 4WD skid-steer chassis that can be cut from form sheets for Version 1.

The chassis is intentionally modular. It is designed to validate the motors, wheels, battery, ESP32 controller, motor drivers, and future Raspberry Pi/LiDAR placement before creating a custom 3D-printed Version 2 enclosure.

## 2. Design assumptions

This plan assumes:

- Four JGA25-class geared DC motors with encoder wiring.
- 65 mm wheels.
- Two BTS7960/IBT-2 motor-driver modules.
- One ESP32-DevKitC board.
- A 12.8 V LiFePO4 battery pack.
- Future Raspberry Pi and LD06 LiDAR installation.
- 5 mm form sheet or foam board.
- M3 mechanical fasteners.
- Separate motor brackets.

The final motor-bracket hole pattern must be measured from the purchased motors before cutting the motor-mount holes.

## 3. Recommended dimensions

Use these dimensions for the first prototype:

```text
Overall chassis length: 300 mm
Overall chassis width: 220 mm
Main base thickness: 5 mm
Upper electronics deck: 260 mm × 180 mm
Front bumper height: 70 mm
Side-wall height: 70 mm
Wheel diameter: 65 mm
Target ground clearance: 25–35 mm
```

The 300 mm × 220 mm footprint leaves room for four 65 mm wheels, a central battery, motor drivers, ESP32, and future Raspberry Pi/LiDAR mounting.

If your form sheets are smaller, reduce the base to 260 mm × 200 mm, but do not reduce the motor spacing until the wheel clearance is checked.

## 4. Chassis parts to cut

Cut the following parts from 5 mm form sheet:

| Part ID | Part | Quantity | Finished size |
|---|---|---:|---:|
| A | Main base plate | 1 | 300 mm × 220 mm |
| B | Upper electronics deck | 1 | 260 mm × 180 mm |
| C | Left side panel | 1 | 300 mm × 70 mm |
| D | Right side panel | 1 | 300 mm × 70 mm |
| E | Front bumper panel | 1 | 220 mm × 70 mm |
| F | Rear panel | 1 | 220 mm × 70 mm |
| G | Battery tray rails | 2 | 150 mm × 25 mm |
| H | Electronics support rails | 2 | 180 mm × 20 mm |
| I | Motor bracket backing plates | 4 | 60 mm × 45 mm |
| J | LiDAR temporary platform | 1 | 100 mm × 100 mm |
| K | Camera bracket plate | 1 | 80 mm × 60 mm |
| L | Internal reinforcement strips | As required | 20–30 mm wide |

## 5. Top-view layout

```text
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
```

The battery should be mounted low and close to the center of the chassis. The motor drivers should be placed near the motors to keep high-current wires short. The ESP32 should be mounted away from the motor-driver heat sink and high-current wiring.

## 6. Side-view layout

```text
                 Future LiDAR
                     │
              ┌──────┴──────┐
              │ upper deck  │
      camera  │ Raspberry Pi│
        │     └─────────────┘
        │
  ┌─────┴────────────────────┐
  │       form-sheet body    │
  │       battery low        │
  └──────────────────────────┘
       O                    O
            25–35 mm clearance
```

The future LiDAR should be installed level and high enough to see walls and furniture. The future camera should be mounted above the front bumper with a clear view ahead.

## 7. Wheel and motor placement

Use a left/right differential-drive arrangement:

```text
Left side:
- Front-left motor
- Rear-left motor

Right side:
- Front-right motor
- Rear-right motor
```

The left-front and left-rear motors will be controlled by one BTS7960 module. The right-front and right-rear motors will be controlled by the second BTS7960 module.

Before cutting permanent holes:

1. Place all four motors on the base plate.
2. Install the wheels.
3. Check that the wheels do not touch the side panels.
4. Check that the wheels have at least 5 mm side clearance.
5. Confirm both wheels on each side are parallel.
6. Mark the motor-bracket holes.
7. Remove the motors.
8. Reinforce each motor area with a backing plate.
9. Drill the holes.
10. Install the motor brackets with bolts and washers.

Do not drill the chassis from assumed JGA25 dimensions. Use the actual purchased motor and bracket as the drilling template.

## 8. Cut lines and fold lines

Print this plan or redraw it at full scale on paper.

Use the following markings:

```text
Solid line: cut line
Dashed line: fold or bend line
Cross mark: drill center
Circle: cable or mounting hole
```

For the form-sheet version, it is preferable to cut separate panels rather than rely on repeated sharp folds. Separate panels can be reinforced and replaced more easily.

## 9. Suggested hole layout

### Main base plate

Mark these areas:

```text
Motor bracket holes: based on actual brackets
Battery strap slots: two slots on each side of battery tray
ESP32 standoff holes: based on actual board mounting holes
Motor-driver standoff holes: based on selected driver modules
Cable pass-through holes: 10–15 mm diameter
Emergency-stop hole: based on selected switch body
Main power-switch hole: based on selected switch body
```

### Upper deck

Cut or mark:

```text
Raspberry Pi mounting holes: based on the actual Pi board
LiDAR opening: based on selected LiDAR bracket
Camera cable opening: 12–15 mm
Ventilation openings: above Pi and motor drivers
Service access opening: removable rear or top panel
```

Do not cut the Raspberry Pi or LiDAR holes until those components are physically available.

## 10. Assembly sequence

### Step 1: prepare panels

1. Mark all dimensions on the form sheet.
2. Cut the base, side panels, front panel, rear panel, and deck.
3. Smooth the edges.
4. Mark the front direction clearly.
5. Label each panel with its part ID.

### Step 2: assemble the base

1. Place the base plate on a flat surface.
2. Position the side panels.
3. Temporarily hold them with foam-safe tape.
4. Apply UHU POR or another adhesive approved for your exact form-sheet material.
5. Add internal reinforcement strips along the joints.
6. Allow the adhesive to cure according to its instructions.
7. Do not install motors until the joints are firm.

### Step 3: install motor brackets

1. Position the four motor brackets.
2. Add backing plates below the form sheet.
3. Use M3 bolts, washers, and nyloc nuts.
4. Tighten only enough to avoid crushing the foam.
5. Check that all four motor shafts are parallel.
6. Install wheels and check free rotation.

### Step 4: install battery tray

1. Install the two battery tray rails.
2. Add a flat battery support plate.
3. Secure the battery using two Velcro straps.
4. Keep the battery away from sharp fasteners.
5. Leave enough space to remove the battery.
6. Do not allow the battery to move during acceleration or turning.

### Step 5: install the upper deck

1. Add four support rails or spacers.
2. Keep at least 25–35 mm clearance above the battery.
3. Install the upper deck.
4. Keep the deck removable for maintenance.
5. Leave openings for cables and ventilation.

### Step 6: install electronics

Mount the following on the upper deck:

```text
Rear/side area: BTS7960 motor drivers
Center area: ESP32
Future center/front area: Raspberry Pi
Future top/center area: LD06 LiDAR bracket
Front area: camera bracket
```

Use standoffs or brackets. Do not glue the electronics directly to the form sheet.

## 11. Adhesive recommendation

Use a foam-safe adhesive only for joining the structural form-sheet panels.

Recommended:

```text
UHU POR Foam Rubber Adhesive
```

Use mechanical fasteners for:

- Motors.
- Battery tray.
- ESP32.
- Motor drivers.
- Emergency stop.
- Main power switch.
- Raspberry Pi.
- LiDAR.
- Camera bracket.

Adhesive alone is not suitable for heavy or vibrating components.

## 12. Cable routing

Use separate cable paths:

```text
High-current path:
Battery → fuse → switch/emergency stop → motor drivers

Logic path:
Battery → 5 V regulator → ESP32 and sensors

Signal path:
Encoders → ESP32
ESP32 → Raspberry Pi USB serial
LiDAR → Raspberry Pi
Camera → Raspberry Pi CSI
```

Keep motor and battery cables away from encoder and camera cables. Add grommets or heat-shrink around every cable pass-through.

## 13. Component placement rules

- Keep the battery low and centered.
- Keep motor-driver cables short.
- Keep the ESP32 away from the motor-driver heat sink.
- Keep the LiDAR level.
- Keep the camera above the front bumper.
- Keep the emergency stop reachable from outside the chassis.
- Keep the main power switch accessible.
- Keep the upper deck removable.
- Leave space for future Pi and LiDAR installation.
- Do not block wheel movement with side panels.

## 14. Mechanical acceptance tests

Before powering electronics:

- [ ] Chassis is square.
- [ ] All four wheels rotate freely.
- [ ] Wheels do not touch side panels.
- [ ] Motor brackets do not flex excessively.
- [ ] Battery tray holds the battery firmly.
- [ ] Upper deck is removable.
- [ ] Electronics mounting points are secure.
- [ ] Emergency-stop and power-switch positions are accessible.
- [ ] Cable openings have no sharp edges.
- [ ] Chassis does not twist significantly when lifted diagonally.
- [ ] Ground clearance is adequate.
- [ ] Future Pi and LiDAR locations are reserved.

## 15. Recommended Version 1 drawing workflow

1. Print this document or copy the dimensions into a drawing program.
2. Draw the base plate at 300 mm × 220 mm.
3. Draw the side, front, and rear panels at full scale.
4. Draw the upper deck at 260 mm × 180 mm.
5. Print the layout on A4 pages using 100% scale if necessary.
6. Tape pages together to form full-size templates.
7. Place templates on the form sheet.
8. Trace the outlines.
9. Cut the panels.
10. Test-fit all panels without adhesive.
11. Mark actual motor-bracket holes after receiving the motors.
12. Assemble using foam-safe adhesive and mechanical reinforcement.

## 16. Important limitation

This is a practical prototype layout, not a final production CAD drawing. The following dimensions must be updated after the actual components arrive:

- Motor bracket hole pattern.
- Battery dimensions.
- Motor-driver mounting holes.
- Emergency-stop hole diameter.
- Power-switch hole diameter.
- Raspberry Pi mounting holes.
- LiDAR bracket and cable opening.
- Camera mounting hole pattern.

The Version 2 enclosure should be redesigned in Fusion 360 or another CAD tool after Version 1 testing identifies the correct component positions and cable routes.
