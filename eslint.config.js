module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		'airbnb-typescript',
		"react-app",
		"react-app/jest",
		"eslint:recommended",
    "plugin:react/recommended",
	],
	parserOptions: {
    project: "./tsconfig.json"
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