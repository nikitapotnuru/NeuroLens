def calculate_autism_risk(metrics):
    """
    Calculates weighted behavioral risk percentage based on deviation scores.
    """
    WEIGHTS = {
        'eye_tracking': 0.30,
        'reaction_time': 0.25,
        'fixation': 0.25,
        'attention': 0.20
    }
    
    final_score = (
        (metrics['eye_tracking_risk'] * WEIGHTS['eye_tracking']) +
        (metrics['reaction_time_risk'] * WEIGHTS['reaction_time']) +
        (metrics['fixation_risk'] * WEIGHTS['fixation']) +
        (metrics['attention_risk'] * WEIGHTS['attention'])
    )
    
    if 0 <= final_score <= 30:
        category = "Low Risk"
    elif 31 <= final_score <= 60:
        category = "Moderate Risk"
    else:
        category = "High Risk"
        
    return {
        "final_risk_percentage": round(final_score, 2),
        "risk_category": category
    }