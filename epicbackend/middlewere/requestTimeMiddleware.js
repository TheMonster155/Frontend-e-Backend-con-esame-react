const requestTimeMiddleware = (req, res, next) => {
    const start = new Date()
    res.on('finish', () => {
        const duration = new Date() - start
        console.log(`La richiesta ${req.method} ha impiegato ${duration} ms `) 
    })

    next()
}

module.exports = requestTimeMiddleware