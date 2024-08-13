const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.node
            }
        },
        rules: {
            quotes: ['error', 'single']
        }
    },
    {
        files: ['test/**', 'examples/**'],
        languageOptions: {
            globals: {
                ...globals.mocha,
                expect: 'readonly',
                sinon: 'readonly'
            }
        }
    }
]
