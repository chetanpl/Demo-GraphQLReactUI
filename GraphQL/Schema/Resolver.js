const { Userlist } = require('./FakeData');
const MovieList = require('../Movies')
const _ = require('lodash');
const resolvers = {
    Query: {
        users: () => {
            return Userlist;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(Userlist, { id: Number(id), name: args.nameIS });
            return user;
        },
        Movies: () => {
            return MovieList;
        },
        Movie: (parents, args) => {
            return _.find(MovieList, { id: args.id });

        }
    },
    Users: {
        FavouriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.id > 2 && movie.id < 6)
        }
    }
    ,
    Mutation: {
        // create new user 
        createuser: (parents, args) => {
            const user = args.input;;
            const lastid = Userlist[Userlist.length - 1].id;;
            user.id = lastid + 1;
            Userlist.push(user);
            console.log(user);
            return Userlist;

        }
        , // mutation-- update data
        updateUsername: (parent, args) => {
            const { id, newusername } = args.input;
            let changeduser;
            console.log(id+"   "+newusername );
            Userlist.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newusername;
                    changeduser = user;
                }
                console.log(changeduser );
            });
            return changeduser;

        },
        // mutation-- update data
        DeleteRecord: (parent, args) => {
            const id =args.id;
            _.remove(Userlist,(user)=>user.id===Number(id))
            console.log(Userlist);
            return Userlist;
        }

    }
};

module.exports = resolvers;