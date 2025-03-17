/**
 * DailyQuestionsSection.tsx
 * 
 * This component showcases the Research Rabbit Holes feature of the
 * Nerd AI Research Assistant. It demonstrates how Nerd generates intellectually
 * stimulating questions that lead researchers down unexpected but fruitful paths
 * of inquiry, sparking creative thinking and new directions for exploration.
 */

import React, { useState } from 'react';
import { FiRotateCw, FiBookmark, FiMessageSquare, FiClock, FiPlus } from 'react-icons/fi';
import styles from '../../styles.module.css';

interface ResearchField {
  id: string;
  name: string;
  questions: string[];
}

const DailyQuestionsSection: React.FC = () => {
  const [selectedField, setSelectedField] = useState('neuroscience');
  const [answering, setAnswering] = useState<number | null>(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const [customField, setCustomField] = useState('');
  
  const researchFields: ResearchField[] = [
    {
      id: 'neuroscience',
      name: 'Neuroscience',
      questions: [
        "How might the brain's default mode network influence creative problem-solving in ways we haven't yet measured?",
        "What if neuroplasticity could be selectively enhanced in targeted brain regions – how might this change our approach to treating neurodegenerative disorders?",
        "Could the mechanisms of memory consolidation during sleep be artificially replicated to enhance learning while awake?",
        "What are the potential implications of recent findings on neuronal quantum effects for our understanding of consciousness?",
        "How might glial cells, beyond their known supportive functions, be actively participating in cognitive processes?"
      ]
    },
    {
      id: 'neurotechnology',
      name: 'Neurotechnology',
      questions: [
        "How might bidirectional brain-computer interfaces reshape our concept of personal identity and cognitive boundaries?",
        "What novel approaches to neural dust technology could enable non-invasive deep brain monitoring?",
        "Could neurofeedback systems be designed to operate at the level of individual neural circuits rather than broader brain regions?",
        "What if synaptic-level brain-machine interfaces could selectively strengthen or weaken specific memory traces?",
        "How might optogenetic techniques be combined with AI to create self-regulating neural intervention systems?"
      ]
    },
    {
      id: 'psychedelics',
      name: 'Psychedelics Research',
      questions: [
        "How might the default mode network disruption observed during psychedelic experiences inform new treatments for rigid thinking patterns in conditions beyond depression?",
        "What if psychedelic-induced neuroplasticity could be pharmacologically isolated from the subjective effects?",
        "Could the temporary ego dissolution experienced during psychedelic therapy provide insights for AI consciousness research?",
        "What novel biomarkers might predict individual responses to psychedelic therapy?",
        "How might traditional indigenous knowledge about plant medicines inform modern psychedelic research protocols?"
      ]
    },
    {
      id: 'climate-science',
      name: 'Climate Science',
      questions: [
        "What overlooked geological carbon sinks might we be failing to include in current climate models?",
        "How might changing ocean circulation patterns interact with marine microbiomes to create feedback loops we haven't anticipated?",
        "What if urban heat islands could be transformed into renewable energy collection systems – what technologies would make this possible?",
        "Could traditional indigenous land management techniques be scaled to address modern carbon sequestration needs?",
        "What unexpected ecological adaptations might emerge in response to increased atmospheric CO2 that could inform human adaptations?"
      ]
    },
    {
      id: 'artificial-intelligence',
      name: 'Artificial Intelligence',
      questions: [
        "How might neuromorphic computing architectures address current limitations in AI's ability to handle contextual understanding?",
        "What unexpected emergent behaviors might arise in multi-agent AI systems that operate without centralized control?",
        "How could we design AI systems that explain their reasoning in ways that actually enhance human understanding rather than simply providing outputs?",
        "What cognitive biases might we be unintentionally embedding in AI systems that haven't yet been identified?",
        "Could AI systems be designed to deliberately optimize for scientific surprise rather than prediction accuracy?"
      ]
    },
    {
      id: 'nuclear-fusion',
      name: 'Nuclear Fusion',
      questions: [
        "What materials or configurations might enable stable plasma confinement at lower magnetic field strengths?",
        "How might biological systems that efficiently manage energy transfer inform new approaches to fusion engineering?",
        "What if quantum computing could optimize fusion plasma dynamics in real-time?",
        "Could hybrid fission-fusion systems provide a more practical intermediate step toward commercial fusion power?",
        "What overlooked nuclear reactions or fuel cycles might offer unexpected advantages for fusion energy production?"
      ]
    },
    {
      id: 'gene-editing',
      name: 'Gene Editing',
      questions: [
        "How might we develop gene editing systems that adapt to cellular context dynamically?",
        "What if CRISPR-like systems could be trained to recognize and edit epigenetic modifications rather than DNA sequences?",
        "Could synthetic genetic circuits be designed to self-regulate across multiple generations of cells?",
        "What unexplored roles might non-coding RNAs play in improving the precision of gene editing techniques?",
        "How might biomimetic approaches to error correction improve the safety profile of gene therapies?"
      ]
    },
    {
      id: 'cosmic-structure',
      name: 'Cosmic Structure Formation',
      questions: [
        "What if the apparent acceleration of cosmic expansion is actually an artifact of inhomogeneous structure formation?",
        "How might primordial magnetic fields have influenced the formation of the first stars and galaxies?",
        "Could alternative dark matter models better explain observed galaxy rotation curves without requiring modification of gravity?",
        "What novel observational techniques might reveal the detailed structure of cosmic filaments?",
        "How might the interaction between baryonic feedback and dark matter halos resolve current tensions in cosmological simulations?"
      ]
    },
    {
      id: 'quantum-computing',
      name: 'Quantum Computing',
      questions: [
        "What mathematical structures beyond tensor networks might prove useful for modeling quantum entanglement?",
        "How might quantum algorithms specifically designed for simulation of biological systems open new frontiers in healthcare?",
        "What if quantum error correction could be reimagined using biological self-repair mechanisms as inspiration?",
        "Could quantum computing approaches reveal new patterns in seemingly chaotic economic or social systems?",
        "What theoretical barriers might exist beyond quantum supremacy that we haven't yet anticipated?"
      ]
    }
  ];

  const currentField = researchFields.find(field => field.id === selectedField) || researchFields[0];
  
  const handleAnswerClick = (index: number) => {
    setAnswering(answering === index ? null : index);
  };

  const handleAddCustomField = () => {
    // In a real implementation, this would add the field to the user's profile
    // For now, we'll direct them to ChatGPT
    window.open('https://chatgpt.com/g/research-assistant', '_blank');
  };

  return (
    <section className={styles.featureSection} id="daily-questions">
      <div className={styles.container}>
        <h2 className={styles.featureTitle}>Research Rabbit Holes</h2>
        <p className={styles.featureSubtitle}>
          Venture down intellectually stimulating paths that challenge your thinking and lead to unexpected discoveries
        </p>

        <div className={styles.questionSectionContainer}>
          <div className={styles.fieldSelector}>
            <h3>Research Fields</h3>
            <div className={styles.fieldButtons}>
              {researchFields.map(field => (
                <button
                  key={field.id}
                  className={`${styles.fieldButton} ${selectedField === field.id ? styles.activeField : ''}`}
                  onClick={() => setSelectedField(field.id)}
                >
                  {field.name}
                </button>
              ))}
              
              {/* Custom field input */}
              <div className="mt-4 flex w-full">
                <input
                  type="text"
                  value={customField}
                  onChange={(e) => setCustomField(e.target.value)}
                  placeholder="Enter your research field..."
                  className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddCustomField}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 flex items-center"
                  disabled={!customField.trim()}
                >
                  <FiPlus className="mr-1" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.questionsContainer}>
            <div className={styles.questionsHeader}>
              <h3>Today's Questions for {currentField.name}</h3>
              <div className={styles.questionActions}>
                <button className={styles.iconButton} onClick={() => setShowPrevious(!showPrevious)}>
                  <FiClock />
                  <span>{showPrevious ? 'Show Today\'s' : 'Show Previous'}</span>
                </button>
                <button className={styles.iconButton}>
                  <FiRotateCw />
                  <span>Refresh Questions</span>
                </button>
              </div>
            </div>

            <div className={styles.questionsList}>
              {currentField.questions.map((question, index) => (
                <div key={index} className={styles.questionCard}>
                  <p className={styles.questionText}>{question}</p>
                  <div className={styles.questionCardFooter}>
                    <button 
                      className={`${styles.answerButton} ${answering === index ? styles.answeringActive : ''}`}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <FiMessageSquare />
                      <span>{answering === index ? 'Close' : 'Answer'}</span>
                    </button>
                    <button className={styles.saveButton}>
                      <FiBookmark />
                      <span>Save</span>
                    </button>
                  </div>
                  
                  {answering === index && (
                    <div className={styles.answerArea}>
                      <textarea 
                        className={styles.answerTextarea} 
                        placeholder="Write your thoughts on this question..."
                        rows={4}
                      />
                      <div className={styles.answerActions}>
                        <button className={styles.secondaryButton}>Cancel</button>
                        <button className={styles.primaryButton}>Save Response</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.questionFeatures}>
          <div className={styles.featureCard}>
            <h4>Personalized Exploration</h4>
            <p>Questions adapt to your research interests and evolve as your intellectual journey progresses</p>
          </div>
          <div className={styles.featureCard}>
            <h4>Interdisciplinary Connections</h4>
            <p>Discover unexpected links between your field and others to inspire innovative approaches</p>
          </div>
          <div className={styles.featureCard}>
            <h4>Track Intellectual Journey</h4>
            <p>Build a library of your responses to track the evolution of your thinking over time</p>
          </div>
          <div className={styles.featureCard}>
            <h4>Collaborative Exploration</h4>
            <p>Share questions with colleagues and compare responses to generate new insights</p>
          </div>
        </div>

        <div className={styles.questionSchedule}>
          <h3>Customize Your Question Schedule</h3>
          <div className={styles.scheduleOptions}>
            <div className={styles.scheduleOption}>
              <input type="radio" id="daily" name="schedule" value="daily" defaultChecked />
              <label htmlFor="daily">Daily (5 questions)</label>
            </div>
            <div className={styles.scheduleOption}>
              <input type="radio" id="weekly" name="schedule" value="weekly" />
              <label htmlFor="weekly">Weekly (10 questions)</label>
            </div>
            <div className={styles.scheduleOption}>
              <input type="radio" id="custom" name="schedule" value="custom" />
              <label htmlFor="custom">Custom Schedule</label>
            </div>
          </div>
          <button className={styles.primaryButton}>Save Preferences</button>
        </div>
      </div>
    </section>
  );
};

export default DailyQuestionsSection; 