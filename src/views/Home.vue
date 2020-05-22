<template>
  <div class="notice-wrapper">
    <h1>Список заметок</h1>
    <form action="" class="main-form" @submit.prevent="createNotice">
      <label for="notice">Название заметки</label>
      <input type="text" name="notice" v-model="noticeTitle">
      <button type="submit">Создать</button>
    </form>

    <ul class="notice-list">
      <li 
        v-for="notice in noticeList" 
        :key="notice.key" 
      >
        {{notice.title}}

        <span class="todo-edit-icon" @click="noticeEditOpen(notice.title, notice.key)"><b-icon icon="gear-fill"></b-icon></span>
        <span class="todo-delete" @click="noticeDeleteOpen(notice.title, notice.key)"><b-icon icon="x"></b-icon></span>

        <div class="notice-sublist" @click="$router.push('/detail/' + notice.key)">
          <span 
            v-for="(todo, index) in Object.entries(notice.todo).slice(0,3).map(entry => entry[1])"
            :key="index"
            :class="{'todo-done': todo.status === 'done'}"
          >
            {{todo.title}}
          </span>
        </div>

        <div class="back-wrap">
          <button class="btn notice-open-btn" @click="$router.push('/detail/' + notice.key)">Открыть</button>
        </div>
      </li>
    </ul>

    <div>
      <b-modal ref="modal-noticeedit" id="modal-noticeedit" centered title="Изменить заметку">
        <input type="text" name="noticeedit" class="todoedit-input" v-model="noticeEditTitle">
        <template v-slot:modal-footer>
          <button type="button" class="btn btn-dark" @click="noticeEditClose">Отмена</button>
          <button type="button" class="btn btn-success" @click="noticeEdit">Изменить</button>
        </template>
      </b-modal>
    </div>

    <div>
      <b-modal ref="modal-noticedelete" id="modal-noticedelete" centered title="Удалить заметку">
        <p>{{noticeEditTitle}}</p>
        <template v-slot:modal-footer>
          <button type="button" class="btn btn-dark" @click="noticeDeleteClose">Отмена</button>
          <button type="button" class="btn btn-success" @click="noticeDelete">Удалить</button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data: () => ({
    noticeList: [],
    noticeTitle: '',

    // Редактирование - удаление
    noticeEditTitle: '',
    noticeEditKey: '',
  }),
  methods: {
    async createNotice() {
      await this.$store.dispatch('createNotice', {
        title: this.noticeTitle
      })

      this.noticeList = await this.$store.dispatch('getNotice')
    },

    // Delete modal window
    noticeDeleteOpen(title, key) {
      this.noticeEditTitle = title
      this.noticeEditKey = key

      this.$refs['modal-noticedelete'].show()
    },
    noticeDeleteClose() {
      this.$refs['modal-noticedelete'].hide()
    },
    async noticeDelete() {
      await this.$store.dispatch('noticeDelete', {
        noticeId: this.noticeEditKey
      })
      this.noticeList = await this.$store.dispatch('getNotice')
      this.$refs['modal-noticedelete'].hide()
    },

    // Edit modal window
    noticeEditOpen(title, key) {
      this.noticeEditTitle = title
      this.noticeEditKey = key

      this.$refs['modal-noticeedit'].show()
    },
    noticeEditClose() {
      this.$refs['modal-noticeedit'].hide()
    },
    async noticeEdit() {
      await this.$store.dispatch('noticeEdit', {
        noticeId: this.noticeEditKey,
        title: this.noticeEditTitle
      })
      this.noticeList = await this.$store.dispatch('getNotice')
      this.$refs['modal-noticeedit'].hide()
    }
  },
  components: {
    
  },
  async mounted() {
    this.noticeList = await this.$store.dispatch('getNotice')
  }
}
</script>

<style lang="scss">

</style>