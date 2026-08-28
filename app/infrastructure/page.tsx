'use client';

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import Link from 'next/link';
import { useRequireAuth } from '@/lib/auth';
import {
  providers,
  storageOptions,
  getProviderById,
  type ProviderId,
  type StorageId,
  type ConnectionStatus,
} from '@/lib/infrastructure';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { ProviderCard, StorageCard, APIKeyInput } from '@/components/infrastructure';

interface UserSettings {
  preferred_model: ProviderId;
  groq_api_key: string | null;
  openrouter_api_key: string | null;
  ollama_url: string | null;
}

export default function InfrastructurePage() {
  const { user, loading: authLoading } = useRequireAuth();

  // Provider state
  const [selectedProvider, setSelectedProvider] = useState<ProviderId>('groq');
  const [providerStatuses, setProviderStatuses] = useState<Record<ProviderId, ConnectionStatus>>({
    groq: 'connected', // Groq free tier is always connected
    openrouter: 'not-configured',
    ollama: 'not-configured',
  });

  // API key state
  const [groqApiKey, setGroqApiKey] = useState('');
  const [openrouterApiKey, setOpenrouterApiKey] = useState('');
  const [ollamaUrl, setOllamaUrl] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);

  // Storage state
  const [selectedStorage, setSelectedStorage] = useState<StorageId>('cloud');

  // UI state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Load user settings
  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.settings) {
            const settings: UserSettings = data.settings;
            setSelectedProvider(settings.preferred_model || 'groq');

            // Set API keys
            if (settings.groq_api_key) setGroqApiKey(settings.groq_api_key);
            if (settings.openrouter_api_key) setOpenrouterApiKey(settings.openrouter_api_key);
            if (settings.ollama_url) setOllamaUrl(settings.ollama_url);

            // Update provider statuses based on configured keys
            setProviderStatuses((prev) => ({
              ...prev,
              groq: settings.groq_api_key ? 'connected' : 'connected', // Groq works without key
              openrouter: settings.openrouter_api_key ? 'connected' : 'not-configured',
              ollama: settings.ollama_url ? 'connected' : 'not-configured',
            }));
          }
        }
      } catch {
        // Settings load failed - using defaults
      }
    };

    loadSettings();
  }, [user]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferred_model: selectedProvider,
          groq_api_key: groqApiKey || null,
          openrouter_api_key: openrouterApiKey || null,
          ollama_url: ollamaUrl || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleValidateKey = useCallback(
    async (providerId: ProviderId): Promise<boolean> => {
      setKeyError(null);
      setProviderStatuses((prev) => ({ ...prev, [providerId]: 'validating' }));

      try {
        const keyValue =
          providerId === 'groq'
            ? groqApiKey
            : providerId === 'openrouter'
              ? openrouterApiKey
              : ollamaUrl;

        const response = await fetch('/api/settings/validate-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: providerId, key: keyValue }),
        });

        const data = await response.json();

        if (data.valid) {
          setProviderStatuses((prev) => ({ ...prev, [providerId]: 'connected' }));
          return true;
        } else {
          setProviderStatuses((prev) => ({ ...prev, [providerId]: 'error' }));
          setKeyError(data.error || 'Invalid API key');
          return false;
        }
      } catch {
        setProviderStatuses((prev) => ({ ...prev, [providerId]: 'error' }));
        setKeyError('Failed to validate key');
        return false;
      }
    },
    [groqApiKey, openrouterApiKey, ollamaUrl],
  );

  const getKeyValue = (providerId: ProviderId): string => {
    if (providerId === 'groq') return groqApiKey;
    if (providerId === 'openrouter') return openrouterApiKey;
    return ollamaUrl;
  };

  const setKeyValue = (providerId: ProviderId, value: string) => {
    if (providerId === 'groq') setGroqApiKey(value);
    else if (providerId === 'openrouter') setOpenrouterApiKey(value);
    else setOllamaUrl(value);
  };

  const isProviderConfigured = (providerId: ProviderId): boolean => {
    const provider = getProviderById(providerId);
    if (!provider?.keyRequired) return true; // Groq doesn't require key
    const key = getKeyValue(providerId);
    return Boolean(key);
  };

  if (authLoading || !user) {
    return <PageLoading />;
  }

  const selectedProviderData = getProviderById(selectedProvider);

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/settings" className="hover:text-gray-700">
              Settings
            </Link>
            <span>/</span>
            <span className="text-gray-900">Infrastructure</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your AI Infrastructure</h1>
          <p className="text-gray-600">
            Control your AI experience. Choose your model provider and configure your storage.
          </p>
        </div>

        <form onSubmit={handleSave}>
          {/* AI Model Section */}
          <section className="mb-10">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">AI Model Provider</h2>
              <p className="text-sm text-gray-500">
                Choose which AI service powers your assistants
              </p>
            </div>

            {/* Provider Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedProvider === provider.id}
                  isConfigured={isProviderConfigured(provider.id)}
                  status={providerStatuses[provider.id]}
                  size="lg"
                  showFeatures
                  onSelect={() => setSelectedProvider(provider.id)}
                />
              ))}
            </div>

            {/* API Key Input (shown when provider requires key) */}
            {selectedProviderData?.keyRequired && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <APIKeyInput
                  provider={selectedProviderData}
                  value={getKeyValue(selectedProvider)}
                  onChange={(value) => setKeyValue(selectedProvider, value)}
                  onValidate={() => handleValidateKey(selectedProvider)}
                  status={providerStatuses[selectedProvider]}
                  errorMessage={keyError || undefined}
                />
              </div>
            )}

            {/* Info for Groq (no key required) */}
            {selectedProvider === 'groq' && (
              <div className="bg-orange-50 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <p className="font-medium text-orange-900">No configuration needed</p>
                  <p className="text-sm text-orange-700 mt-1">
                    Groq&apos;s free tier is ready to use. Optionally add your own API key for
                    higher limits.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8" />

          {/* Storage Section */}
          <section className="mb-10">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Data Storage</h2>
              <p className="text-sm text-gray-500">Choose where your documents are stored</p>
            </div>

            {/* Storage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {storageOptions.map((option) => (
                <StorageCard
                  key={option.id}
                  option={option}
                  isActive={selectedStorage === option.id}
                  onSelect={() => setSelectedStorage(option.id)}
                />
              ))}
            </div>
          </section>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
          {saved && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Settings saved successfully!
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <Link href="/settings" className="text-gray-600 hover:text-gray-800 font-medium">
              ← Back to Settings
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-action text-white rounded-xl font-medium hover:bg-action-hover disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
