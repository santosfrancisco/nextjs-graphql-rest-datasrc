import { ApolloServer, gql } from "apollo-server-micro";
import UsersAPI from "../../datasource/users";

const typeDefs = gql`
  type Query {
    user: User
  }
  type User {
    id: Int
    name: String
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    user: async (parent, args, { dataSources }) => {
      const user = await dataSources.usersAPI.getUser(4);
      return user;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ usersAPI: new UsersAPI() }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
