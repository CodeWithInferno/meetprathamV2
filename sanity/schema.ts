import { type SchemaTypeDefinition } from 'sanity'
import Image from "./Docs/Image";
import Work from "./Docs/work";
import post from "./Docs/blog";
import imagePost from "./Docs/sneakpeak";
import topic from "./Docs/topic";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Image,Work,post,imagePost,topic],
}