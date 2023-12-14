// Social Share Buttons Script

(function (exports) {
	// Function to update sharing links
	function updateShareLinks(container = document) {
		const defaultUrl = encodeURIComponent(document.location.href);
		const defaultTitle = document.title;
		const defaultDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";

		// Update each share link
		container.querySelectorAll(".g-share a").forEach((el) => {
			const customUrl = el.getAttribute("data-url") || container.querySelector(".g-share")?.getAttribute("data-url") || defaultUrl;
			const customTitle = el.getAttribute("data-title") || container.querySelector(".g-share")?.getAttribute("data-title") || defaultTitle;
			const customDesc = el.getAttribute("data-desc") || container.querySelector(".g-share")?.getAttribute("data-desc") || defaultDesc;
			const customHashtag = el.getAttribute("data-hashtag") || container.querySelector(".g-share")?.getAttribute("data-hashtag");
			// Process hashtags
			let twitterHashtags = "";
			let facebookHashtags = "";
			if (customHashtag) {
				const tagsArray = customHashtag.split(",").map((tag) => (tag.trim().startsWith("#") ? tag.trim().substring(1) : tag.trim()));

				twitterHashtags = tagsArray.join(",");
				facebookHashtags = tagsArray.map((tag) => `%23${tag}`).join(",");
			}
			switch (true) {
				case el.classList.contains("g-share-line"):
					el.href = `https://social-plugins.line.me/lineit/share?url=${customUrl}&text=${encodeURIComponent(customTitle)}`;
					break;
				case el.classList.contains("g-share-fb"):
					el.href = `https://www.facebook.com/sharer/sharer.php?u=${customUrl}` + (facebookHashtags ? `&hashtag=${facebookHashtags}` : "");
					break;
				case el.classList.contains("g-share-twitter"):
					el.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customTitle)}&url=${customUrl}` + (twitterHashtags ? `&hashtags=${twitterHashtags}` : "");
					break;
				case el.classList.contains("g-share-native"):
					el.onclick = () => {
						navigator.share({ title: customTitle, text: customDesc, url: customUrl });
					};
					break;
				case el.classList.contains("g-share-copy"):
					el.onclick = () => {
						navigator.clipboard
							.writeText(customUrl)
							.then(() => alert("Link copied to clipboard!"))
							.catch((err) => console.error("Error in copying text: ", err));
					};
					break;
			}
		});
	}
	exports.generateSocialShareUrls = function (url, title, description, hashtags) {
		// Encode the common parameters
		const encodedUrl = encodeURIComponent(url);
		const encodedTitle = encodeURIComponent(title);
		const encodedDescription = encodeURIComponent(description);

		// Process hashtags for Twitter and Facebook
		let twitterHashtags = "";
		let facebookHashtags = "";
		if (hashtags && hashtags.length > 0) {
			twitterHashtags = hashtags.join(",");
			facebookHashtags = hashtags.map((tag) => `%23${encodeURIComponent(tag)}`).join(",");
		}

		// Generate share URLs
		const shareUrls = {
			line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` + (facebookHashtags ? `&hashtag=${facebookHashtags}` : ""),
			twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` + (twitterHashtags ? `&hashtags=${twitterHashtags}` : ""),
			native: {
				title: title,
				text: description,
				url: url
			},
			copy: url
		};

		return shareUrls;
	};
	// Initialize function
	exports.initSocialShare = function () {
		updateShareLinks();
	};
	var target = document.documentElement || document.body;
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (node.matches(".g-share")) {
						updateShareLinks(node);
					} else {
						updateShareLinks(node);
					}
				}
			});
		});
	});
	observer.observe(target, {
		childList: true,
		subtree: true,
		characterDataOldValue: false
	});
	document.addEventListener("DOMContentLoaded", function () {
		initSocialShare();
	});
})(this);
