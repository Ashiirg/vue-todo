<template>
  <div class="todo-wrapper">
    <h2>Список задач</h2>
    <form action="" class="main-form" @submit.prevent="createTodo">
      <label for="todo">Название задачи</label>
      <input type="text" name="todo" v-model="todo">
      <button type="submit">Создать</button>
    </form>

    <p class="todo-list__head">{{notice.title}}</p>
    <ul class="todo-list">
      <li class="todo-item" :class="{'todo-done': todo.status === 'done'}" v-for="(todo, index) in notice.todos" :key="index">
        {{todo.title}}
        <button class="todo-success" v-if="todo.status === 'undone'" @click="todoDone(todo.key)">Готово</button>
        <span class="todo-edit-icon" @click="todoEditOpen(todo.title, todo.key)"><b-icon icon="gear-fill"></b-icon></span>
        <span class="todo-delete" @click="todoDeleteOpen(todo.title, todo.key)"><b-icon icon="x"></b-icon></span>
      </li>
    </ul>

    <div class="back-wrap">
      <button class="btn btn-success" v-if="lastAction.action" @click="removeLastAction">Отменить последнее действие</button>
    </div>

    <div>
      <b-modal ref="modal-todoedit" id="modal-todoedit" centered title="Изменить задачу">
        <input type="text" name="todoedit" class="todoedit-input" v-model="todoEditTitle">
        <template v-slot:modal-footer>
          <button type="button" class="btn btn-dark" @click="todoEditClose">Отмена</button>
          <button type="button" class="btn btn-success" @click="todoEdit">Изменить</button>
        </template>
      </b-modal>
    </div>

    <div>
      <b-modal ref="modal-tododelete" id="modal-tododelete" centered title="Удалить задачу">
        <p>{{todoEditTitle}}</p>
        <template v-slot:modal-footer>
          <button type="button" class="btn btn-dark" @click="todoDeleteClose">Отмена</button>
          <button type="button" class="btn btn-success" @click="todoDelete">Удалить</button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    notice: [],
    noticeId: '',
    todo: '',
    loading: true,
    // Редактирование - удаление
    todoEditTitle: '',
    todoEditKey: '',

    lastAction: {}
  }),
  methods: {
    async createTodo() {
      await this.$store.dispatch('createTodoItem', {
        id: this.noticeId,
        title: this.todo
      })
      this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)

      let titleKey = ''
      for(let i = 0; i < this.notice.todos.length; i++) {
        if(this.notice.todos[i].title ===  this.todo) {
          titleKey = this.notice.todos[i].key
        }
      }
      this.createLastAction('createTodo', this.todo, this.todo, titleKey)

      this.todo = ''
    },

    async todoDone(todoId) {
      await this.$store.dispatch('todoDone', {
        noticeId: this.noticeId,
        todoId: todoId
      })
      this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)

      this.createLastAction('todoDone', ' ', ' ', todoId)
    },

    // Delete modal window
    todoDeleteOpen(title, key) {
      this.todoEditTitle = title
      this.todoEditKey = key

      this.$refs['modal-tododelete'].show()
    },
    todoDeleteClose() {
      this.$refs['modal-tododelete'].hide()
    },
    async todoDelete() {
      let delTitle = ''
      for(let i = 0; i < this.notice.todos.length; i++) {
        if(this.notice.todos[i].key ===  this.todoEditKey) {
          delTitle = this.notice.todos[i].title
        }
      }
      this.createLastAction('todoDelete', delTitle, ' ', ' ')

      await this.$store.dispatch('todoDelete', {
        noticeId: this.noticeId,
        todoId: this.todoEditKey
      })
      this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)
      this.$refs['modal-tododelete'].hide()
    },

    // Edit modal window
    todoEditOpen(title, key) {
      this.todoEditTitle = title
      this.todoEditKey = key

      this.$refs['modal-todoedit'].show()
    },
    todoEditClose() {
      this.$refs['modal-todoedit'].hide()
    },
    async todoEdit() {
      let editTitle = ''
      for(let i = 0; i < this.notice.todos.length; i++) {
        if(this.notice.todos[i].key === this.todoEditKey) {
          editTitle = this.notice.todos[i].title
        }
      }
      this.createLastAction('todoEdit', this.todoEditTitle, editTitle, this.todoEditKey)

      await this.$store.dispatch('todoEdit', {
        noticeId: this.noticeId,
        todoId: this.todoEditKey,
        title: this.todoEditTitle
      })
      this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)
      this.$refs['modal-todoedit'].hide()
    },

    // Back to last action
    createLastAction(action, title, oldTitle, todoId) {
      this.lastAction = {
        action: action,
        todoTitle: title,
        oldTitle: oldTitle,
        todoId: todoId
      }
    },
    async removeLastAction() {
      if(this.lastAction.action === 'createTodo') {
        await this.$store.dispatch('todoDelete', {
          noticeId: this.noticeId,
          todoId: this.lastAction.todoId
        })

        this.lastAction.action = 'todoDelete'
      }

      else if(this.lastAction.action === 'todoDone') {
        await this.$store.dispatch('todoUndone', {
          noticeId: this.noticeId,
          todoId: this.lastAction.todoId
        })

        this.lastAction.action = 'todoUndone'
      }
      else if(this.lastAction.action === 'todoUndone') {
        await this.$store.dispatch('todoDone', {
          noticeId: this.noticeId,
          todoId: this.lastAction.todoId
        })

        this.lastAction.action = 'todoDone'
      }

      else if(this.lastAction.action === 'todoDelete') {
        await this.$store.dispatch('createTodoItem', {
          id: this.noticeId,
          title: this.lastAction.todoTitle
        })

        this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)
        let titleKey = ''
        for(let i = 0; i < this.notice.todos.length; i++) {
          if(this.notice.todos[i].title === this.lastAction.todoTitle) {
            titleKey = this.notice.todos[i].key
          }
        }

        this.lastAction.todoId = titleKey
        this.lastAction.action = 'createTodo'
      }

      else if(this.lastAction.action === 'todoEdit') {
        await this.$store.dispatch('todoEdit', {
          noticeId: this.noticeId,
          todoId: this.lastAction.todoId,
          title: this.lastAction.oldTitle
        })

        this.lastAction.action = 'todoEditBack'
      }
      else if(this.lastAction.action === 'todoEditBack') {
        await this.$store.dispatch('todoEdit', {
          noticeId: this.noticeId,
          todoId: this.lastAction.todoId,
          title: this.lastAction.todoTitle
        })

        this.lastAction.action = 'todoEdit'
      }

      this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)
    }
  },
  async mounted() {
    this.noticeId = this.$route.params.id
    this.notice = await this.$store.dispatch('getNoticeById', this.noticeId)
  }
}
</script>

<style>

</style>