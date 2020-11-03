const requestLogger = (request, response, next) => {
  console.info(`${request.method} ${request.originalUrl}`)
  const start = new Date().getTime()
  response.on('finish', () => {
    const elapsed = new Date().getTime() - start
    console.info(`${request.method} ${request.originalUrl} ${response.statusCode} ${elapsed}ms`)
  })
  next()
}

module.exports = requestLogger
