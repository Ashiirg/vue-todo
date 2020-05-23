import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getNotice({}) {
      try {
        const notices = []
        const noticeData = (await firebase.database().ref(`/notices`).once('value')).val() || {}
        Object.keys(noticeData).forEach(key => {
          notices.push({
            title: noticeData[key].title,
            key: key,
            todo: noticeData[key].todo
          })
        })
        return notices
      } catch (error) {
        console.log(error)
      }
    },

    async getNoticeById({}, id) {
      try {
        let todoArr = []
        const noticeData = (await firebase.database().ref(`notices`).child(id).once('value')).val() || {}
        if(noticeData.todo !== undefined) {
          Object.keys(noticeData.todo).forEach(key => {
            todoArr.push({
              title: noticeData.todo[key].title,
              status: noticeData.todo[key].status,
              key: key,
            })
          })
        }
        const notice = {
          title: noticeData.title,
          todos: todoArr
        }
        
        return notice
      } catch (error) {
        console.log(error)
      }
    },

    async createNotice({}, {title}) {
      try {
        const notice = await firebase.database().ref(`notices`).push({title: title})
        return notice
      } catch (error) {
        console.log(error)
      }
    },

    async noticeEdit({}, {noticeId, title}) {
      try {
        await firebase.database().ref(`/notices`).child(noticeId).update({title: title})
      } catch (error) {
        console.log(error)
      }
    },

    async noticeDelete({}, {noticeId}) {
      try {
        await firebase.database().ref(`/notices`).child(noticeId).remove()
      } catch (error) {
        console.log(error)
      }
    },

    async createTodoItem({}, {id, title}) {
      try {
        const todo = await firebase.database().ref(`notices/${id}/todo`).push({title: title, status: 'undone'})
        return todo
      } catch (error) {
        console.log(error)
      }
    },

    async todoDone({}, {noticeId, todoId}) {
      try {
        await firebase.database().ref(`/notices/${noticeId}/todo`).child(todoId).update({status: 'done'})
      } catch (error) {
        console.log(error)
      }
    },
    async todoUndone({}, {noticeId, todoId}) {
      try {
        await firebase.database().ref(`/notices/${noticeId}/todo`).child(todoId).update({status: 'undone'})
      } catch (error) {
        console.log(error)
      }
    },

    async todoDelete({}, {noticeId, todoId}) {
      try {
        await firebase.database().ref(`/notices/${noticeId}/todo`).child(todoId).remove()
      } catch (error) {
        console.log(error)
      }
    },

    async todoEdit({}, {noticeId, todoId, title}) {
      try {
        await firebase.database().ref(`/notices/${noticeId}/todo`).child(todoId).update({title: title})
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
