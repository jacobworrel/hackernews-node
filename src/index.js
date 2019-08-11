const { GraphQLServer } = require('graphql-yoga')

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

const idCount = links.length;

const resolvers = {
  Query: {
    feed: () => links,
    info: () => 'This is the API of a Hackernews Clone',
    link: (parent, args) => links.find(x => x.id === args.id) || null,
  },
  Mutation: {
    deleteLink (parent, args) {
      const idxToDelete = links.findIndex(x => x.id === args.id);

      if (idxToDelete === undefined) {
        return null;
      }

      const deletedLink = links[idxToDelete];

      links.splice(idxToDelete, 1);
      return deletedLink;
    },
    post (parent, args) {
      const link = {
        id: `link-${idCount}`,
        url: args.url,
        description: args.description,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));