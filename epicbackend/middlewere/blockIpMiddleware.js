



const blockIpMiddleware = (blockedIp) => {
   
    return (req, res, next) => {
        const { ip } = req
        if (blockedIp.includes(ip)) {
            return res
                .status(403)
                .send({
                    statusCode: 403,
                    message:'forbidden:your ip is banned'
            })
        }
        next()
    }

  
    
}



module.exports = blockIpMiddleware