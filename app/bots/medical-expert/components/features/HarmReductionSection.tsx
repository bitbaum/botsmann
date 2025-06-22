import React from "react";

/**
 * Responsible Mind Altering & Harm Reduction Section
 *
 * Provides evidence-based information about various substances,
 * harm reduction strategies, and the latest research on psychedelics
 * and other mind-altering substances compared to common legal substances.
 *
 * Note: This section is for educational purposes only and does not condone
 * illegal activities. Information is provided solely for harm reduction.
 */
const HarmReductionSection: React.FC = () => {
  // Substance comparison data based on Nutt et al. (2010) study
  // Primary source:
  // - Nutt, D. et al. (2010). Drug harms in the UK: a multicriteria decision analysis. The Lancet, 376(9752), 1558-1565.
  // Harm scores are on a scale of 0-100, with higher scores indicating more harm
  // Sorted from most harmful to least harmful according to the overall harm score
  const substanceComparisons = [
    {
      name: "Alcohol",
      harmScore: 72,
      addictionScore: 33,
      medicalPotential: "Limited",
      notes:
        "Highest overall harm score primarily due to harm to others; highly toxic to liver, brain, and other organs",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Heroin",
      harmScore: 55,
      addictionScore: 67,
      medicalPotential: "Limited",
      notes:
        "Second highest harm score; high personal harm, addiction, and mortality risk",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Crack Cocaine",
      harmScore: 54,
      addictionScore: 85,
      medicalPotential: "Very Low",
      notes: "Very high addiction potential with serious cardiovascular risks",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Methamphetamine",
      harmScore: 33,
      addictionScore: 88,
      medicalPotential: "Low",
      notes: "Extremely high addiction potential with neurotoxicity concerns",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Cocaine",
      harmScore: 27,
      addictionScore: 72,
      medicalPotential: "Limited",
      notes: "High addiction potential with significant cardiovascular risks",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Tobacco/Nicotine",
      harmScore: 26,
      addictionScore: 67,
      medicalPotential: "Very Low",
      notes:
        "High addiction potential; leading cause of preventable death worldwide",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Cannabis",
      harmScore: 20,
      addictionScore: 21,
      medicalPotential: "Moderate",
      notes:
        "Relatively low harm compared to legal substances like alcohol and tobacco",
      source: "Nutt et al. (2010)",
    },
    {
      name: "GHB",
      harmScore: 19,
      addictionScore: 19,
      medicalPotential: "Limited",
      notes:
        "Risk of respiratory depression, especially when combined with alcohol",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Benzodiazepines",
      harmScore: 15,
      addictionScore: 37,
      medicalPotential: "Moderate",
      notes:
        "Moderate addiction potential; risk of dependence when used long-term",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Ketamine",
      harmScore: 15,
      addictionScore: 28,
      medicalPotential: "High",
      notes:
        "Used medically as an anesthetic; emerging research for depression",
      source: "Nutt et al. (2010)",
    },
    {
      name: "MDMA",
      harmScore: 9,
      addictionScore: 13,
      medicalPotential: "Promising",
      notes:
        "Relatively low harm with ongoing clinical trials for PTSD treatment",
      source: "Nutt et al. (2010)",
    },
    {
      name: "LSD",
      harmScore: 7,
      addictionScore: 4,
      medicalPotential: "Promising",
      notes: "Very low physical harm and addiction potential",
      source: "Nutt et al. (2010)",
    },
    {
      name: "Psilocybin Mushrooms",
      harmScore: 6,
      addictionScore: 5,
      medicalPotential: "Promising",
      notes:
        "Lowest overall harm score in the study; very low addiction potential",
      source: "Nutt et al. (2010)",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">
        Responsible Mind Altering & Harm Reduction
      </h3>
      <p className="text-gray-600 mb-3">
        Evidence-based information on substance safety profiles, harm reduction
        strategies, and the latest research on psychedelics for mental health.
      </p>
      <div className="bg-amber-50 p-4 rounded-lg mb-8 text-sm text-amber-800 border border-amber-200">
        <p>
          <strong>Educational Notice:</strong> This information is provided
          solely for educational and harm reduction purposes. Imhotep does not
          condone illegal activities. Always follow applicable laws in your
          jurisdiction.
        </p>
      </div>

      <div className="mb-10">
        <h4 className="text-lg font-semibold mb-3 text-indigo-700">
          Science-Based Substance Comparison
        </h4>
        <p className="text-gray-600 mb-4">
          The data below comes exclusively from the landmark study by Professor
          David Nutt and colleagues at Imperial College London, published in The
          Lancet (2010). Substances are ranked from most to least harmful based
          on their overall harm score. Harm and addiction potential scores are
          on a 0-100 scale.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-gray-700">Substance</th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Overall Harm
                  <br />
                  <span className="text-xs">(0-100)</span>
                </th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Addiction Potential
                  <br />
                  <span className="text-xs">(0-100)</span>
                </th>
                <th className="py-3 px-4 text-left text-gray-700">
                  Key Findings
                </th>
              </tr>
            </thead>
            <tbody>
              {substanceComparisons.map((substance, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4 border-b border-gray-200 font-medium">
                    {substance.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${substance.harmScore > 50 ? "bg-red-500" : substance.harmScore > 25 ? "bg-yellow-500" : "bg-green-500"}`}
                          style={{ width: `${substance.harmScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {substance.harmScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${substance.addictionScore > 50 ? "bg-red-500" : substance.addictionScore > 25 ? "bg-yellow-500" : "bg-green-500"}`}
                          style={{ width: `${substance.addictionScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {substance.addictionScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    {substance.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Source: Nutt, D., King, L., & Phillips, L. (2010). Drug harms in the
          UK: a multicriteria decision analysis. The Lancet, 376(9752),
          1558-1565.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-2 text-indigo-700">
            Latest Psychedelic Research
          </h4>
          <p className="text-gray-600 mb-3">
            Recent clinical studies at institutions like Johns Hopkins and NYU
            show promising results for psychedelic-assisted therapy:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>
              67-71% of participants showed clinically significant reduction in
              depression symptoms with psilocybin therapy (JAMA Psychiatry,
              2020)
            </li>
            <li>
              MDMA-assisted therapy showing 67% PTSD remission rates in Phase 3
              clinical trials (Nature Medicine, 2021)
            </li>
            <li>
              Psilocybin showing 2-3x effectiveness for smoking cessation
              compared to current treatments (Johns Hopkins, ongoing study)
            </li>
            <li>
              Single psilocybin session reducing anxiety in cancer patients for
              6+ months (NYU/Johns Hopkins, 2016)
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Sources: Davis et al. (2020), JAMA Psychiatry; Mitchell et al.
            (2021), Nature Medicine; Johnson et al. (2017), Journal of
            Psychopharmacology
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-2 text-green-700">
            Microdosing & Responsible Use
          </h4>
          <p className="text-gray-600 mb-3">
            Microdosing involves taking sub-perceptual amounts (typically 1/10th
            to 1/20th of a standard dose) of psychedelics:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>
              Common protocols: Fadiman protocol (1 day on, 2 days off) or
              Stamets Stack (4 days on, 3 days off)
            </li>
            <li>
              Reported benefits include improved mood, focus, creativity, and
              reduced anxiety
            </li>
            <li>
              Clinical research still emerging, with mixed results from
              placebo-controlled studies
            </li>
            <li>
              Potential risks include heart valve concerns with certain
              substances if used frequently
            </li>
            <li>
              Responsible use guidelines stress importance of: measured dosing,
              pure substances, and discontinuation if adverse effects occur
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Sources: Kuypers et al. (2019), Current Neuropharmacology; Szigeti
            et al. (2021), eLife; Anderson et al. (2019), Journal of
            Psychopharmacology
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-3 text-blue-700">
          Harm Reduction Strategies
        </h4>
        <p className="text-gray-600 mb-4">
          Evidence-based approaches to reducing potential risks of substance
          use, regardless of legal status:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Before Use</h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Understand substance interactions with medications</li>
              <li>Research appropriate dosage for your body weight</li>
              <li>Test substances using drug checking kits if available</li>
              <li>Prepare safe environment ("set and setting")</li>
              <li>Have a sober trusted person present</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">
              During & After Use
            </h5>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Stay hydrated but avoid excessive water intake</li>
              <li>Monitor body temperature and heart rate</li>
              <li>Know when and how to seek medical help if needed</li>
              <li>Integration practices to process experiences</li>
              <li>Observe adequate breaks between uses</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Sources: Harm Reduction Journal; MAPS Harm Reduction Guidelines;
          Global Drug Survey Safe Use Guidelines
        </p>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Imhotep provides accurate, judgment-free information about all
          substances to promote health and safety.
        </p>
        <p className="text-xs text-gray-500">
          Full harm reduction education platform launching 2026
        </p>
      </div>
    </div>
  );
};

export default HarmReductionSection;
