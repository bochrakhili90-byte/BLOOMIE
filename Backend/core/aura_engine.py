def analyze_reflection(text):
    text = text.lower()

    if any(word in text for word in ["sad", "upset", "cry", "hurt", "alone"]):
        return "sad", "It is okay to feel sad. Thank you for sharing your feelings."

    if any(word in text for word in ["angry", "mad", "unfair", "frustrated", "annoyed"]):
        return "angry", "I can see that you felt frustrated. Your feeling is valid."

    if any(word in text for word in ["happy", "glad", "excited", "joy", "fun"]):
        return "happy", "It sounds like this made you feel good. That is wonderful."

    if any(word in text for word in ["sorry", "care", "help", "kind"]):
        return "empathy", "You showed care for others, which is a strong emotional skill."

    return "neutral", "Thank you for reflecting. Thinking about your feelings is important."