var ckedit = {
	template: `<div class="box" :data-uid="content.uid">
        <h2>editor</h2>
        <div id="editor"></div>
        <control :uid="content.uid"  />
    </div>`,
	props: ["content"],
	mounted() {
		console.log("mounted");
		ClassicEditor.create(document.querySelector("#editor"), {
			image: {},
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
			editor: ""
		};
	},
	methods: {
		getCKEdit() {
			// const editorData = this.editor.getData();
		}
	}
};

export default ckedit;
