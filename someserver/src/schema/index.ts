import { SchemaComposer } from "graphql-compose";
import { build } from "./message";

const schemaComposer = new SchemaComposer();

build(schemaComposer);

export const schema = schemaComposer.buildSchema();
