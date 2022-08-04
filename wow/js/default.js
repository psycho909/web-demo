import components from "./components.js";

var vm = new Vue({
	el: "#app",
	components,
	mounted() {
		ClassicEditor.create(document.querySelector("#editor"), {
			toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
			heading: {
				options: [
					{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
					{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
					{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
					{ model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
					{ model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
					{ model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
					{ model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" }
				]
			}
		})
			.then((bewEditor) => {
				this.editor = bewEditor;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	data() {
		return {
			editor: "",
			fixed: {
				top: true,
				left: true
			},
			content: {
				body: []
			}
		};
	},
	methods: {
		getCKEdit() {
			const editorData = this.editor.getData();
			console.log(editorData);
		},
		tempChange() {
			this.content.body[0].top = false;
		},
		add(cpt) {
			var uid = Math.floor(Math.random() * 100);
			this.content.body.push({ component: cpt, uid });
		},
		addFixed() {
			var uid = Math.floor(Math.random() * 100);
			var left = this.fixed.left;
			var top = this.fixed.top;
			this.content.body.push({ component: "fixed", uid, left, top });
		},
		remove(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			this.content.body = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
		},
		up(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			if (_index - 1 < 0) {
				return;
			}
			var _temp = this.content.body[_index];
			var _content = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
			this.content.body = _content;
			this.content.body.splice(_index - 1, 0, _temp);
		},
		down(data) {
			var _index = this.content.body.findIndex((v, i) => v.uid == data);
			if (_index + 1 >= this.content.body.length) {
				return;
			}
			var _temp = this.content.body[_index];
			var _content = [...this.content.body.slice(0, _index), ...this.content.body.slice(_index + 1)];
			this.content.body = _content;
			this.content.body.splice(_index + 1, 0, _temp);
		}
	}
});
