<template lang="html">

  <section class="tabla-usuarios-component">
    <div class="jumbotron">
      <div v-if="usuarios.length" class="table-responsive">        
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
          <tr v-for="(usuario,index) in usuarios" :key="index">
            <td>{{ usuario.nombre | pasarAMayuscula | largo}}</td>
            <td>{{ usuario.telefono }}</td>
            <td>{{ usuario.email }}</td>
            <td>
              <button class="btn btn-info mr-2" @click="sendMailUsuario(usuario.id)">SEND MAIL</button>
              <button class="btn btn-danger mr-2" @click="deleteUsuario(usuario.id)">DELETE</button>
            </td>
          </tr>
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay usuarios ingresados</h3>
      <button class="btn btn-success my-3 mr-2 text-right" @click="goToComponent('/usuariosFormulario')">Nuevo Usuario</button>
    </div>
  </section>

</template>

<script>

export default  {
    name: 'formulario-usuarios-component',
    props: [],
    mounted () {
      this.getUsuariosAxios()
    },
    data () {
      return {
        url: 'https://63680e7cedc85dbc84e13567.mockapi.io/Users',
        usuarios : []
      }
    },
    methods: {
      async getUsuariosAxios() {
        try {        
          let { data : usuarios } = await this.axios(this.url)
          this.usuarios = usuarios
        }
        catch(error) { console.error(error) } 

      },
      async sendMailUsuario(id) {
        try {        
          var status = await this.axios(this.url + "/sendMail/" + id)
          if(status.data.status == 'OK'){
            this.incrementarContadorMails()
            alert("El mail fue enviado con Exito!")  
          }
          else{
            alert(status.data.status)  
          }
          
        }
        catch(error) { console.error(error) } 

      },
      async deleteUsuario(id) {

        try {
          let { data : usuario } = await this.axios.delete(this.url + id)
          let index = this.usuarios.findIndex(user => user.id == usuario.id)
          this.usuarios.splice(index, 1)
        }
        catch(error) {
          console.error('Error en deleteUsuario', error.message)
        } 
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .tabla-usuarios-component {

  }
</style>
