module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons']
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.vue$': '@vue/vue3-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'vue'],
    modulePathIgnorePatterns: ['<rootDir>/dist/']
}
