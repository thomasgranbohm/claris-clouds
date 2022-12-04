import { StartPage } from "types/api/start-page";
import { Response } from "types/api/strapi";

export interface StartPageRequest {
	startPage: Response<StartPage>;
}
