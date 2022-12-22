import Vue from 'vue'
import VueRouter from 'vue-router'

import Usuarios from './components/tabla-usuarios-component.vue'
import Mecanicos from './components/tabla-mecanicos-component.vue'
import MecanicosForm from './components/formulario-mecanicos-component.vue'
import UsuariosForm from './components/formulario-usuarios-component.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/usuarios' },
        { path: '/usuarios', component: Usuarios },
        { path: '/mecanicos', component: Mecanicos },
        { path: '/usuariosFormulario', component: UsuariosForm },
        { path: '/mecanicosFormulario', component: MecanicosForm },
        { path: '**', redirect: '/' },
    ]
})

