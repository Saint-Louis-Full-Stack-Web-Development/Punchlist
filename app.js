var localStore = function (key){
    this.KEY = key;
}

localStore.prototype.fetch = function (){
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
}

localStore.prototype.save = function (todos){
    localStorage.setItem(this.KEY, JSON.stringify(todos));
}

var store = new localStore('punchlist');


new Vue({
    el: 'body',
    data:{
        punchlist: store.fetch(),
        // [
            // { description: 'Build list', complete: false, editing: false },
            // { description: 'Test list', complete: false, editing: false },
        // ],
        newTask: '',
        editCache: ''
    },
    watch: {
        punchlist:{
            handler: function (punchlist){
                store.save(punchlist);
            },
            deep: true
        }
    },
    methods: {
        toggleComplete: function (task){
            task.complete = !task.complete;
        },
        startEditing: function (task){
            task.editing = true;
        },
        endEditing: function (task){
            task.editing = false;
            // task.description = task.description.trim();
            if(task.description === ''){
                this.punchlist.$remove(task);
            }
        },
        addTask: function (){
            if(this.newTask !== ''){
                this.punchlist.push({description: this.newTask, complete: false, editing: false});
            }
            this.newTask = '';
        }
    }
});
