import Vue from 'vue'

new Vue ({
    el: '#app',
    data: {
        taskName: '',
        tasks: []
    },

    //status - pending, done

    methods: {
        addTask: function () {
            console.log(this.taskName.length);
            //prevent addition of empty task
            if (this.taskName.length < 1){
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
        },

        //helpers - Callbacks for filtering tasks array
        checkPending: function (task) {
            return task.status === "pending";
        },

        checkDone: function (task) {
            return task.status === "finished";
        }
    },

    computed:{
        pendingTasks: function () {
            return this.tasks.filter(this.checkPending);
        },

        finishedTasks: function () {
            return this.tasks.filter(this.checkDone);
        }
    }
});