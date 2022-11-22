import axios, { AxiosError } from "axios";
import getConfig from "next/config";

import { Response } from "types/api/strapi";

const { serverRuntimeConfig } = getConfig();

const API = axios.create({
	baseURL: serverRuntimeConfig.API_URL + "/api",
	params: {
		populate: "*",
	},
});

const request = async <T, U = {}>(
	method: "GET" | "POST",
	url: string,
	data?: U
): Promise<Response<T>> => {
	try {
		console.log(data);
		const resp = await API<Response<T>>({
			data: method === "POST" ? data : {},
			method,
			params: method === "GET" ? data : {},
			url: url.startsWith("/") ? url : `/${url}`,
		});

		return resp.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response) {
				return error.response.data;
			}
		}
		throw error;
	}
};

export default request;
