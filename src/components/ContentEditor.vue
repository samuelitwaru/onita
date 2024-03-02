<template>
  <div id="editor">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      @ready="onReady"
      @input="onChange"
      @blur="emitBlurEvent"
    ></ckeditor>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
// import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";

export default {
  name: "app",
  props: ["content"],
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.content,
    };
  },
  created() {
    //this.editorData = this.content;
  },
  methods: {
    onReady(editor) {
      //console.log("CKEditor5 Vue Component is ready to use!", editor);
    },
    onChange(data) {
      //console.log(data);
      // this.content = data;
      this.$emit("contentChanged", data);
    },

    emitBlurEvent() {
      var ctx = this;
      setTimeout(function () {
        ctx.$emit("blur", ctx.editorData);
      }, 1000);
    },
  },
  watch: {
    content: {
      handler(newValue) {
        this.editorData = newValue;
      },
      deep: true,
    },
  },
};
</script>
