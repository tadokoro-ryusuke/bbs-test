import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/src/generated/graphql/schema.gql",
  documents: "src/**/*.gql",
  generates: {
    "src/types/graphql.gen.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-urql",
        "typescript-resolvers",
      ],
      config: { withHooks: true },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
