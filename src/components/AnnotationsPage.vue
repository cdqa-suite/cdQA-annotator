<template>
  <div class="AnnotationsPage container mt-3">

    <div v-if="data_number - 1 < json.data.length">
      <h1>{{ json.data[data_number - 1].title }}</h1>
      <br>

      <p ref="paragraph" v-selection.fix="{getSelection:getSelection}">{{ paragraph_context }}</p>
      <br>

      <b-form-input v-model="question"
                    type="text"
                    placeholder="Type question here"></b-form-input>
      <br>

      <b-form-input v-model="answer"
                    type="text"
                    placeholder="Type answer here..."></b-form-input>
      <br>

      <b-button :size="''" :variant="'success'" v-on:click="addAnnotation()">Add annotation</b-button>
      <br>
      <br>

      <b-table striped hover :items="items" :fields="fields">
        <template slot="Edit" slot-scope="row">
          <b-button :size="''" :variant="'danger'" @click.stop="deleteAnnotation(row.index)">Delete</b-button>
        </template>
      </b-table>
      <br>

      <div v-if="context_number < json.data[data_number - 1].paragraphs.length">
        <b-button :size="''" :variant="'success'" v-on:click="context_number += 1">Validate</b-button>
      </div>
      <div v-else>
        <b-button :size="''" :variant="'success'" v-on:click="data_number += 1, context_number = 1">Validate</b-button>
      </div>
      <br>
      <br>

      Remaining documents:
      <b-progress :max="json.data.length" class="w-25">
        <b-progress-bar :value="data_number">
          <strong>{{ data_number }} / {{ json.data.length }}</strong>
        </b-progress-bar>
      </b-progress>

      Remaining paragraphs:
      <b-progress :max="json.data[data_number - 1].paragraphs.length" class="w-25">
        <b-progress-bar :value="context_number">
          <strong>{{ context_number }} / {{ json.data[data_number - 1].paragraphs.length }}</strong>
        </b-progress-bar>
      </b-progress>
      <br>

      Switch to document:
      <b-pagination size="md" :total-rows="json.data.length" v-model="data_number" :per-page="1">
      </b-pagination>
      Switch to paragraph:
      <b-pagination size="md" :total-rows="json.data.length" v-model="context_number" :per-page="1">
      </b-pagination>
      <br>

    </div>
    <div v-else>
      There are no more data to annotate. You can now download your annotated dataset:
      <br>
      <br>
      <b-button :size="''" :variant="'primary'" v-download-data="JSON.stringify(json)" v-download-data:type="'json'" v-download-data:filename="'cdqa-v1.1.json'">Download</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnotationsPage',
  props: ['json'],
  data: function () {
    return {
      data_number: 1,
      context_number: 1,
      question: '',
      answer: '',
      fields: ['Questions', 'Answers', 'Edit'],
    }
  },
  methods: {
    addAnnotation: function () {
      var paragraph_container = this.json.data[this.data_number - 1].paragraphs[this.context_number - 1]
      var qa = {question: this.question, answers: [{answer_start : this.answer_start, text: this.answer}]}
      paragraph_container.qas.push(qa);
      this.question = '';
      this.answer = '';
      this.$cookie.set('json', JSON.stringify(this.json), 1);
    },
    deleteAnnotation: function (row_index) {
      var paragraph_container = this.json.data[this.data_number - 1].paragraphs[this.context_number - 1]
      paragraph_container.qas.splice(row_index, 1);
      this.$cookie.set('json', JSON.stringify(this.json), 1);
    },
    getSelection: function(fixStr, allStr) {
      this.answer = fixStr
    }
  },
  computed: {
    items: function () {
      var paragraph_container = this.json.data[this.data_number - 1].paragraphs[this.context_number - 1]
      var items = [];
      for (var i = 0; i < paragraph_container.qas.length; i++) {
        var item = {Questions: paragraph_container.qas[i].question, Answers: paragraph_container.qas[i].answers[0].text};
        items.push(item);
      }
      return items
    },
    paragraph_context: function () {
      return this.json.data[this.data_number - 1].paragraphs[this.context_number - 1].context
    },
    answer_start: function () {
      return this.paragraph_context.indexOf(this.answer);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
