const BASE_NAME = "claris-clouds";
const VERSION = "0.1.0";

const CACHES = [
	{
		name: `${BASE_NAME}-images`,
		regex: /\/_next\/image\?url=\/api\/image\/(.*?)/,
	},
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		Promise.all(
			CACHES.map(({ files, name }) => {
				return caches
					.open(name)
					.then((cache) => files && cache.addAll(files));
			})
		)
	);

	self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((resp) => {
				if (resp) return resp;

				return fetch(event.request).then((response) => {
					if (
						!response ||
						response.status !== 200 ||
						response.type !== "basic"
					) {
						return response;
					}

					for (const { name, regex } of CACHES) {
						if (regex.test(response.url)) {
							const responseToCache = response.clone();

							caches
								.open(name)
								.then((cache) =>
									cache.put(event.request, responseToCache)
								);
						}
					}

					return response;
				});
			})
			.catch((err) => console.error(err))
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(async () => {
		const cacheKeepList = CACHES.map(({ name }) => name);
		const keyList = await caches.keys();
		const cachesToDelete = keyList.filter(
			(key) => !cacheKeepList.includes(key)
		);

		await Promise.all(cachesToDelete.map((key) => caches.delete(key)));
	});
});
