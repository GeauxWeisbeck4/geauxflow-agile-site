import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fs from "fs";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	// Adds the {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 4
			}
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Geaux-Flow Agile Site",
			subtitle: "My public display of agile affection using the Geaux-Flow method.",
			base: "https://geaux-flow.netlify.app/",
			author: {
				name: "Andrew Weisbeck"
			}
		}
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp", "auto"],

		// widths: ["auto"],

		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",
			}
		},

		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};

eleventyConfig.setDataDeepMerge(true);

eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

eleventyConfig.addFilter("readableDate", dateObj => {
	return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
});

eleventyConfig.addFilter("htmlDateString", dateObj => {
	return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
});

// Get the first `n` elements of a collection.
eleventyConfig.addFilter("head", (array, n) => {
	if( n < 0 ) {
		return array.slice(n);
	}

	return array.slice(0, n);
});

eleventyConfig.addCollection("tagList", function(collection) {
	let tagSet = new Set();
	collection.getAll().forEach(function(item) {
		if( "tags" in item.data ) {
			let tags = item.data.tags;

			tags = tags.filter(function(item) {
				switch(item) {
					// this list should mach the `filter` list in tags.njk
					case "all":
					case "nav":
					case "post":
					case "posts":
						return false;
				}

				return true;
			});

			for (const tag of tags) {
				tagSet.add(tag);
			}
		}
	});

	return [...tagSet];
});


/* Markdown Overrides */
let markdownLibrary = markdownIt({
	html: true,
	breaks: true,
	linkify: true
}).use(markdownItAnchor, {
	permalink: true,
	permalinkClass: "direct-link",
	permalinkSymbol: "#"
});

eleventyConfig.setLibrary("md", markdownLibrary);

// BrowserSync Overrides
eleventyConfig.setBrowserSyncConfig({
	callbacks: {
		ready: function(err, browserSync) {
			const content_404 = fs.readFileSync('_site/404.html');

			browserSync.addMiddleware("*", (req, res) => {
				// Provides the 404 content without redirect.
				res.write(content_404);
				res.end();
			});
		},
	},
	ui: false,
	ghostMode: false
});
