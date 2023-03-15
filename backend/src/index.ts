import createError from "http-errors";
import _ from "lodash";
import sharp from "sharp";

const generateBase64 = async (file) => {
	const stream = await file.getStream();
	const buffer = await new Promise((resolve, reject) => {
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		stream.on("end", () => {
			resolve(Buffer.concat(chunks));
		});
		stream.on("error", reject);
	});

	const base64Obj = await sharp(buffer)
		.resize({
			width: 16,
			height: undefined,
		})
		.jpeg({
			quality: 50,
		})
		.toBuffer({
			resolveWithObject: true,
		});

	if (base64Obj) {
		const { data, info } = base64Obj;

		return {
			url: `data:image/${info.format};base64,${data.toString("base64")}`,
			width: info.width,
			height: info.height,
		};
	}
};

export default {
	register({ strapi }) {
		const extensionService = strapi.plugin("graphql").service("extension");

		extensionService.use(({ strapi }) => ({
			typeDefs: `type Query {
				page(slug: String!): PageEntityResponse
			}`,
			resolvers: {
				Query: {
					page: {
						resolve: async (_, args, __) => {
							const { toEntityResponse } = strapi.service(
								"plugin::graphql.format"
							).returnTypes;

							const data = await strapi.services[
								"api::page.page"
							].find({
								filters: { slug: args.slug },
							});

							if (data.results.length === 0) {
								throw createError(404);
							}

							const response = toEntityResponse(data.results[0]);

							return response;
						},
					},
				},
			},
		}));

		const uploadPlugin = strapi.plugin("upload");
		const uploadService = uploadPlugin.service("upload");

		// Stolen from strapi/packages/core/upload/server/services/upload.js
		async function uploadImage(fileData) {
			const {
				getDimensions,
				generateThumbnail,
				generateResponsiveFormats,
				isOptimizableImage,
			} = uploadPlugin.service("image-manipulation");

			const { width, height } = await getDimensions(fileData);

			_.assign(fileData, {
				width,
				height,
			});

			const uploadThumbnail = async (thumbnailFile) => {
				await uploadPlugin.service("provider").upload(thumbnailFile);
				_.set(fileData, "formats.thumbnail", thumbnailFile);
			};

			const uploadResponsiveFormat = async (format) => {
				const { key, file } = format;
				await uploadPlugin.service("provider").upload(file);
				_.set(fileData, ["formats", key], file);
			};

			const uploadPromises = [];

			uploadPromises.push(
				uploadPlugin.service("provider").upload(fileData)
			);

			if (await isOptimizableImage(fileData)) {
				const base64File = await generateBase64(fileData);
				if (base64File) {
					_.set(fileData, "formats.base64", base64File);
				}

				const thumbnailFile = await generateThumbnail(fileData);
				if (thumbnailFile) {
					uploadPromises.push(uploadThumbnail(thumbnailFile));
				}

				const formats = await generateResponsiveFormats(fileData);
				if (Array.isArray(formats) && formats.length > 0) {
					for (const format of formats) {
						if (!format) continue;
						uploadPromises.push(uploadResponsiveFormat(format));
					}
				}
			}

			await Promise.all(uploadPromises);
		}

		uploadService.uploadImage = uploadImage;
	},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap(/*{ strapi }*/) {},
};
