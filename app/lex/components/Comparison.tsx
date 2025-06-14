export default function Comparison() {
  return (
    <section id="comparison" className="py-12">
      <div className="mx-auto max-w-4xl overflow-x-auto">
        <table className="min-w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Feature</th>
              <th className="px-4 py-2">Private Node</th>
              <th className="px-4 py-2">Law-Firm Stack</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Deployment</td>
              <td className="px-4 py-2">Local device</td>
              <td className="px-4 py-2">Managed cloud or hybrid</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Model Size</td>
              <td className="px-4 py-2">8B</td>
              <td className="px-4 py-2">70B</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Data Storage</td>
              <td className="px-4 py-2">On-device</td>
              <td className="px-4 py-2">Encrypted DB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
