import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

// ESLint 9 flat config. eslint-config-next 16 ships native flat configs, so we
// compose them directly instead of wrapping legacy .eslintrc via FlatCompat
// (which crashes on the react plugin's circular flat-config object). Rule set is
// carried over verbatim from the previous .eslintrc.json.
const eslintConfig = [
  {
    ignores: [
      'node_modules/',
      '.next/',
      'next-env.d.ts',
      'dist/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
      'healthcheck.js',
      'scripts/',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  // Must come after the configs it disables formatting rules from.
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        // caughtErrors:'none' preserves the pre-upgrade contract — @typescript-eslint
        // v8 flipped the default from 'none' to 'all', which would newly flag every
        // unused `catch (err)` binding. Not a real regression; keep prior behaviour.
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      '@next/next/no-img-element': 'warn',
      // eslint-plugin-react-hooks v6 (bundled with Next 16's eslint-config-next)
      // adds React-Compiler-era rules that did not exist in the Next 15 config and
      // flag pre-existing intentional patterns (localStorage hydration, load-on-mount
      // effects). Adopting them is a dedicated refactor, out of scope for this
      // framework upgrade — deferred, tracked as follow-up. rules-of-hooks and
      // exhaustive-deps stay enabled.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/immutability': 'off',
    },
  },
];

export default eslintConfig;
