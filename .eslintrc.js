module.exports = {
	extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',
		'plugin:vue/recommended'
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		"vue/no-extra-semi": "off",
		"vue/html-indent": "off",
		"vue/max-attributes-per-line": ["error", {
			"singleline": 2,
			"multiline": {
				"max": 2,
				"allowFirstLine": false
			}
		}],
		"vue/singleline-html-element-content-newline": "off",
		"vue/prop-name-casing": "off",
		"vue/order-in-components": "off"
	}
}