import { composeWithMongoose } from "graphql-compose-mongoose";
import {
  InputTypeComposer,
  ObjectTypeComposer,
  SchemaComposer,
} from "graphql-compose";
import { MessageModel } from "../../models";

export const build = (schemaComposer: SchemaComposer) => {
  const commonOpts = { schemaComposer };

  const messageTC = composeWithMongoose(MessageModel, commonOpts);

  schemaComposer.Query.addFields({
    messages: messageTC
      .getResolver("findMany")
      .addSortArg({
        name: "TIMESTAMP_DESC",
        description: "Sort by last created message",
        value: { timestamp: -1 },
      })
      .addSortArg({
        name: "TIMESTAMP_ASC",
        description: "Sort by last created message",
        value: { timestamp: 1 },
      }),
  });

  const CreateMessagePayload = ObjectTypeComposer.create(
    {
      name: "CreateMessagePayload",
      fields: {
        record: "MongoID!",
      },
    },
    schemaComposer
  );

  const MessageInput = InputTypeComposer.create(
    {
      name: "MessageInput",
      fields: {
        content: "String!",
        username: "String!",
      },
    },
    schemaComposer
  );

  type CreateMessageArgs = {
    input: {
      username: string;
      content: string;
    };
  };

  schemaComposer.Mutation.addFields({
    createMessage: schemaComposer.createResolver({
      name: "createMessage",
      kind: "mutation",
      type: CreateMessagePayload,
      args: {
        input: MessageInput,
      },
      resolve: async ({ args }: { args: CreateMessageArgs }) => {
        const { username, content } = args.input;

        const message = await new MessageModel({
          username,
          content,
          timestamp: new Date(),
        }).save();

        return {
          record: message._id,
        };
      },
    }),
  });
};
