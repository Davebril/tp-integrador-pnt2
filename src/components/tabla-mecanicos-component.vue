<template lang="html">

  <section class="tabla-mecanicos-component">
    <div class="jumbotron">
      <div v-if="mecanicos.length" class="table-responsive">        
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
          <tr v-for="(mecanico,index) in mecanicos" :key="index">
            <td>{{ mecanico.nombre | pasarAMayuscula}}</td>
            <td>{{ mecanico.telefono }}</td>
            <td>{{ mecanico.email }}</td>
            <td>{{ mecanico.direccion }}</td>
            <td>{{ mecanico.estaDisponible? 'Si':'No' }}
              <input type="checkbox" v-model="mecanico.estaDisponible">
            </td>
            <td>
              <button class="btn btn-warning mr-2" @click="putMecanico(mecanico)">UPDATE</button>
              <button class="btn btn-danger mr-2" @click="deleteMecanico(mecanico.id)">DELETE</button>
            </td>
          </tr>
        </table>
      </div>
      <h3 v-else class="alert alert-info">No hay Mecanicos ingresados</h3>
      <button class="btn btn-success my-3 mr-2 text-right" @click="goToComponent('/mecanicosFormulario')">Nuevo Mecanico</button>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'tabla-mecanicos-component',
    props: [],
    mounted () {
      this.getMecanicosAxios()
    },
    data () {
      return {
        url: 'https://63680e7cedc85dbc84e13567.mockapi.io/Mecanicos',
        mecanicos : []
      }
    },
    methods: {
      async getMecanicosAxios() {
        try {        
          let { data : mecanicos } = await this.axios(this.url)
          this.mecanicos = mecanicos
        }
        catch(error) { console.error(error) } 

      },
      async deleteMecanico(id) {

        try {
          let { data : mecanico } = await this.axios.delete(this.url + id)
          let index = this.mecanicos.findIndex(user => user.id == mecanico.id)
          this.mecanicos.splice(index, 1)
        }
        catch(error) {
          console.error('Error en deleteMecanico', error.message)
        } 
      },
      async putMecanico(mecanico) {
        try {
          await this.axios.put(this.url, mecanico, { 'content-type' : 'application/json' }) 
          alert("Se actualizo el Taller Mecanico con Exito!")     
        }
        catch(error) {
          console.error('Error en putMecanico', error.message)
        }        
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .tabla-mecanicos-component {

  }
</style>
