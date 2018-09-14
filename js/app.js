(function (exports) {
	var value1;

	var filters = {
			all: function (todos) {
				return todos;
			},
			active: function (todos) {
				return todos.filter(function (todo) {
					return !todo.completed;
				});
			},
			completed: function (todos) {
				return todos.filter(function (todo) {
					return todo.completed;
				});
			},
		  work: function (todos) {
				return todos.filter(function (todo) {
					return todo.work;
				});
		  }
		};

	exports.app = new Vue({
		el: "#vue-app",

		data: {
			todos: [],
			newTodo: { id: null, title: '', completed: false, work: false },
			editedTodo: null,
			visibility: "all",
			showComplete: false
		},
		mounted() {
			this.getTodos();
		},
		watch: {
			todos: {
				deep: true,
				handler(updatedList) {
					localStorage.setItem('todo_list', JSON.stringify(updatedList));
				}
			}
		},

		computed: {
			todoCount() {
				return this.todos.length;
			},
			today: function () {
				var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yy = today.getFullYear();

				if (dd < 0) {
					dd = "0" + dd;
				}
				if (mm < 10) {
					mm = "0" + mm;
				}

				today = {
					day: weekday[today.getDay()],
					date: mm + '-' + dd + '-' + yy
				};

				return today;
			},

			pending() {
				return this.todos.filter(function(item) {
					return !item.done;
				});
			},
			filteredTodos() {
				return filters[this.visibility](this.todos);
			},
			remaining() {
				return filters.active(this.todos).length;
			},
			allDone: {
				get() {
					return this.remaining === 0;
				},
				set(value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			},
			 completed () {
				return this.todos.filter(function(item) {
					return item.completed;
				})
			},
			completedPercentage () {
				value1 = (Math.floor((this.completed.length / this.todos.length) * 100));
				localStorage.setItem('HACKY  FIX', JSON.stringify(value1));
				return value1 + "%";
			}
		},

		methods: {
			getTodos() {
				if (localStorage.getItem('todo_list')) {
					this.todos = JSON.parse(localStorage.getItem('todo_list'));
				}
			},
			addNewTodo(newTodo) {

				this.todos.push(newTodo);
				this.newTodo = { id: null, title: '', completed: false };

			},
			deleteTodo(todo) {
				let index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			},
			editTodo(todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},
			doneEdit(todo) {
				if(!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title=todo.title.trim();
				if(!todo.title) {
					this.removeTodo(todo);
				}
			},
			cancelEdit(todo) {
				this.editedTodo = null;
				todo.title=this.beforeEditCache;
			},
			todoCompleted(todo) {
				todo.completed = !todo.completed;
			},
			removeCompleted() {
				this.todos = filters.active(this.todos);
			},
			pluralize (word, count) {
				return word + (count === 1 ? " " : "s");
			},
			toggleShowComplete () {
				this.showComplete = !this.showComplete;
			},

		},

		directives: {
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		},
	});

	value1 = localStorage.getItem('HACKY FIX');

	Vue.component('pie-chart', {
		extends: VueChartJs.Pie,
		mounted() {
			this.renderChart({
				labels: ['Completed', 'Pending'],
				datasets: [
					{
						label: 'Progress Track',
						backgroundColor: ['green', 'orange'],
						data: [value1, 100 - value1]
					}
				]
			}, {responsive: true, maintainAspectRatio: false})
		},
	});


})(window);

