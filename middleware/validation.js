const validater = (schema) => {
    return (req, res, next) => {
        if (req.file) {
            let path = req.file.destination + '/' + req.file.filename
            req.body.path = path
        }
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.json({
                message: "not  validation error",
                error: error
            })
        }
        req.body = value,
        next()
    }
}

module.exports = validater