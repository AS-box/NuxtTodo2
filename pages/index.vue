<template>
    <div class="p-2 text-center">
        <h1>タスク一覧</h1>
        <form @submit.prevent="addTask" class="flex">
            <input class="input-text-primary w-4/5 mr-0.5" type="text" v-model="task.title"/>
            <button type="submit" class="btn-primary w-1/5">追加</button>
        </form>
        <select name="sort" id="sort" @change="tasksSort()" v-model="sort">
            <option value="4">全て</option>
            <option value="0">未着手</option>
            <option value="1">作業中</option>
            <option value="2">完了</option>
            <option value="3">放置</option>
        </select>
        <table>
            <thead><tr><th>id</th><th>タスク</th><th>ステータス</th></tr></thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td><input type="text" :value="task.title" @change="changeTitle(task.id, task.title)"></td>
                    <td class="bg-blue-500"> 
                        <select name="status" id="status" v-model="task.status" @change="changeComplete(task.id, task.status)">
                            <option value="0">未着手</option>
                            <option value="1">作業中</option>
                            <option value="2">完了</option>
                            <option value="3">放置</option>
                        </select>
                    </td>
                    <!-- <td v-if="task.completed ">完了</td><td v-else>作業中</td> -->
                    <td><button type="button" @click="() => deleteTask(task.id)"><Icon name="tabler:trash-x" size="2em" /></button></td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script setup lang="ts">
import '@/assets/css/output/tailwind.css'
//タスク一覧を取得
const { data:tasks , refresh} =  useFetch('/api/task');
//タスク追加
interface Task {
    title: string;
    status: string;
}

const task = ref<Task>({
    title:'',
    status:'0'
});
const sort = ref<string>('4');
const status = ref<string>('0');
const addTask = () => {
    $fetch('/api/tasks', {
        method: 'post',
        body: {
            title:task.value.title,
            status:task.value.status
        }
    }).then(() => {
        task.value = {title:'', status:'0'};
        refresh();
    });
    
}
const deleteTask = (id: number) => {
    $fetch(`/api/tasks`, {
        method: 'delete',
        body: {id: id}
    }).then(() => {
        refresh();
    });
}
const changeComplete = (id:number,status:string) => {
    $fetch(`/api/tasks`, {
        method: 'put',
        body: {
            id:id,
            status:status
        }
    }).then(() => {
        refresh();
    });
}
const changeTitle = (id:number,title:string) => {
    $fetch(`/api/tasks`, {
        method: 'put',
        body: {
            id:id,
            title:title
        }
    }).then(() => {
        refresh();
    });
}
const tasksSort = () => {
    $fetch(`/api/tasks.sort`, {
        method: 'post',
        body: {
            sort:sort.value
        }
    }).then((res) => {
        tasks.value = res;
    });
}
</script>