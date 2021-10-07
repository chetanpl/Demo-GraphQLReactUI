const { gql } = require('apollo-server');

const typeDefs = gql`
    type Users{
        id:ID!
        name:String!
        username:String!
        age:Int!
        nationality:Nationality!
        friends: [Users] 
        FavouriteMovies:[Movies!]
    }
    type Movies{
        id:ID!,
        title:String!,
        release_date:String
        genres: [String!]
        poster:String
    }
    type Query{
            users:[Users!]!
            user(id:ID!,nameIS:String!):Users
            Movies:[Movies]!
            Movie(id:ID):Movies
}

input CreateUserInput{
       name:String!
        username:String!
        age:Int!
        nationality: Nationality=LONDON

}

input UpdateUserInput{
id:ID!
newusername:String!
}
type Mutation{
createuser(input:CreateUserInput!):Users!
updateUsername(input:UpdateUserInput!):Users
DeleteRecord(id:ID!):Users
}
enum Nationality{
    CANADA 
    CHILE
    INDIA
    LONDON
}
`;



module.exports = { typeDefs };