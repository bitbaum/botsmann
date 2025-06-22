import React from "react";
import { btnPrimary } from "../../utils/constants";

interface GrammarPracticeProps {
  getTryLink: () => string;
}

const GrammarPractice = ({ getTryLink }: GrammarPracticeProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <p className="font-medium text-gray-700">Pronunciation Differences</p>
        </div>
        <div className="px-4 py-3">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-0.5">
                K → Ch
              </span>
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Standard:</span>{" "}
                  <span className="text-gray-600">Kind (child)</span>
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Swiss:</span>{" "}
                  <span className="text-gray-800">Chind</span>
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-0.5">
                -en → -e
              </span>
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Standard:</span>{" "}
                  <span className="text-gray-600">machen (to do/make)</span>
                </p>
                <p className="text-gray-800">
                  <span className="font-medium">Swiss:</span>{" "}
                  <span className="text-gray-800">mache</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <p className="font-medium text-gray-700">Grammar Simplifications</p>
        </div>
        <div className="px-4 py-3">
          <div className="mb-3">
            <h5 className="font-medium text-gray-900 mb-1">
              No Simple Past Tense
            </h5>
            <p className="text-sm text-gray-700">
              Swiss German uses perfect tense (have/has + past participle)
              instead of simple past.
            </p>
            <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Standard (simple past):</p>
                <p>Ich ging nach Hause.</p>
                <p className="text-xs text-gray-500 mt-0.5">I went home.</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-500">Swiss (perfect tense):</p>
                <p>Ich bi hei gange.</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  I have gone home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">
          Understand Swiss German grammar
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Get personalized grammar explanations that focus on the differences
          between Standard German and Swiss German.
        </p>
        <div className="flex justify-center">
          <a
            href={`${getTryLink()}?q=Explain%20the%20main%20grammar%20differences%20between%20Standard%20German%20and%20Swiss%20German`}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Learn Swiss German Grammar
          </a>
        </div>
      </div>
    </div>
  );
};

export default GrammarPractice;
