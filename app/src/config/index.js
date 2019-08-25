const mongo_url = process.env.MONGO_URL
const mongo_user = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const token_secret = process.env.TOKEN_SECRET
const redis_host = process.env.REDIS_HOST
const s3_baseURL = `https://${process.env.BUCKET}.s3.amazonaws.com/`

export {
    mongo_url,
    mongo_user,
    mongo_password,
    token_secret,
    redis_host,
    s3_baseURL
}

