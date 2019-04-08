<template>
  <div class="HomePage container mt-3">
    <div v-if="fileUploaded">
      <AnnotationsPage v-bind:json="json"/>
    </div>
    <div v-else>
      <h1><img src="../assets/doggoblob.png" class="d-inline-block align-top" height="45" width="45">   cdQA-annotator</h1>
      <hr>
      <p>cdQA-annotator a web-based annotator for closed-domain question answering datasets created by <a href="https://github.com/fmikaelian">@fmikaelian</a>.
      It has been developped in the context of the <a href="https://github.com/fmikaelian/cdqa"> cdqa </a> project. To get started, upload a <code>.json</code> file with <a href="https://rajpurkar.github.io/SQuAD-explorer/"> SQuAD v1.1 </a> format
      where each document in the corpus has been pre-cut into paragraphs (you can use <a href="https://github.com/fmikaelian/cdqa"> cdqa </a> helpers functions to create this dataset from a <code>.csv</code> file).</p>
      <json-viewer
      :value="jsonData"
      :expand-depth=10
      copyable></json-viewer>
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
      jsonData: {
        data:[
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
              "paragraphs":"[...]"
            }
        ]
      },
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
