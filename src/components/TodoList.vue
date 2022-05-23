<template>
<div>
    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
        <div class="card-body p-2 d-flex align-item-center" style="cursor: pointer" @click="moveToPage(todo.id)">
            <div class="form-check flex-grow-1">
                <!-- 단방향 바인딩(one-way-down binding) <-> v-model 양방향바인딩 -->
                <!-- 
                <input class="form-check-input" type="checkbox" v-model="todo.completed">
                -->
                <input class="m-2" type="checkbox" :checked="todo.completed" @change="toggleTodo(index, $event)" @click.stop >
                <!-- style bind -->
                <!-- 
                <label class="form-check-label" :style="todo.completed ? todoStyle : {}">{{ todo.subject}}</label>
                -->
                <!-- class bind -->
                <span :class="{ todo: todo.completed }">
                    {{ todo.subject}}
                </span>
            </div> 
            <div>
                <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Delete</button>
            </div>       
        </div>
    </div> 
</div>
<Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue'
import { ref } from 'vue';

export default {
    components: {
        Modal
    },

    //부모에게 받은 데이터 지정 (props)
    props: {
        todos: {
            type: Array,
            required: true
        }
    },

    emits: ['toggle-todo', 'delete-todo'],

    setup(props, { emit }) {
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);

        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked);
        };

        const openModal = (id) => {
            todoDeleteId.value = id;
            showModal.value = true;
        };

        const closeModal = () => {
            todoDeleteId.value = null;
            showModal.value = false;
        };

        const deleteTodo = () => {            
            emit('delete-todo', todoDeleteId.value);
            closeModal();
        };

        const moveToPage = (todoId) => {
            console.log('TodoList.vue : ' + todoId);
            //router.push('/todos/' + todoId);
            router.push({
                name: 'Todo',
                params: { id: todoId }
            });
        };

        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
            showModal,
            openModal,
            closeModal,
        }
    }
}
</script>

<style>

</style>