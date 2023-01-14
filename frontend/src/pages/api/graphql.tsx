import axios from "axios";
import { NextApiHandler } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const Handler: NextApiHandler = async (req, res) => {
	if (!["POST", "GET"].includes(String(req.method))) {
		return res.status(405).send("Method not allowed.");
	}

	const resp = await axios({
		data: req.body,
		headers: {
			"Content-Type": "application/json",
		},
		method: req.method,
		url: serverRuntimeConfig.API_URL + "/graphql",
	});

	return res.json(resp.data);
};

export default Handler;
