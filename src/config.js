module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: 'postgresql://dunder_mifflin@localhost/recruitr',
    TEST_DATABASE_URL: 'postgresql://dunder_mifflin@localhost/recruitr_test'
}