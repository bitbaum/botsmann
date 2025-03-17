/**
 * Type definitions for the Imhotep Medical Expert bot
 */

/**
 * Health topic information displayed in the topic grid
 * 
 * @property {string} name - The display name of the health topic
 * @property {string} icon - Emoji or icon representing the topic
 * @property {string} description - Brief description of the topic
 * @property {string} query - Pre-defined query to send to the bot when clicked
 */
export interface HealthTopic {
  name: string;
  icon: string;
  description: string;
  query: string;
}

/**
 * Common health question and answer for the Q&A section
 * 
 * @property {string} question - The health question
 * @property {string} answer - Imhotep's evidence-based answer
 * @property {string} category - Category/topic the question belongs to
 */
export interface HealthQuestion {
  question: string;
  answer: string;
  category: string;
}

/**
 * Patient intake form data structure
 * 
 * @property {string} name - Patient's name
 * @property {number} age - Patient's age
 * @property {string} gender - Patient's gender
 * @property {string[]} symptoms - Array of current symptoms
 * @property {string[]} medicalHistory - Array of past medical conditions
 * @property {string[]} medications - Current medications
 * @property {string} concerns - Primary health concerns
 */
export interface PatientIntakeForm {
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  medicalHistory: string[];
  medications: string[];
  concerns: string;
}

/**
 * Health assessment report generated from patient intake
 * 
 * @property {string} summary - Overview of health status
 * @property {RiskFactor[]} riskFactors - Identified health risk factors
 * @property {Recommendation[]} recommendations - Health recommendations
 */
export interface HealthReport {
  summary: string;
  riskFactors: RiskFactor[];
  recommendations: Recommendation[];
}

/**
 * Health risk factor identified in assessment
 * 
 * @property {string} name - Name of the risk factor
 * @property {string} description - Description of the risk
 * @property {string} severity - Low, Medium, or High severity
 */
export interface RiskFactor {
  name: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

/**
 * Health recommendation provided in assessment
 * 
 * @property {string} category - Category of recommendation
 * @property {string} description - Detailed recommendation
 * @property {string} reasoning - Why this is recommended
 */
export interface Recommendation {
  category: string;
  description: string;
  reasoning: string;
} 