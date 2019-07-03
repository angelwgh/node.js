const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    lintOnSave: false,
    devServer: {
		// 设置代理
			'proxy': {
				'/api': {
					target: 'http://localhost:8081/',
					changeOrigin: true,
					pathRewrite: {
						'^/api': '/'
					}
				}
			}
		},
		configureWebpack: config => {
				
		}
		// configureWebpack: config => {
		// 	config.optimization = {

		// 			splitChunks: {
		// 				chunks: 'all',
		// 				// minSize: 30000,
		// 				// maxSize: 0,
		// 				// minChunks: 1,
		// 				// maxAsyncRequests: 5,
		// 				// maxInitialRequests: 10,
		// 				// automaticNameDelimiter: '~',
		// 				// name: true,
		// 				cacheGroups: {
		// 					// vendors: {
		// 					// 	test: /[\\/]node_modules[\\/]/,
		// 					// 	priority: -10
		// 					// },
		// 					'element-ui': {
		// 						test: (module, chunks) => /element-ui/.test(module.context),
		// 						priority: 1,
		// 						reuseExistingChunk: true,
    //         		enforce: true
		// 					},
		// 					'axios': {
		// 						test: (module, chunks) => /axios/.test(module.context),
		// 						priority: 1,
		// 						reuseExistingChunk: true,
    //         		enforce: true
		// 					},
		// 					'vue': {
		// 						test: (module, chunks) => {
		// 							return /vue\\/.test(module.context)
		// 						},
		// 						priority: 1,
		// 						reuseExistingChunk: true,
    //         		enforce: true
		// 					},
							
		// 					default: {
		// 						minChunks: 2,
		// 						priority: -20,
		// 						reuseExistingChunk: true
		// 					}
		// 				}
		// 			}
				
		// 	}
		// },
		// chainWebpack: config => {
		// 	const PAGE_ENTRIES = [
		// 		'index',
		// 		'admin',
		// 		'login',
		// 	];

		// 	config.entryPoints.delete('app')
		// 	config.plugins.delete('html')

		// 	PAGE_ENTRIES.forEach(v => {
		// 		const v1 = v == 'index' ? '' : v+'/'
		// 		config.entry(v).add(`./src/${v1}main.js`)
		// 		config.plugin(`html-${v1}`).use(HtmlWebpackPlugin, [{
		// 			templateParameters: {
		// 				BASE_URL: '/',
		// 			},
		// 			template: `public/index.html`,
		// 			entry: `./src/${v1}main.js`,
		// 			filename: `${v1}index.html`,
		// 			inject: true,
		// 			excludeChunks: PAGE_ENTRIES.filter(item => item !== v),
		// 		}]).before('preload')
			
		// 	})
		// },
		// pages: {
		// 		index: {
		// 				// page 的入口
		// 				entry: 'src/main.js',
		// 				// 模板来源
		// 				template: 'public/index.html',
		// 				// 在 dist/index.html 的输出
		// 				filename: 'index.html',
		// 				// 当使用 title 选项时，

		// 				chunks: ['chunk-vendors', 'chunk-common', 'index']
		// 		},
		// 		login: {
		// 				entry: 'src/login/main.js',
		// 				template: 'public/index.html',
		// 				filename: 'login/index.html',
		// 		}
		// }
}