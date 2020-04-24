module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "max-len": ["error", { "code": 120 }],
    "newline-per-chained-call": ["off"],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": [
        "src/test/**/*",
        "**/*{.,_}{test,spec}.{ts,tsx,js,jsx}"
      ],
      "optionalDependencies": false
    }],
    "class-methods-use-this": ["off"],
    "lines-between-class-members": ["off"],
    "object-curly-newline": [
      "off",
      {
        "ObjectExpression": { "consistent": true },
        "ObjectPattern": { "consistent": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": "never",
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "no-useless-constructor": "off",
        "func-call-spacing": "off",
        "no-spaced-func": "off",
        "import/no-unresolved": "off",
        "import/first": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      }
    }
  ],
}
