<template>
  <router-view />
  <div class="container">
    <h2>To-Do List</h2>
    <input 
      class="form-control" type="text" 
      v-model="searchText" placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr>
    <!-- 자식Component에서 부모Component 
         @자식의emit명="부모의함수명"-->
    <!-- 부모Component에서 자식Component 
         :자식에서사용될이름="부모에서넘겨줄자료"-->
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">There is nothing to display</div>   
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" /> 
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
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
//@는 src forder를 가르킨다
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },

  setup() {
    const todos = ref([]);
    const error = ref('');    
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');    

    // 참조변수일 경우
    // watch([currentPage, numberOfTodos], (current, prev) => {
    //   console.log(current, prev);
    // });

    ////////// 참조변수가 아닐경우 : reactive-watch //////////
    // const state = reactive({ 
    //   count: 1,
    //   cnt: 2
    // });
    // watch(() => [state.count, state.cnt], (count, prevCount) => {
    //     console.log(count, prevCount);
    //   }
    // )
    // state.count = 3;
    // state.cnt = 3;
    /////////// watchEffect 예제 ///////////////////////////
    // watchEffect(() => {
    //   console.log(currentPage.value);
    //   console.log(numberOfTodos.value);
    // });

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    // database select
    const getTodos = async (page = currentPage.value) => {
      error.value = '';
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
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
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos(currentPage.value);
        // console.log(res);
        // todos.value.push(res.data);
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
        getTodos(currentPage.value);
        // todos.value.splice(index, 1);
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
    
    // 검색기능
    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(()=> {
         getTodos(1);
      }, 2000)     
    });

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   } else {
    //     return todos.value;
    //   }
    // });

    return {
      todos, todoStyle,
      numberOfTodos, limit, currentPage, numberOfPages,
      getTodos, addTodo, toggleTodo, deleteTodo,
      searchText, searchTodo,
      // filteredTodos,
      error,
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
