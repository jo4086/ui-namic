# improvements(English)

## 2025-04-10

### 1. Modularization of Modules

-   Split each style module into independent units to improve unit testing and reusability.

-   **Example:**

    -   `buildBaseModule`
    -   `buildPseudoModule`
    -   `buildMediaModule`
    -   `buildKeyframesModule`

### 2. Connecting the META System

-   Centralized **META** system to handle unique information for each module.

-   All modules will reference **META** to reduce redundancy and improve maintainability.

### 3. Media Module Restructuring

-   Reworked the media module to integrate with dynamic and keyframes.

-   Each module will handle its specific conditions dynamically.

### 4. Defining Module Invocation & Bundle Pipeline

-   Define how modules are invoked and composed into a bundle via `buildStyleBundle`.

-   Establish recursive relationships between **media**, **dynamic**, and **keyframes**.

### 5. Distinguishing Dynamic and Base Flags

-   Use flags to differentiate between dynamic and base styles.

-   Dynamically adjust class names and keyframe names based on the flag.
