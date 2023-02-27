import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	if (
		request.cookies.has("password") &&
		request.cookies.get("password")?.value === process.env.PASSWORD
	) {
		return NextResponse.next();
	}

	return NextResponse.rewrite(new URL("/unauth", request.url));
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
