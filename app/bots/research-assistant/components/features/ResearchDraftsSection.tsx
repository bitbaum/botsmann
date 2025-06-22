/**
 * ResearchDraftsSection.tsx
 *
 * This component showcases the AI-Generated Research Drafts feature of the Research Assistant Bot.
 * It demonstrates how the bot can synthesize information from various sources to generate
 * structured research content like abstracts, literature reviews, and methodology sections
 * with proper citations and formatting.
 */

import React, { useState } from "react";
import {
  FiFileText,
  FiBookOpen,
  FiClipboard,
  FiEdit,
  FiCheck,
} from "react-icons/fi";
import styles from "../../styles.module.css";

type DraftType = "abstract" | "literature" | "methodology" | "discussion";

interface DraftExample {
  type: DraftType;
  title: string;
  content: string;
  sources: string[];
}

const ResearchDraftsSection: React.FC = () => {
  const [selectedDraft, setSelectedDraft] = useState<DraftType>("abstract");

  const draftExamples: Record<DraftType, DraftExample> = {
    abstract: {
      type: "abstract",
      title: "Effects of Mindfulness Meditation on Cognitive Performance",
      content: `This study investigates the impact of regular mindfulness meditation practices on cognitive performance metrics, including attention span, working memory, and problem-solving capabilities. Through a randomized controlled trial involving 120 participants over a 12-week period, we found significant improvements in sustained attention (p < 0.01) and working memory capacity (p < 0.05) among the meditation group compared to controls. The results suggest that even short daily meditation sessions (10-15 minutes) can yield measurable cognitive benefits, potentially offering a cost-effective intervention for cognitive enhancement in educational and clinical settings.`,
      sources: [
        "Davidson, R. J., & Kaszniak, A. W. (2015). Conceptual and methodological issues in research on mindfulness and meditation. American Psychologist, 70(7), 581-592.",
        "Zeidan, F., Johnson, S. K., Diamond, B. J., David, Z., & Goolkasian, P. (2010). Mindfulness meditation improves cognition: Evidence of brief mental training. Consciousness and Cognition, 19(2), 597-605.",
        "Lutz, A., Slagter, H. A., Dunne, J. D., & Davidson, R. J. (2008). Attention regulation and monitoring in meditation. Trends in Cognitive Sciences, 12(4), 163-169.",
      ],
    },
    literature: {
      type: "literature",
      title: "Climate Change Adaptation Strategies in Urban Planning",
      content: `Recent research on climate change adaptation in urban environments has focused on three primary domains: infrastructure resilience, policy frameworks, and community engagement. Tang et al. (2022) found that cities implementing comprehensive adaptation policies experienced 23% less infrastructure damage during extreme weather events. Similarly, Hernandez & Wong (2021) documented successful community-based adaptation initiatives across 15 global cities, highlighting the importance of local knowledge and participation. Meanwhile, technical innovations in urban design were evaluated by Patel et al. (2023), who cataloged emerging green infrastructure solutions with measurable climate adaptation benefits. This review reveals a growing consensus that effective urban climate adaptation requires integrated approaches combining policy reform, infrastructure modernization, and inclusive planning processes that center vulnerable communities.`,
      sources: [
        "Tang, J., Chen, H., & Singh, P. (2022). Measuring outcomes of urban climate adaptation policies: A comparative analysis of 40 global cities. Urban Climate, 31, 100545.",
        "Hernandez, M., & Wong, K. (2021). Community-led climate adaptation: Case studies from the Global South. Journal of Environmental Planning and Management, 64(10), 1863-1882.",
        "Patel, R., Mahmood, A., & Johnson, T. (2023). Technical innovations in green infrastructure for climate resilient cities. Landscape and Urban Planning, 221, 104355.",
        "Carter, J.G., Cavan, G., Connelly, A., Guy, S., Handley, J., & Kazmierczak, A. (2015). Climate change and the city: Building capacity for urban adaptation. Progress in Planning, 95, 1-66.",
      ],
    },
    methodology: {
      type: "methodology",
      title: "Automated Detection of Misinformation in Social Media",
      content: `This study employs a mixed-methods approach to detect and classify misinformation in social media content. First, we collected a dataset of 50,000 posts from multiple platforms (Twitter, Facebook, and Reddit) using API access and specialized scraping tools between January-March 2023. The dataset was balanced across political topics, health claims, and scientific statements. We implemented a two-stage classification system: (1) a BERT-based language model fine-tuned on established misinformation datasets (accuracy: 87.3%), followed by (2) a fact-verification module cross-referencing claims against trusted knowledge bases. For validation, a panel of 5 fact-checking experts manually verified a random subset of 1,000 posts, achieving an inter-rater reliability coefficient of κ=0.82. Statistical analysis was performed using Python's scikit-learn package, with significance thresholds set at p<0.05 for all comparisons between classification approaches.`,
      sources: [
        "Zhou, X., & Zafarani, R. (2020). A survey of fake news: Fundamental theories, detection methods, and opportunities. ACM Computing Surveys, 53(5), 1-40.",
        "Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2018). BERT: Pre-training of deep bidirectional transformers for language understanding. arXiv preprint arXiv:1810.04805.",
        "Shaar, S., Babulkov, N., Da San Martino, G., & Nakov, P. (2020). That is a known lie: Detecting previously fact-checked claims. arXiv preprint arXiv:2005.06058.",
      ],
    },
    discussion: {
      type: "discussion",
      title: "Ethical Implications of Facial Recognition in Public Spaces",
      content: `Our findings reveal a complex ethical landscape surrounding facial recognition technology (FRT) deployment in public spaces. The tension between security benefits and privacy concerns emerges as a central theme across stakeholder interviews. While law enforcement representatives emphasized crime reduction metrics (15-22% in pilot locations), privacy advocates highlighted the disproportionate impact on marginalized communities, with false positive rates 3-5 times higher for darker-skinned individuals in our technical evaluation. The regulatory gap identified in our policy analysis suggests current governance frameworks remain inadequate for addressing algorithmic bias and consent issues. These results support a moratorium on certain FRT applications until technical improvements and robust regulatory frameworks can be established. Future research should explore consent mechanisms for public surveillance and investigate alternative security approaches that present fewer ethical complications. These findings contribute to the growing literature on algorithmic governance and suggest that technological capability must be balanced with ethical considerations and social impact assessments before widespread implementation.`,
      sources: [
        "Buolamwini, J., & Gebru, T. (2018). Gender shades: Intersectional accuracy disparities in commercial gender classification. Proceedings of the 1st Conference on Fairness, Accountability and Transparency, 81, 77-91.",
        "Najibi, A. (2020). Racial discrimination in face recognition technology. Science in the News, Harvard University Graduate School of Arts and Sciences.",
        "European Union Agency for Fundamental Rights. (2021). Facial recognition technology: fundamental rights considerations in the context of law enforcement.",
        "Wang, Y., & Kosinski, M. (2018). Deep neural networks are more accurate than humans at detecting sexual orientation from facial images. Journal of Personality and Social Psychology, 114(2), 246-257.",
      ],
    },
  };

  const draftTypes = [
    { value: "abstract", label: "Abstract", icon: <FiClipboard /> },
    { value: "literature", label: "Literature Review", icon: <FiBookOpen /> },
    { value: "methodology", label: "Methodology", icon: <FiFileText /> },
    { value: "discussion", label: "Discussion", icon: <FiEdit /> },
  ];

  const currentDraft = draftExamples[selectedDraft];

  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <h2 className={styles.featureTitle}>AI-Generated Research Drafts</h2>
        <p className={styles.featureSubtitle}>
          Transform your research notes and sources into polished, structured
          content with proper citations
        </p>

        <div className={styles.draftSectionContainer}>
          <div className={styles.draftTypeSelector}>
            <h3>Select Draft Type</h3>
            <div className={styles.draftTypeButtons}>
              {draftTypes.map((type) => (
                <button
                  key={type.value}
                  className={`${styles.draftTypeButton} ${selectedDraft === type.value ? styles.activeDraftType : ""}`}
                  onClick={() => setSelectedDraft(type.value as DraftType)}
                >
                  <span className={styles.draftTypeIcon}>{type.icon}</span>
                  <span>{type.label}</span>
                  {selectedDraft === type.value && (
                    <span className={styles.draftTypeActiveIndicator}>
                      <FiCheck />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.draftPreviewContainer}>
            <div className={styles.draftPreviewHeader}>
              <h3>{currentDraft.title}</h3>
              <span className={styles.draftTypeBadge}>
                {draftTypes.find((t) => t.value === selectedDraft)?.label}
              </span>
            </div>

            <div className={styles.draftContent}>
              <p>{currentDraft.content}</p>
            </div>

            <div className={styles.draftSources}>
              <h4>References</h4>
              <ul>
                {currentDraft.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>

            <div className={styles.draftFeatures}>
              <div className={styles.draftFeatureItem}>
                <FiCheck /> Proper academic formatting
              </div>
              <div className={styles.draftFeatureItem}>
                <FiCheck /> Automatic citations
              </div>
              <div className={styles.draftFeatureItem}>
                <FiCheck /> Style customization
              </div>
              <div className={styles.draftFeatureItem}>
                <FiCheck /> Export to multiple formats
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featureFooter}>
          <h3>How It Works</h3>
          <ol className={styles.workflowSteps}>
            <li>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepText}>
                Upload your research materials and sources
              </span>
            </li>
            <li>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepText}>
                Select the type of content you need
              </span>
            </li>
            <li>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepText}>
                Provide specific focus or requirements
              </span>
            </li>
            <li>
              <span className={styles.stepNumber}>4</span>
              <span className={styles.stepText}>
                Review, edit, and export your research draft
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ResearchDraftsSection;
