module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "react-app",
		"react-app/jest",
	],
	parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
  //   "import/extensions": [
  //     "error",
  //     "ignorePackages",
  //     {
  //       js: "never",
  //       jsx: "never",
  //       ts: "never",
  //       tsx: "never",
  //     },
  //   ],
    "object-curly-newline": ["error", {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "never",
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }]
  },
	settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
          ["assets", "./src/assets"],
          ["configs", "./src/configs"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
}