var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world!'
    },
    methods:{
        greet: function(event){
            console.log('           aloha   ');
            this.message = 'aloha world';
        }
    }
});

// app.greet();