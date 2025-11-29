---
sidebar_position: 2
---

# Hardware Requirements (Critical Section)

Successful completion of the hands-on labs, particularly those involving **NVIDIA Isaac Sim** and **Reinforcement Learning (RL) in simulation**, requires powerful computing resources. The hardware listed below represents the **minimum recommended specification** for a smooth development experience.

---

## 🛠️ Workstation for Simulation (Digital Twin Development)

The primary bottleneck for Physical AI development is the simulation environment, which requires high VRAM for ray-tracing, rendering, and training concurrent RL environments (Isaac Lab).

* **GPU:** **NVIDIA RTX 4070 Ti+** (12GB VRAM minimum)
    * **Rationale:** NVIDIA Isaac Sim is built on the Omniverse platform and leverages **RT Cores** for real-time physics and rendering. A minimum of 12GB of VRAM is critical for loading complex robot models, high-fidelity environments, and running large-batch parallel training, which is common practice in **Simulation-to-Real (Sim-to-Real)** workflows.
* **CPU/RAM:** Modern multi-core CPU (e.g., Intel i7/Ryzen 7 equivalent or better) with **32GB RAM minimum**.
    * **Rationale:** While the GPU handles the heavy lifting, the CPU and RAM are necessary to run the underlying operating system (Ubuntu is highly recommended), ROS 2 nodes, and Python training scripts efficiently.

## 💡 Edge AI Compute for Real-Time Control

The transition from the simulated environment to the physical robot requires a powerful, low-power onboard computer. This component runs the inference (execution) of your trained AI models.

* **Platform:** **NVIDIA Jetson Orin Nano/NX**
    * **Rationale:** The Jetson Orin series provides **Tensor Cores** and high TOPS (Tera Operations Per Second) performance in a compact, low-power form factor.
        * The **Orin Nano** is suitable for perception and smaller inference models.
        * The **Orin NX** (up to 100 TOPS) is preferred for more complex sensor fusion and running multiple heavy models concurrently on the robot. 

## 👁️ Sensors for Perception & Localization

Sensors bridge the gap between the physical world and the robot's digital perception system.

* **Depth/RGB-D Cameras:** **Intel RealSense D435i/D455**
    * **Rationale:** These cameras provide synchronized **RGB and depth data**, which is essential for tasks like object detection, pose estimation, and 3D environment mapping (SLAM). The 'i' variants include an **IMU (Inertial Measurement Unit)**, aiding in odometry and stable state estimation.
* **Other Sensors:** **IMUs** (Inertial Measurement Units)
    * **Rationale:** IMUs are vital for **state estimation** in legged and dynamic robots, providing acceleration and angular velocity data necessary for balance and robust control loops.

## 🤖 Robot Platforms (Deployment Targets)

The recommended platforms offer open-source ROS/ROS 2 compatibility and an SDK for research and development.

* **Humanoid/Legged Robots:** **Unitree Go2/G1, Robotis OP3**
    * **Unitree Go2/G1:** Excellent platforms for learning quadrupedal (Go2) and bipedal (G1) locomotion, control, and whole-body planning.
    * **Robotis OP3:** A well-established, fully humanoid platform ideal for deep learning on bipedal walking and manipulation.
* **"Sim-to-Real" Proxy Approach:** This textbook supports using cheaper, simpler hardware (like wheeled robots or desktop arms) to teach the **workflow pipeline** if dedicated humanoid hardware is inaccessible.

## ☁️ Cloud vs. Local Labs

For intensive, multi-hour reinforcement learning (RL) training, cloud-based resources are often more practical and cost-effective than local hardware.

| Option | Pros | Cons |
| :--- | :--- | :--- |
| **Local Labs (RTX 4070 Ti+)** | Zero hourly cost, immediate access, lower latency for testing. | High upfront cost, utility consumption, limited scalability for large RL experiments. |
| **AWS g5.2xlarge** | **Scalability** (multiple instances), **powerful GPU** (NVIDIA A10G with 24GB VRAM), pay-as-you-go model. | Higher latency, hourly cost, steep learning curve for cloud infrastructure. |

The **AWS g5.2xlarge** instance, featuring a single NVIDIA A10G GPU with 24 GB of memory, is a strong cloud-based alternative, offering double the VRAM of the minimum local recommendation, making it suitable for larger-scale simulation training.

---

The importance of the **NVIDIA Jetson Orin Nano Super** is highlighted in this video, as it demonstrates its real-world application in robotics and edge AI projects, which is the core deployment platform of this textbook. [NVIDIA's $249 Secret Weapon for Edge AI - Jetson Orin Nano Super: Driveway Monitor](https://www.youtube.com/watch?v=QHBr8hekCzg)


http://googleusercontent.com/youtube_content/0