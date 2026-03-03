import random

def get_live_metric_frame():
    """Returns a single frame of simulated telemetry from OpenCV and Arduino"""
    return {
        "eye_tracking_accuracy": round(random.uniform(60, 95), 1),
        "reaction_time_ms": random.randint(300, 800),
        "fixation_duration_sec": round(random.uniform(0.5, 3.0), 1),
        "attention_consistency": round(random.uniform(50, 90), 1),
        "distance_cm": round(random.uniform(45, 55), 1),
        "event": random.choice(["", "Gaze Shifted", "LED Triggered", "Audio Played"])
    }