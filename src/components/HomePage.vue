<template>
  <div class="HomePage container mt-3 mb-3">
    <div v-if="fileUploaded">
      <AnnotationsPage v-bind:json="json"/>
    </div>
    <div v-else>
      <h1>cdQA-annotator</h1>
      <hr>
      <p>
        cdQA-annotator a web-based annotator for closed-domain question answering datasets created for the
        <a
          href="https://github.com/cdqa-suite"
        >cdQA-suite</a> project.
      </p>
      <p>
        To get started, upload a
        <a href="https://rajpurkar.github.io/SQuAD-explorer/">SQuAD v1.1</a>-like JSON file
        where each document in the corpus has been pre-cut into paragraphs.
      </p>
      <p>
        <strong>Example:</strong>
      </p>
      <json-viewer :value="jsonData" :expand-depth="10" copyable></json-viewer>
      <br>
      <div class="uploadBar">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Upload a JSON file..."
          accept=".json"
        ></b-form-file>
      </div>
      <br>
      <b-button :size="''" :variant="'primary'" v-on:click="readFile()">Upload</b-button>
    </div>
  </div>
</template>

<script>
import AnnotationsPage from "./AnnotationsPage.vue";

export default {
  name: "HomePage",
  data: function() {
    return {
      jsonData: {
        data: [
          {
            title: "Question answering",
            paragraphs: [
              {
                context:
                  "Question answering (QA) is a computer science discipline within the fields of information retrieval and natural language processing (NLP), which is concerned with building systems that automatically answer questions posed by humans in a natural language.",
                qas: []
              },
              {
                context:
                  "A QA implementation, usually a computer program, may construct its answers by querying a structured database of knowledge or information, usually a knowledge base. More commonly, QA systems can pull answers from an unstructured collection of natural language documents.",
                qas: []
              }
            ]
          },
          {
            title: "Natural language processing",
            paragraphs: "[...]"
          }
        ]
      },
      fileUploaded: false,
      file: null,
      json: null
    };
  },
  methods: {
    readFile: function() {
      var reader = new FileReader();
      reader.onload = function(event) {
        this.json = JSON.parse(event.target.result);
        this.fileUploaded = true;
      }.bind(this);
      reader.readAsText(this.file);
    }
  },
  components: {
    AnnotationsPage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uploadBar {
  max-width: 300px;
}
</style>
