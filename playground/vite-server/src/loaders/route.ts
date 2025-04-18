
async function routeLoader(app) {
    try {
        app.use('/user', await ('./user/route'))

    } catch (error) {
        
    }
}