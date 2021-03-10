import express from "express";
const router = express.Router();
import path from "path";
import { errors, __dirname } from "../../config.mjs"

const PUBLIC_PATH = path.join(__dirname, "public");

import rateLimit from "express-rate-limit";

const cspHeaders = `
	upgrade-insecure-requests;
	default-src 'self' https://repl.it;
	style-src 'self' https://fonts.googleapis.com/css2;
	style-src-elem 'self' https://fonts.googleapis.com/css2;
	style-src-attr 'none';
	font-src https://fonts.gstatic.com;
	child-src 'none';
	connect-src https://repl.it;
	frame-src 'none';
	manifest-src 'none';
	frame-ancestors sameorgin;
	img-src *;
	media-src *;
	object-src 'none';
	prefetch-src 'none';
	script-src 'none';
	script-src-elem https://3js.epicgamer007.repl.co/scripts/ https://3js.epicgamer007.repl.co/lib/;
	script-src-attr 'none';
	worker-src 'none';
	`.replace(/\s/g, ' ');

const httpHeaders = {
	"Content-Security-Policy": cspHeaders,
	"x-content-type-options": "nosniff"
};

router.use(rateLimit({
	windowMs: 60 * 1000,
	max: 60
}));

router.use((_req, res, next) => {
	res.set(httpHeaders); 

	res.removeHeader("X-Powered-By");
	res.removeHeader("X-Frame-Options");
	res.removeHeader("x-frame-options");

	next();
});

router.get("/", (req, res) => {
	res.set("Content-type", "text/html; charset=UTF-8");

	res.render("index");
});

router.get("*", (req, res) => {
	res.set("Content-type", "text/html; charset=UTF-8");

	res.set(httpHeaders);

	res.render("error", errors[404]);
});

export default router;