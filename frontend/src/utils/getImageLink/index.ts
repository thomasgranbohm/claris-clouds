import { ImageSchema } from "types/api/strapi";

const getImageLink = ({ ext, hash }: Pick<ImageSchema, "hash" | "ext">) =>
	`/api/image/${hash}${ext}`;

export default getImageLink;
