import TableOfContents, { TOCItem } from "@/components/TableOfContents";

export default function DocsPage() {
  const toc: TOCItem[] = [
    { id: "business", label: "Business Overview" },
    { id: "technical", label: "Technical Details" },
    { id: "philosophy", label: "Philosophy" },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 lg:flex lg:space-x-8">
      <TableOfContents items={toc} />
      <article className="prose lg:prose-lg flex-1">
        <h1 id="business" className="scroll-mt-24">
          Business Overview
        </h1>
        <p>
          Botsmann builds AI extensions that maximize computational power,
          privacy and efficiency. We help organizations deploy private AI nodes
          using open-source models tailored to their needs.
        </p>

        <h2 id="technical" className="scroll-mt-24">
          Technical Details
        </h2>
        <p>
          Each node runs on your infrastructure, integrating fine-tuned models
          with our modular React components and API routes. You retain full data
          ownership while leveraging powerful automation.
        </p>

        <h2 id="philosophy" className="scroll-mt-24">
          Philosophy
        </h2>
        <p>
          We believe in transparent, human-centric AI. By empowering people with
          private, controllable assistants, we give them more time for what
          truly matters.
        </p>
      </article>
    </div>
  );
}
