'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRequireAuth } from '@/lib/auth';
import { UpdateProfileSchema, DISPLAY_NAME_MAX_LENGTH } from '@/lib/schemas/auth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { CheckIcon, ChevronRightIcon } from '@/components/icons';
import { InfrastructureWidget } from '@/components/infrastructure';
import { type ProviderId, type ConnectionStatus } from '@/lib/infrastructure';

interface UserSettings {
  preferred_model: ProviderId;
  groq_api_key: string | null;
  openrouter_api_key: string | null;
  ollama_url: string | null;
}

export default function SettingsPage() {
  const {
    user,
    loading: authLoading,
    signOut,
    displayName,
    avatarUrl,
    updateProfile,
  } = useRequireAuth();
  const [settings, setSettings] = useState<UserSettings>({
    preferred_model: 'groq',
    groq_api_key: null,
    openrouter_api_key: null,
    ollama_url: null,
  });
  const [providerStatus, setProviderStatus] = useState<ConnectionStatus>('connected');

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDisplayName, setProfileDisplayName] = useState('');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Initialize profile form when user data loads
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seeds editable form fields from async-loaded user metadata
    if (displayName) setProfileDisplayName(displayName);
    if (avatarUrl) setProfileAvatarUrl(avatarUrl);
  }, [displayName, avatarUrl]);

  // Load user settings
  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.settings) {
            setSettings(data.settings);
            // Determine provider status based on configuration
            const provider = data.settings.preferred_model || 'groq';
            if (provider === 'groq') {
              setProviderStatus('connected'); // Groq always works
            } else if (provider === 'openrouter' && data.settings.openrouter_api_key) {
              setProviderStatus('connected');
            } else if (provider === 'ollama' && data.settings.ollama_url) {
              setProviderStatus('connected');
            } else {
              setProviderStatus('not-configured');
            }
          }
        }
      } catch {
        // Failed to load settings - using defaults
      }
    };

    loadSettings();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSaved(false);

    // Validate with Zod
    const result = UpdateProfileSchema.safeParse({
      display_name: profileDisplayName || undefined,
      avatar_url: profileAvatarUrl || null,
    });

    if (!result.success) {
      setProfileError(result.error.issues[0].message);
      return;
    }

    setProfileSaving(true);

    const { error } = await updateProfile({
      display_name: profileDisplayName || undefined,
      avatar_url: profileAvatarUrl || null,
    });

    if (error) {
      setProfileError(error.message);
    } else {
      setProfileSaved(true);
      setIsEditingProfile(false);
      setTimeout(() => setProfileSaved(false), 3000);
    }

    setProfileSaving(false);
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setProfileDisplayName(displayName || '');
    setProfileAvatarUrl(avatarUrl || '');
    setProfileError('');
  };

  if (authLoading || !user) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-action hover:text-action text-sm font-medium"
              >
                Edit
              </button>
            )}
          </div>

          {profileSaved && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">
              Profile updated successfully!
            </div>
          )}

          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {profileError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{profileError}</div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {profileAvatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profileAvatarUrl}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <UserAvatar email={user.email} initial={profileDisplayName?.[0]} size="lg" />
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label
                      htmlFor="displayName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      value={profileDisplayName}
                      onChange={(e) => setProfileDisplayName(e.target.value)}
                      maxLength={DISPLAY_NAME_MAX_LENGTH}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {profileDisplayName.length}/{DISPLAY_NAME_MAX_LENGTH} characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="avatarUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Avatar URL
                    </label>
                    <input
                      id="avatarUrl"
                      type="url"
                      value={profileAvatarUrl}
                      onChange={(e) => setProfileAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a URL to an image (PNG, JPG, or GIF)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-4 py-2 bg-action text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50 transition-colors"
                >
                  {profileSaving ? 'Saving...' : 'Save Profile'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelProfileEdit}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-4">
              <UserAvatar
                email={user.email}
                initial={displayName?.[0]}
                avatarUrl={avatarUrl}
                size="lg"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {displayName || <span className="text-gray-400 italic">No display name set</span>}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* AI Status Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h2>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">AI is ready to use</p>
              <p className="text-sm text-gray-600 mt-1">
                Your documents are analyzed using AI. Upload documents and start chatting to get
                insights.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/documents"
              className="inline-flex items-center gap-2 px-4 py-2 bg-action text-white rounded-lg text-sm font-medium hover:bg-action-hover transition-colors"
            >
              Go to My Documents
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* AI Infrastructure Widget */}
        <InfrastructureWidget currentProvider={settings.preferred_model} status={providerStatus} />
      </div>
    </div>
  );
}
