import Vue from 'vue'

new Vue ({
    el: '#app',
    data: {
        taskName: '',
        tasks: [],
        taskExists: false
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
});