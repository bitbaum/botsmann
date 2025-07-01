import BotBuilderForm from '@/components/BotBuilderForm';

export default function BuilderPage() {
  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Create a New Bot</h1>
      <BotBuilderForm />
    </div>
  );
}
