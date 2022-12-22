import Vue from 'vue'

Vue.filter('pasarAMayuscula', function(value){
    return value.toUpperCase()
})

Vue.filter('largo', function(value){
    return value + " " + value.length
})