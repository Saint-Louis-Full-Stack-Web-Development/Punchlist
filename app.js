new Vue({
    el: 'body',
    data:{
        punchlist: [
            { description: 'Build list', complete: false, editing: false },
            { description: 'Test list', complete: false, editing: false },
        ],
        newTask: ''
    },
    methods: {
        toggleComplete: function (task){
            task.complete = !task.complete;
        },
        toggleEdit: function (task){
            task.editing = !task.editing;
            task.description === '' ? this.punchlist.$remove(task) : null
        },
        addTask: function (){
            if(this.newTask !== ''){
                this.punchlist.push({description: this.newTask, complete: false, editing: false});
            }
            this.newTask = '';
        }
    }
});
