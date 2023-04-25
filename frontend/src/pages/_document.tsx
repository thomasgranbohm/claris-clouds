import getConfig from "next/config";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const { publicRuntimeConfig } = getConfig();

const CustomDocument = () => {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#7f2fff" />
				<meta
					name="msapplication-TileImage"
					content="/ms-icon-144x144.png"
				/>
				<meta name="theme-color" content="#7f2fff" />

				{/* Google Tag Manager */}
				{publicRuntimeConfig.GTM_ID && (
					<Script id="google-tagmananger" strategy="afterInteractive">
						{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${publicRuntimeConfig.GTM_AUTH}&gtm_preview=${publicRuntimeConfig.GTM_ENV}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${publicRuntimeConfig.GTM_ID}');`}
					</Script>
				)}

				{/* MailChimp */}
				{process.env.NODE_ENV === "production" && (
					<Script id="mcjs" strategy="lazyOnload">
						{
							'!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/4fc70238f00a96645f92bbf56/0d57517a5b6a1ce7894d92fdd.js");'
						}
					</Script>
				)}
			</Head>
			<body>
				<Main />
				<NextScript />
				{publicRuntimeConfig.GTM_ID && (
					<noscript>
						<iframe
							src={`https://www.googletagmanager.com/ns.html?id=${publicRuntimeConfig.GTM_ID}&gtm_auth=${publicRuntimeConfig.GTM_AUTH}&gtm_preview=${publicRuntimeConfig.GTM_ENV}&gtm_cookies_win=x`}
							height={0}
							width={0}
							style={{ display: "none", visibility: "hidden" }}
						/>
					</noscript>
				)}
			</body>
		</Html>
	);
};

export default CustomDocument;
