module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://pupet:rYvd69AXA7A2tuWT4f9@brstack-api-kii1v.azure.mongodb.net/brStack?retryWrites=true&w=majority'
}