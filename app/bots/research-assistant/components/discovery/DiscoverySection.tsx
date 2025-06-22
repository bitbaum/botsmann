/**
 * DiscoverySection.tsx
 *
 * This component showcases the Discovery Mode feature of the Nerd AI Research Assistant.
 * It demonstrates how Nerd can identify research gaps, suggest novel connections
 * between concepts, and generate hypotheses that could lead to significant breakthroughs.
 */

import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles.module.css";

interface ResearchDomain {
  id: string;
  name: string;
  description: string;
  insights: string[];
}

const DiscoverySection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState("ai-ethics");

  const researchDomains: ResearchDomain[] = [
    {
      id: "ai-ethics",
      name: "AI Ethics & Governance",
      description:
        "Exploring the moral implications and regulatory frameworks for artificial intelligence systems.",
      insights: [
        "Cross-domain research suggests that combining indigenous knowledge systems with AI ethics could produce more culturally inclusive governance frameworks.",
        "Analysis of historical technology regulation reveals a pattern where narrow technical solutions fail when not paired with socio-cultural adaptation strategies.",
        "Unexplored connection between environmental law precedents and AI liability frameworks could address current gaps in algorithmic accountability.",
      ],
    },
    {
      id: "climate-solutions",
      name: "Climate Change Solutions",
      description:
        "Investigating innovative approaches to mitigate and adapt to global climate change.",
      insights: [
        "Traditional agricultural practices from three distinct geographical regions show unexplored potential for carbon sequestration when combined with modern soil science.",
        "Overlooked research on deep ocean currents suggests possible mechanical intervention points for heat redistribution that haven't been modeled in climate simulations.",
        "Pattern analysis indicates that urban architectural designs inspired by certain biological structures could reduce city heat islands by up to 4°C while requiring minimal energy input.",
      ],
    },
    {
      id: "neuroscience",
      name: "Cognitive Neuroscience",
      description:
        "Studying the biological processes underlying cognition with a focus on neural connections.",
      insights: [
        "Previously unconnected research in mycology and neuroplasticity suggests fungal communication networks may provide new models for understanding brain resilience.",
        "Systematic gap analysis reveals that sleep studies have overlooked potential connections between dream states and specific protein synthesis patterns relevant to memory consolidation.",
        "Quantum physics principles applied to neurotransmitter behavior might explain anomalous results in consciousness studies that current models cannot account for.",
      ],
    },
    {
      id: "materials-science",
      name: "Advanced Materials",
      description:
        "Developing new materials with novel properties for technological applications.",
      insights: [
        "Bibliometric analysis reveals minimal overlap between biomimicry research and semiconductor development, suggesting unexplored territory for self-healing electronic components.",
        "Mathematical patterns in crystal formation studies parallel emerging theories in quantum computing, potentially enabling room-temperature quantum materials.",
        "Historical research on ancient metallurgical techniques contains unexploited insights that could revolutionize modern material fabrication with significantly lower energy requirements.",
      ],
    },
  ];

  const selectedDomain =
    researchDomains.find((domain) => domain.id === activeDomain) ||
    researchDomains[0];

  return (
    <section className="my-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Discovery Mode
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Uncover hidden connections and generate novel hypotheses with
          AI-powered research exploration that identifies patterns across
          disparate sources and suggests promising new directions.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.discoveryContainer}>
          <div className={styles.domainSelector}>
            <h3>Research Domains</h3>
            <div className={styles.domainButtons}>
              {researchDomains.map((domain) => (
                <button
                  key={domain.id}
                  className={`${styles.domainButton} ${activeDomain === domain.id ? styles.activeDomain : ""}`}
                  onClick={() => setActiveDomain(domain.id)}
                >
                  {domain.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.discoveryContent}>
            <div className={styles.discoveryHeader}>
              <h3>{selectedDomain.name}</h3>
              <p>{selectedDomain.description}</p>
            </div>

            <div className={styles.insightsContainer}>
              <h4>Potential Breakthrough Insights</h4>
              <ul className={styles.insightsList}>
                {selectedDomain.insights.map((insight, index) => (
                  <li key={index} className={styles.insightItem}>
                    <div className={styles.insightBullet}>{index + 1}</div>
                    <p>{insight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.discoveryVisual}>
              <div className={styles.visualPlaceholder}>
                <div className={styles.connectionGraph}>
                  {/* This would typically be a dynamic visualization */}
                  <div
                    className={styles.graphNode}
                    style={{ top: "20%", left: "30%" }}
                  ></div>
                  <div
                    className={styles.graphNode}
                    style={{ top: "60%", left: "20%" }}
                  ></div>
                  <div
                    className={styles.graphNode}
                    style={{ top: "40%", left: "60%" }}
                  ></div>
                  <div
                    className={styles.graphNode}
                    style={{ top: "70%", left: "70%" }}
                  ></div>
                  <div
                    className={styles.graphNode}
                    style={{ top: "30%", left: "80%" }}
                  ></div>
                  <div
                    className={styles.graphEdge}
                    style={{
                      width: "30%",
                      top: "25%",
                      left: "32%",
                      transform: "rotate(30deg)",
                    }}
                  ></div>
                  <div
                    className={styles.graphEdge}
                    style={{
                      width: "25%",
                      top: "45%",
                      left: "40%",
                      transform: "rotate(-40deg)",
                    }}
                  ></div>
                  <div
                    className={styles.graphEdge}
                    style={{
                      width: "20%",
                      top: "68%",
                      left: "22%",
                      transform: "rotate(70deg)",
                    }}
                  ></div>
                  <div
                    className={styles.graphEdge}
                    style={{
                      width: "35%",
                      top: "35%",
                      left: "62%",
                      transform: "rotate(10deg)",
                    }}
                  ></div>
                  <div
                    className={styles.graphEdge}
                    style={{
                      width: "28%",
                      top: "65%",
                      left: "65%",
                      transform: "rotate(-30deg)",
                    }}
                  ></div>
                </div>
                <p className={styles.visualCaption}>
                  Knowledge Graph Showing Potential Connections Between Research
                  Areas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.discoveryMethodology}>
          <h3>How Discovery Works</h3>
          <div className={styles.methodologyGrid}>
            <div className={styles.methodologyItem}>
              <div className={styles.methodologyIcon}>
                <span>1</span>
              </div>
              <h4>Gap Analysis</h4>
              <p>
                Systematically identifies unexplored areas within and between
                research fields
              </p>
            </div>
            <div className={styles.methodologyItem}>
              <div className={styles.methodologyIcon}>
                <span>2</span>
              </div>
              <h4>Pattern Recognition</h4>
              <p>
                Detects meaningful patterns across disparate research domains
              </p>
            </div>
            <div className={styles.methodologyItem}>
              <div className={styles.methodologyIcon}>
                <span>3</span>
              </div>
              <h4>Cross-Disciplinary Connection</h4>
              <p>
                Suggests novel connections between seemingly unrelated concepts
              </p>
            </div>
            <div className={styles.methodologyItem}>
              <div className={styles.methodologyIcon}>
                <span>4</span>
              </div>
              <h4>Hypothesis Generation</h4>
              <p>
                Creates testable hypotheses based on identified gaps and
                connections
              </p>
            </div>
          </div>
        </div>

        <div className={styles.discoveryCallToAction}>
          <h3>Ready to make your next big discovery?</h3>
          <button className={styles.primaryButton}>
            Launch Discovery Mode
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;
