<template>
  <div class="HomePage container mt-3">
    <div v-if="fileUploaded">
      <AnnotationsPage v-bind:json="json"/>
    </div>
    <div v-else>
      <h1>reading-comprehension-annotator</h1>
      <hr>
      <p>reading-comprehension-annotator is a tool made by  <a href="https://github.com/fmikaelian">@fmikaelian</a> to help you annotate reading comprehension datasets like 
        <a href="https://rajpurkar.github.io/SQuAD-explorer/">Stanford Question Answering Dataset (SQuAD).</a> 
        This tool has been developped to ease data labelling in the context of training custom reading comprehension models with algorithms such as 
        <a href="https://github.com/huggingface/pytorch-pretrained-BERT/">BERT.</a>  To get started, upload a <code>.json</code> file in the following format 
        where each article has been pre-cut into paragraphs:</p>
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
