/**
 * Safety Filter Service
 * Detects unsafe queries related to pregnancy, medical conditions, etc.
 */

const PREGNANCY_KEYWORDS = [
  'pregnant', 'pregnancy', 'first trimester', 'second trimester', 
  'third trimester', 'expecting', 'expectant mother', 'prenatal'
];

const MEDICAL_CONDITION_KEYWORDS = [
  'hernia', 'glaucoma', 'high blood pressure', 'hypertension',
  'low blood pressure', 'hypotension', 'recent surgery', 'surgery',
  'injury', 'back pain', 'neck pain', 'disc herniation',
  'osteoporosis', 'arthritis', 'heart condition', 'cardiac',
  'epilepsy', 'diabetes', 'asthma', 'eye pressure',
  'retinal', 'detached retina', 'blood clot', 'thrombosis'
];

/**
 * Check if query contains unsafe keywords
 * @param {string} query - User query
 * @returns {Object} { isUnsafe: boolean, flags: string[], category: string }
 */
export function checkSafety(query) {
  const lowerQuery = query.toLowerCase();
  const flags = [];
  let category = null;

  // Check for pregnancy-related keywords
  const pregnancyMatch = PREGNANCY_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  if (pregnancyMatch) {
    flags.push('pregnancy');
    category = 'pregnancy';
  }

  // Check for medical condition keywords
  const medicalMatch = MEDICAL_CONDITION_KEYWORDS.filter(keyword => 
    lowerQuery.includes(keyword)
  );
  if (medicalMatch.length > 0) {
    flags.push(...medicalMatch);
    if (!category) {
      category = 'medical_condition';
    }
  }

  return {
    isUnsafe: flags.length > 0,
    flags,
    category
  };
}

/**
 * Generate safety message based on category
 * @param {string} category - Safety category
 * @param {string[]} flags - Detected flags
 * @returns {string} Safety message
 */
export function generateSafetyMessage(category, flags) {
  const baseMessage = "Your question touches on an area that can be risky without personalized guidance. ";
  
  let specificGuidance = "";
  let recommendation = "";

  if (category === 'pregnancy') {
    specificGuidance = "Prenatal yoga requires special modifications and should be practiced under expert supervision. ";
    recommendation = "Instead of advanced poses or inversions, consider gentle supine poses, modified standing poses, and breathing work (pranayama) designed specifically for pregnancy. ";
  } else if (category === 'medical_condition') {
    specificGuidance = "Certain medical conditions require careful consideration and modifications to yoga practice. ";
    const condition = flags[0];
    if (condition.includes('blood pressure') || condition.includes('cardiac') || condition.includes('heart')) {
      recommendation = "Avoid intense practices, inversions, and breath retention. Focus on gentle, restorative poses and consult about appropriate modifications. ";
    } else if (condition.includes('hernia') || condition.includes('surgery')) {
      recommendation = "Avoid poses that create intra-abdominal pressure. Consider gentle stretches and consult your healthcare provider about safe movements. ";
    } else if (condition.includes('glaucoma') || condition.includes('eye') || condition.includes('retinal')) {
      recommendation = "Avoid inversions and poses that increase eye pressure. Focus on seated and standing poses, and gentle forward folds with head supported. ";
    } else {
      recommendation = "Please consult a doctor or certified yoga therapist before attempting any poses related to your condition. ";
    }
  }

  const disclaimer = "Please consult a doctor or certified yoga therapist before attempting these poses.";

  return baseMessage + specificGuidance + recommendation + disclaimer;
}
