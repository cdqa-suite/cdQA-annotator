<template>
  <div class="HomePage container mt-3">
    <div v-if="fileUploaded">
      <AnnotationsPage v-bind:json="json"/>
    </div>
    <div v-else>
      <h1>cdQA-annotator</h1>
      <hr>
      <p>cdQA-annotator a web-based annotator for closed-domain question answering datasets made by <a href="https://github.com/fmikaelian">@fmikaelian</a>.
      To get started, upload a <code>.json</code> file with <a href="https://rajpurkar.github.io/SQuAD-explorer/"> (SQuAD) </a> format
      where each document has been pre-cut into paragraphs:</p>
        <pre v-highlightjs>
          <code class="json">
  {
    "data":[
        {
          "title":"Félix MIKAELIAN",
          "paragraphs":[
              {
                "context":"Félix holds a MSc in Data Science & Business Analytics from CENTRALE Paris School of Engineering and a Bachelor in Business Administration from ESSEC Business School.",
                "qas":[]
              },
              {
                "context":"As an applied data scientist, he has been using analytics and machine-learning to solve a wide range of business issues.",
                "qas":[]
              }
          ]
        },
        {
          "title":"Elon MUSK",
          "paragraphs":[...]
        }
    ]
  }
          </code>
        </pre>
      <br>
      <div class="uploadBar">
        <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a JSON file..." accept=".json"></b-form-file>
      </div>
      <br>
      <b-button :size="''" :variant="'primary'" v-on:click="uploadStatus(), readFile()">Upload</b-button>
    </div>
  </div>
</template>

<script>
import AnnotationsPage from './AnnotationsPage.vue'

export default {
  name: 'HomePage',
  data: function () {
    return {
      fileUploaded: false,
      file: null,
      json: null
    }
  },
  methods: {
    uploadStatus: function () {
      this.fileUploaded = true;
    },
    readFile: function () {
      var reader = new FileReader();
      reader.onload = function(event) {
        this.json = JSON.parse(event.target.result);
      }.bind(this);
      reader.readAsText(this.file);
    }
  },
  components: {
    AnnotationsPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uploadBar {
  max-width: 300px;
}
</style>
