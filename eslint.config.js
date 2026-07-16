const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularPlugin = require('@angular-eslint/eslint-plugin');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      tseslint.configs.stylistic,
      eslintPluginPrettierRecommended,
    ],
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],
      quotes: [
        'warn',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],
      'object-curly-spacing': ['warn', 'always'],
      'template-curly-spacing': ['warn', 'always'],
      semi: ['warn', 'always'],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': [
        'off'
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [],
    languageOptions: {
      parser: angular.templateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': ['error'],
      '@angular-eslint/template/eqeqeq': ['warn'],
      '@angular-eslint/template/no-nested-tags': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': [
        'off'
      ],
    },
  },
]);
