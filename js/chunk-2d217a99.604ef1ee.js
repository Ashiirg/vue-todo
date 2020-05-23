(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217a99"],{c84b:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-wrapper"},[o("h2",[t._v("Список задач")]),o("form",{staticClass:"main-form",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.createTodo(e)}}},[o("label",{attrs:{for:"todo"}},[t._v("Название задачи")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo,expression:"todo"}],attrs:{type:"text",name:"todo"},domProps:{value:t.todo},on:{input:function(e){e.target.composing||(t.todo=e.target.value)}}}),o("button",{attrs:{type:"submit"}},[t._v("Создать")])]),o("p",{staticClass:"todo-list__head"},[t._v(t._s(t.notice.title))]),o("ul",{staticClass:"todo-list"},t._l(t.notice.todos,(function(e,n){return o("li",{key:n,staticClass:"todo-item",class:{"todo-done":"done"===e.status}},[t._v(" "+t._s(e.title)+" "),"undone"===e.status?o("button",{staticClass:"todo-success",on:{click:function(o){return t.todoDone(e.key)}}},[t._v("Готово")]):t._e(),o("span",{staticClass:"todo-edit-icon",on:{click:function(o){return t.todoEditOpen(e.title,e.key)}}},[o("b-icon",{attrs:{icon:"gear-fill"}})],1),o("span",{staticClass:"todo-delete",on:{click:function(o){return t.todoDeleteOpen(e.title,e.key)}}},[o("b-icon",{attrs:{icon:"x"}})],1)])})),0),o("div",{staticClass:"back-wrap"},[t.lastAction.action?o("button",{staticClass:"btn btn-success",on:{click:t.removeLastAction}},[t._v("Отменить последнее действие")]):t._e()]),o("div",[o("b-modal",{ref:"modal-todoedit",attrs:{id:"modal-todoedit",centered:"",title:"Изменить задачу"},scopedSlots:t._u([{key:"modal-footer",fn:function(){return[o("button",{staticClass:"btn btn-dark",attrs:{type:"button"},on:{click:t.todoEditClose}},[t._v("Отмена")]),o("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.todoEdit}},[t._v("Изменить")])]},proxy:!0}])},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todoEditTitle,expression:"todoEditTitle"}],staticClass:"todoedit-input",attrs:{type:"text",name:"todoedit"},domProps:{value:t.todoEditTitle},on:{input:function(e){e.target.composing||(t.todoEditTitle=e.target.value)}}})])],1),o("div",[o("b-modal",{ref:"modal-tododelete",attrs:{id:"modal-tododelete",centered:"",title:"Удалить задачу"},scopedSlots:t._u([{key:"modal-footer",fn:function(){return[o("button",{staticClass:"btn btn-dark",attrs:{type:"button"},on:{click:t.todoDeleteClose}},[t._v("Отмена")]),o("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.todoDelete}},[t._v("Удалить")])]},proxy:!0}])},[o("p",[t._v(t._s(t.todoEditTitle))])])],1)])},i=[],d=(o("96cf"),o("1da1")),c={name:"detail",data:function(){return{notice:[],noticeId:"",todo:"",loading:!0,todoEditTitle:"",todoEditKey:"",lastAction:{}}},methods:{createTodo:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("createTodoItem",{id:t.noticeId,title:t.todo});case 2:return e.next=4,t.$store.dispatch("getNoticeById",t.noticeId);case 4:for(t.notice=e.sent,o="",n=0;n<t.notice.todos.length;n++)t.notice.todos[n].title===t.todo&&(o=t.notice.todos[n].key);t.createLastAction("createTodo",t.todo,t.todo,o),t.todo="";case 9:case"end":return e.stop()}}),e)})))()},todoDone:function(t){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,e.$store.dispatch("todoDone",{noticeId:e.noticeId,todoId:t});case 2:return o.next=4,e.$store.dispatch("getNoticeById",e.noticeId);case 4:e.notice=o.sent,e.createLastAction("todoDone"," "," ",t);case 6:case"end":return o.stop()}}),o)})))()},todoDeleteOpen:function(t,e){this.todoEditTitle=t,this.todoEditKey=e,this.$refs["modal-tododelete"].show()},todoDeleteClose:function(){this.$refs["modal-tododelete"].hide()},todoDelete:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(o="",n=0;n<t.notice.todos.length;n++)t.notice.todos[n].key===t.todoEditKey&&(o=t.notice.todos[n].title);return t.createLastAction("todoDelete",o," "," "),e.next=5,t.$store.dispatch("todoDelete",{noticeId:t.noticeId,todoId:t.todoEditKey});case 5:return e.next=7,t.$store.dispatch("getNoticeById",t.noticeId);case 7:t.notice=e.sent,t.$refs["modal-tododelete"].hide();case 9:case"end":return e.stop()}}),e)})))()},todoEditOpen:function(t,e){this.todoEditTitle=t,this.todoEditKey=e,this.$refs["modal-todoedit"].show()},todoEditClose:function(){this.$refs["modal-todoedit"].hide()},todoEdit:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(o="",n=0;n<t.notice.todos.length;n++)t.notice.todos[n].key===t.todoEditKey&&(o=t.notice.todos[n].title);return t.createLastAction("todoEdit",t.todoEditTitle,o,t.todoEditKey),e.next=5,t.$store.dispatch("todoEdit",{noticeId:t.noticeId,todoId:t.todoEditKey,title:t.todoEditTitle});case 5:return e.next=7,t.$store.dispatch("getNoticeById",t.noticeId);case 7:t.notice=e.sent,t.$refs["modal-todoedit"].hide();case 9:case"end":return e.stop()}}),e)})))()},createLastAction:function(t,e,o,n){this.lastAction={action:t,todoTitle:e,oldTitle:o,todoId:n}},removeLastAction:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var o,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("createTodo"!==t.lastAction.action){e.next=6;break}return e.next=3,t.$store.dispatch("todoDelete",{noticeId:t.noticeId,todoId:t.lastAction.todoId});case 3:t.lastAction.action="todoDelete",e.next=40;break;case 6:if("todoDone"!==t.lastAction.action){e.next=12;break}return e.next=9,t.$store.dispatch("todoUndone",{noticeId:t.noticeId,todoId:t.lastAction.todoId});case 9:t.lastAction.action="todoUndone",e.next=40;break;case 12:if("todoUndone"!==t.lastAction.action){e.next=18;break}return e.next=15,t.$store.dispatch("todoDone",{noticeId:t.noticeId,todoId:t.lastAction.todoId});case 15:t.lastAction.action="todoDone",e.next=40;break;case 18:if("todoDelete"!==t.lastAction.action){e.next=30;break}return e.next=21,t.$store.dispatch("createTodoItem",{id:t.noticeId,title:t.lastAction.todoTitle});case 21:return e.next=23,t.$store.dispatch("getNoticeById",t.noticeId);case 23:for(t.notice=e.sent,o="",n=0;n<t.notice.todos.length;n++)t.notice.todos[n].title===t.lastAction.todoTitle&&(o=t.notice.todos[n].key);t.lastAction.todoId=o,t.lastAction.action="createTodo",e.next=40;break;case 30:if("todoEdit"!==t.lastAction.action){e.next=36;break}return e.next=33,t.$store.dispatch("todoEdit",{noticeId:t.noticeId,todoId:t.lastAction.todoId,title:t.lastAction.oldTitle});case 33:t.lastAction.action="todoEditBack",e.next=40;break;case 36:if("todoEditBack"!==t.lastAction.action){e.next=40;break}return e.next=39,t.$store.dispatch("todoEdit",{noticeId:t.noticeId,todoId:t.lastAction.todoId,title:t.lastAction.todoTitle});case 39:t.lastAction.action="todoEdit";case 40:return e.next=42,t.$store.dispatch("getNoticeById",t.noticeId);case 42:t.notice=e.sent;case 43:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.noticeId=t.$route.params.id,e.next=3,t.$store.dispatch("getNoticeById",t.noticeId);case 3:t.notice=e.sent;case 4:case"end":return e.stop()}}),e)})))()}},a=c,s=o("2877"),r=Object(s["a"])(a,n,i,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d217a99.604ef1ee.js.map