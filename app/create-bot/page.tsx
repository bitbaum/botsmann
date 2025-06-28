import BotBuilderForm from '@/components/BotBuilderForm';

export const metadata = {
  title: 'Create a New Bot',
  description: 'Generate a basic bot setup tailored to your requirements.'
};

export default function CreateBotPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Create a New Bot</h1>
      <p className="text-gray-700 mb-8 text-center">
        Enter your bot details below and receive step-by-step setup instructions.
      </p>
      <BotBuilderForm />
    </div>
  );
}
