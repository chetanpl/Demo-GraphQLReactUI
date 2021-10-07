const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./Schema/typeDefs')
const resolvers = require('./Schema/Resolver')
const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen().then(({ url }) => {
    console.log(`your api is running..${url}..`);
})