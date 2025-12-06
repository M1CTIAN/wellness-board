// frontend/src/services/aiService.js
const API_BASE_URL = 'http://localhost:8080/api';

export async function generateTips(profile) {
  try {
    // Get current local day to help AI customize tips (e.g. "Sunday Reset")
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const response = await fetch(`${API_BASE_URL}/generate-tips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        profile,
        context: { day: dayOfWeek }
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error || 'Failed to generate tips');
    }

    return data.tips;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

export async function expandTip(tip, profile) {
  try {
    const response = await fetch(`${API_BASE_URL}/expand-tip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile, tip }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error || 'Failed to expand tip');
    }

    return {
      ...tip, // Keep original tip data
      ...data.detail, // Merge with expanded details (description, steps)
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}
