<template>
    <div id="app">
        <h3>Simple task manager</h3>
        <form v-on:submit.prevent="addTask">
            <label for="taskName">Enter  a task</label>
            <input id="taskName" v-model.trim="taskName">
        </form>
        <template v-if="taskExists">
            <div>
                <br>
                <label>Task already exists!!!</label>
            </div>
        </template>
        <label></label>
        <template v-if="pendingTasks.length">
            <h3>Pending tasks</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th colspan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="task in pendingTasks">
                    <td>{{task.name}}</td>
                    <td>
                        <button v-on:click.prevent="finishTask(task)">Done</button>
                        <button v-on:click.prevent="removeTask(task)">Remove</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </template>
        <template v-if="finishedTasks.length">
            <h3>Finished tasks</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="task in finishedTasks">
                    <td>{{task.name}}</td>
                    <td>
                        <button v-on:click.prevent="removeTask(task)">Remove</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                taskName: '',
                tasks: [],
                taskExists: false
            }
        },

        //status - pending, done

        methods: {
            addTask: function () {
                //prevent addition of empty task
                if (this.taskName.length < 1){
                    return;
                }
                //prevent addition of task that exists
                if (this.taskExists){
                    return;
                }
                this.tasks.push(
                    {
                        name: this.taskName,
                        status: 'pending'
                    }
                );
                this.taskName = '';
            },

            removeTask: function (task) {
                //splice deletes the item and re-indexes the array
                this.tasks.splice(this.tasks.indexOf(task), 1);
            },

            finishTask: function (task) {
                task.status = "finished";
                this.taskChange();
            },

            //helpers - Callbacks for filtering tasks array
            checkPending: function (task) {
                return task.status === "pending";
            },

            checkDone: function (task) {
                return task.status === "finished";
            },

            checkTaskExists: function (task) {
                return task.name === this.taskName;
            },

            taskChange: function () {
                //assume task does not exist
                this.taskExists = false;
                //check if task already exists and is pending. If it does notify user
                let pending = this.tasks.filter(this.checkPending);
                if (pending.length > 0){
                    if (pending.filter(this.checkTaskExists).length > 0){
                        this.taskExists = true;
                    }
                }
            }
        },

        computed:{
            pendingTasks: function () {
                return this.tasks.filter(this.checkPending);
            },

            finishedTasks: function () {
                return this.tasks.filter(this.checkDone);
            }
        },

        watch:{
            taskName: function () {
                this.taskChange();
            },

            tasks: function () {
                this.taskChange();
            }
        }
    }
</script>

<style>
    table {
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }
</style>