<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input 
      class="form-control" type="text" 
      v-model="searchText" placeholder="Search"
    >
    <hr>
    <!-- 자식Component에서 부모Component 
         @자식의emit명="부모의함수명"-->
    <!-- 부모Component에서 자식Component 
         :자식에서사용될이름="부모에서넘겨줄자료"-->
<<<<<<< HEAD
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!filteredTodos.length">There is nothing to display</div>   
    <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" /> 
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage-1)">Previous</a></li>
        <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? 'active' : '' ">
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="currentPage !== numberOfPages" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage+1)">Next</a></li>
      </ul>
    </nav>
=======
    <TodoSimpleForm @add-todo="addTodo" />    
    <div v-if="!filteredTodos.length">There is nothing to display</div>   
    <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" /> 
>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {
<<<<<<< HEAD
    const todos = ref([]);
    const error = ref('');    
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });
=======
    const todos = ref([]);    
>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

<<<<<<< HEAD
    // database select
    const getTodos = async (page = currentPage.value) => {
      error.value = '';
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        error.value = 'Something went wrong.';
      }      
    };

    getTodos();

    // database save
    const addTodo = async (todo) => {     
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        console.log(res);
        todos.value.push(res.data);
      } catch (err) {
        error.value = 'Something went wrong.';
      }     

      // 비동기방식
      // axios.post('http://localhost:3000/todos', {
      //   subject: todo.subject,
      //   completed: todo.completed,
      // }).then(res => {
      //   console.log(res);
      //   todos.value.push(res.data);
      // }).catch(err => {
      //   error.value = 'Something went wrong.';
      //   console.log(err);
      // });    
      // console.log("비동기 test log");  
    };

    const deleteTodo = async (index) => {
      error.value = '';
      try {
        const id = todos.value[index].id;
        await axios.delete('http://localhost:3000/todos/' + id);
        todos.value.splice(index, 1);
      } catch (err) {
        error.value = 'Something went wrong.';
      }      
    };    

    const toggleTodo = async (index) => {
      error.value = '';
      try {
        const id = todos.value[index].id;
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (err) {
        error.value = 'Something went wrong.';
      }       
    };
    
=======
    const addTodo = (todo) => {
      console.log(todo);
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };    

>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6
    const searchText = ref('');
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      } else {
        return todos.value;
      }
    });

    return {
<<<<<<< HEAD
      todos, todoStyle,
      numberOfTodos, limit, currentPage, numberOfPages,
      getTodos, addTodo, toggleTodo, deleteTodo,
      searchText, filteredTodos,
      error,
=======
      todos,
      todoStyle,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos,
>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>
