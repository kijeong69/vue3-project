<template>
<div>
    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
        <div class="card-body p-2 d-flex align-item-center">
            <div class="form-check flex-grow-1">
                <!-- 단방향 바인딩(one-way-down binding) <-> v-model 양방향바인딩 -->
                <!-- 
                <input class="form-check-input" type="checkbox" v-model="todo.completed">
                -->
<<<<<<< HEAD
                <input class="form-check-input" type="checkbox" :checked="todo.completed" @change="toggleTodo(index)">
=======
                <input class="form-check-input" type="checkbox" :value="todo.completed" @change="toggleTodo(index)">
>>>>>>> 11bc1903444c3a80c2026b2440bbc04962b864e6
                <!-- style bind -->
                <!-- 
                <label class="form-check-label" :style="todo.completed ? todoStyle : {}">{{ todo.subject}}</label>
                -->
                <!-- class bind -->
                <label class="form-check-label" :class="{ todo: todo.completed }">{{ todo.subject}}</label>
            </div> 
            <div>
                <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
            </div>       
        </div>
    </div> 
</div>
</template>

<script>
export default {
    //부모에게 받은 데이터 지정 (props)
    props: {
        todos: {
            type: Array,
            required: true
        }
    },

    emits: ['toggle-todo', 'delete-todo'],

    setup(props, { emit }) {
        const toggleTodo = (index) => {
            emit('toggle-todo', index);
        };

        const deleteTodo = (index) => {
            emit('delete-todo', index);
        };

        return {
            toggleTodo,
            deleteTodo,
        }
    }
}
</script>

<style>

</style>