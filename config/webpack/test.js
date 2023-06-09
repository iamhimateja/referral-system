import environment from './environment'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default environment.toWebpackConfig()
