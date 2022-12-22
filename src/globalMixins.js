import Vue from 'vue'

const miGlobalMixin = {
    methods: {
        goToComponent(ruta){
            this.$router.push(ruta)
        },
        incrementarContadorMails() {
            this.$store.dispatch('contadorUp', 1)
        }
    },
    computed: {
        mostrarContadorMails() {
            let contador = this.$store.state.contadorMails
            return contador
        }
    }
}

Vue.mixin(miGlobalMixin)