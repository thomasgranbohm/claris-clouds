import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_URLS = ["/", "/login"];

export function middleware(request: NextRequest) {
	if (
		request.cookies.has("password") &&
		request.cookies.get("password")?.value === process.env.PASSWORD
	) {
		return NextResponse.next();
	}

	if (!ALLOWED_URLS.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.rewrite(new URL("/unauth", request.url));
}

export const config = {
	matcher: [
		"/((?!api|login|sitemap\\.xml|robots\\.txt|_next/static|_next/image|service-worker.js|ms-icon-70x70.png|ms-icon-310x310.png|ms-icon-150x150.png|ms-icon-144x144.png|manifest.json|favicon.ico|favicon-96x96.png|favicon-32x32.png|favicon-16x16.png|browserconfig.xml|apple-icon-precomposed.png|apple-icon.png|apple-icon-76x76.png|apple-icon-72x72.png|apple-icon-60x60.png|apple-icon-57x57.png|apple-icon-180x180.png|apple-icon-152x152.png|apple-icon-144x144.png|apple-icon-120x120.png|apple-icon-114x114.png|android-icon-96x96.png|android-icon-72x72.png|android-icon-48x48.png|android-icon-36x36.png|android-icon-192x192.png|android-icon-144x144.png).*)",
	],
};
