//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    ...tanstackConfig]
