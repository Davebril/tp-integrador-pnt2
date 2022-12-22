<template lang="html">

  <section class="formulario-usuarios-component">
    <div class="jumbotron">
      <h2>Crear nuevo Usuario</h2>
      <hr>

      <vue-form :state="formstate" @submit.prevent="enviar()">
        
        <!-- Campo nombre -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" 
            v-model="formData.nombre" 
            :minlength="nombreMinLength"
            :maxlength="nombreMaxLength" 
            required name="nombre" 
            autocomplete="off" 
            @keydown.space.prevent
            class="form-control" />
    
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
          </field-messages>
        </validate>
        <br>

        <!-- Campo telefono -->
        <validate tag="div">
          <label for="telefono">Telefono</label>
          <input type="number" id="telefono" v-model="formData.telefono" required name="telefono" autocomplete="off" class="form-control"
            :minlength="telefonoLength"
            :maxlength="telefonoLength"  
            @keydown.space.prevent 
          />
    
          <field-messages name="telefono" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo debe poseer al menos {{telefonoLength}} caracteres.
            </div>
            <div slot="maxlength" class="alert alert-danger mt-1">
              Este campo debe poseer como maximo {{telefonoLength}} caracteres.
            </div>
          </field-messages>
        </validate>
        <br>
        
        <!-- Campo email -->
        <validate tag="div">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="formData.email" required name="email" autocomplete="off" class="form-control" />
    
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
          </field-messages>
        </validate>

        <br>

        <button class="btn btn-success my-3" :disabled="formstate.$invalid" type="submit">Crear</button>
        <br>
        <button class="btn btn-danger my-3" @click="goToComponent('/usuarios')">Volver</button>
      </vue-form>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'formulario-usuarios-component',
    props: [],
    mounted () {
      
    },
    data () {
      return {
        url: 'https://63680e7cedc85dbc84e13567.mockapi.io/Users',
        usuarios: [],
        formstate : {},
        formData : this.getInitialData(),
        nombreMinLength: 3,
        nombreMaxLength: 15,
        telefonoLength: 8
      }
    },
    methods: {
      getInitialData() {
        return {
          nombre : null,
          telefono: null,
          email: null,
        }
      },
      enviar() {
        let usuario = {...this.formData}

        this.postUsuario(usuario)
        this.formData = this.getInitialData()
        this.formstate._reset()
      },
      async postUsuario(usuarioNew) {
        try {
          await this.axios.post(this.url, usuarioNew, { 'content-type' : 'application/json' })
          this.goToComponent('/usuarios')
        }
        catch(error) {
          console.error('Error en postUsuario', error.message)
        }

      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .jumbotron {
    background-color: lightgrey;
  }

  hr {
    background-color: #eee;
  }

  pre {
    color: white;
  }
</style>
