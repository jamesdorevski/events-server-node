const Koa = require("koa");
const mount = require("koa-mount");
const schema = require("./graphql/schema");
const { graphqlHTTP } = require("koa-graphql");
const root = require("./api/root");

const app = new Koa();

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  )
);

app.on("error", (err) => {
  log.error("server error", err);
});

app.listen(8080);