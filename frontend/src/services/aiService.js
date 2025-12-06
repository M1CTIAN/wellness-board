// frontend/src/services/aiService.js - MOCK VERSION

const tipsByGoal = {
  'Better Sleep': [
    { id: '1', icon: '🌙', title: 'Optimize Your Sleep Schedule', short: 'Go to bed and wake up at the same time every day, even on weekends.' },
    { id: '2', icon: '📱', title: 'Digital Sunset Routine', short: 'Put away screens 1 hour before bed to improve melatonin production.' },
    { id: '3', icon: '🛏️', title: 'Create a Sleep Sanctuary', short: 'Keep your bedroom cool, dark, and quiet for optimal rest.' },
    { id: '4', icon: '☕', title: 'Mind Your Caffeine', short: 'Avoid caffeine after 2 PM to prevent sleep disruption.' },
    { id: '5', icon: '🧘', title: 'Wind-Down Ritual', short: 'Practice relaxation techniques like deep breathing before bed.' },
  ],
  'Build Strength': [
    { id: '1', icon: '💪', title: 'Progressive Overload', short: 'Gradually increase weight, reps, or sets to build muscle over time.' },
    { id: '2', icon: '🥩', title: 'Protein Timing', short: 'Consume protein within 2 hours after workout for optimal recovery.' },
    { id: '3', icon: '😴', title: 'Rest Days Matter', short: 'Take 1-2 rest days weekly to allow muscles to repair and grow.' },
    { id: '4', icon: '🏋️', title: 'Compound Movements', short: 'Focus on squats, deadlifts, and bench press for efficient gains.' },
    { id: '5', icon: '💧', title: 'Stay Hydrated', short: 'Drink water before, during, and after workouts for peak performance.' },
  ],
  'Reduce Stress': [
    { id: '1', icon: '🧘', title: 'Daily Meditation', short: 'Start with just 5 minutes of mindfulness each morning.' },
    { id: '2', icon: '🌳', title: 'Nature Therapy', short: 'Spend 20 minutes outdoors daily to lower cortisol levels.' },
    { id: '3', icon: '📝', title: 'Journaling Practice', short: 'Write down your thoughts to process emotions and reduce anxiety.' },
    { id: '4', icon: '🫁', title: 'Box Breathing', short: 'Use 4-4-4-4 breathing technique when feeling overwhelmed.' },
    { id: '5', icon: '🎵', title: 'Music Therapy', short: 'Listen to calming music to activate your parasympathetic nervous system.' },
  ],
  'More Energy': [
    { id: '1', icon: '☀️', title: 'Morning Light Exposure', short: 'Get 10-15 minutes of sunlight within an hour of waking up.' },
    { id: '2', icon: '🥗', title: 'Energy-Boosting Foods', short: 'Eat complex carbs and proteins for sustained energy throughout the day.' },
    { id: '3', icon: '🚶', title: 'Movement Breaks', short: 'Take a 5-minute walk every hour to combat afternoon fatigue.' },
    { id: '4', icon: '💧', title: 'Hydration Check', short: 'Dehydration is a major cause of fatigue—aim for 8 glasses daily.' },
    { id: '5', icon: '😴', title: 'Power Napping', short: 'A 20-minute nap between 1-3 PM can restore alertness.' },
  ],
  'Eat Healthier': [
    { id: '1', icon: '🌈', title: 'Eat the Rainbow', short: 'Include colorful fruits and vegetables in every meal.' },
    { id: '2', icon: '🍽️', title: 'Mindful Eating', short: 'Eat slowly and without distractions to improve digestion.' },
    { id: '3', icon: '📦', title: 'Meal Prep Sundays', short: 'Prepare healthy meals in advance to avoid unhealthy choices.' },
    { id: '4', icon: '🥤', title: 'Limit Sugary Drinks', short: 'Replace sodas with water, tea, or infused water.' },
    { id: '5', icon: '🥜', title: 'Smart Snacking', short: 'Keep healthy snacks like nuts and fruits within reach.' },
  ],
  'Mental Clarity': [
    { id: '1', icon: '🧠', title: 'Brain-Boosting Foods', short: 'Include omega-3 rich foods like fish and walnuts in your diet.' },
    { id: '2', icon: '📵', title: 'Digital Detox', short: 'Take regular breaks from screens to reduce mental fatigue.' },
    { id: '3', icon: '📚', title: 'Continuous Learning', short: 'Challenge your brain with puzzles, reading, or learning new skills.' },
    { id: '4', icon: '🎯', title: 'Single-Tasking', short: 'Focus on one task at a time for better concentration.' },
    { id: '5', icon: '💤', title: 'Quality Sleep', short: 'Aim for 7-9 hours of sleep to optimize cognitive function.' },
  ],
  default: [
    { id: '1', icon: '💤', title: 'Improve Sleep Quality', short: 'Establish a consistent bedtime routine for better rest.' },
    { id: '2', icon: '🏃', title: 'Daily Movement', short: 'Aim for 30 minutes of moderate exercise each day.' },
    { id: '3', icon: '🧘', title: 'Mindfulness Practice', short: 'Start with 5 minutes of meditation daily.' },
    { id: '4', icon: '💧', title: 'Stay Hydrated', short: 'Drink at least 8 glasses of water throughout the day.' },
    { id: '5', icon: '🥗', title: 'Balanced Nutrition', short: 'Include vegetables in every meal for optimal health.' },
  ],
};

export async function generateTips(profile) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Find matching tips or use default
  const tips = tipsByGoal[profile.goal] || tipsByGoal.default;
  
  // Shuffle and return tips
  return [...tips].sort(() => Math.random() - 0.5);
}

export async function expandTip(tip, profile) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const stepsMap = {
    'Optimize Your Sleep Schedule': [
      'Choose a bedtime that allows for 7-9 hours of sleep.',
      'Set an alarm for the same time every morning.',
      'Avoid sleeping in on weekends—keep it within 1 hour.',
      'Create a pre-sleep routine to signal your body it\'s bedtime.',
      'Be patient—it takes about 2 weeks to adjust to a new schedule.',
    ],
    'Digital Sunset Routine': [
      'Set a daily reminder 1 hour before your target bedtime.',
      'Put your phone in another room or use Do Not Disturb mode.',
      'Switch to relaxing activities like reading or light stretching.',
      'Use blue light filters if you must use screens.',
      'Keep a notepad by your bed for any thoughts you want to remember.',
    ],
    'Progressive Overload': [
      'Track your current weights, reps, and sets for each exercise.',
      'Increase weight by 2.5-5 lbs when you can complete all sets easily.',
      'If you can\'t increase weight, add 1-2 more reps per set.',
      'Focus on proper form before adding more weight.',
      'Review and adjust your program every 4-6 weeks.',
    ],
    'Daily Meditation': [
      'Start with just 2-5 minutes per day.',
      'Choose a quiet, comfortable spot.',
      'Focus on your breath—count inhales and exhales.',
      'When your mind wanders, gently bring attention back to breathing.',
      'Gradually increase duration as you build the habit.',
    ],
    default: [
      'Start by setting a clear intention for this habit.',
      'Begin with small, manageable actions each day.',
      'Track your progress in a journal or app.',
      'Celebrate small wins to stay motivated.',
      'Adjust your approach based on what works best for you.',
    ],
  };

  const steps = stepsMap[tip.title] || stepsMap.default;

  return {
    title: tip.title,
    icon: tip.icon,
    description: `This personalized tip is designed for someone aged ${profile.age} who wants to ${profile.goal.toLowerCase()}. Following these steps consistently will help you build a sustainable healthy habit.`,
    steps,
  };
}
