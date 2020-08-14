module.exports = {
	publicPath: process.env.NODE_ENV === `production`
		? `/top-lists/`
		: `/`,
	devServer: {
		disableHostCheck: false, // set this to true to allow ngrok web serving
	},
}