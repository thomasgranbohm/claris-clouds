import getConfig from "next/config";

import { ImageSchema } from "types/api/strapi";

const { publicRuntimeConfig } = getConfig();

const getImageLink = ({ ext, hash }: Pick<ImageSchema, "hash" | "ext">) =>
	`${publicRuntimeConfig.PAGE_URL}/api/image/${hash}${ext}`;

export default getImageLink;
