<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-row class="border">
        <v-card width="100%" flat>
          <v-card-title class="justify-center">
            Become an AirWorker!
          </v-card-title>
        </v-card>
      </v-row>
      <v-form>
        <v-card class="my-5 mx-auto" flat width="100%">
          <v-card-title class="py-0">
            Basic Info
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="user.firstName" class="mx-2 mt-0" label="First Name*" :rules="rules().compFirstName()" />
            <v-text-field v-model="user.lastName" class="mx-2 mt-0 py-0" label="Last Name*" :rules="rules().compLastName()" />
            <v-text-field v-model="user.phone" class="mx-2 mt-0 py-0" label="Phone*" :rules="rules().compPhone()" />
          </v-card-text>

          <v-card-title class="py-0">
            Address
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="user.address" label="Address" class="py-0" />
            <v-text-field v-model="user.postalCode" label="Postal Code" class="py-0" />
            <v-text-field v-model="user.city" label="City" class="py-0" />
            <v-text-field v-model="user.state" label="State/Province" class="py-0" />
            <v-text-field v-model="user.country" label="Country" class="py-0" />
          </v-card-text>

          <v-card-title class="py-0">
            Login details
          </v-card-title>
          <v-card-text class="py-0">
            <v-text-field v-model="user.email" type="email" label="Email*" class="py-0" :rules="rules().emailValidator()" />
            <v-text-field v-model="user.confirmEmail" type="email" label="Confirm email*" class="py-0" :rules="rules().emailValidator()" />
            <v-text-field v-model="user.password" type="password" label="Password*" class="py-0" :rules="rules().passwordValidator()" />
            <v-text-field v-model="user.confirmPassword" type="password" label="Confirm password*" class="py-0" :rules="rules().passwordValidator()" />
          </v-card-text>
          <v-card-actions class="py-0">
            <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
              {{ errorHandling.compulsoryFields[1] }}
            </v-card-text>
            <v-spacer />
            <v-btn color="primary" @click="signUp">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SignUpPage',
  data () {
    return {
      user: {
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        state: '',
        phone: '',
        taxCode: ''
      },
      errorHandling: {
        compulsoryFields: [false, 'Please, fill in all compulsory fields.']
      }
    }
  },
  methods: {
    async signUp () {
      const checkEmail = this.rules().emailValidator()[0] === true && this.user.confirmEmail !== ''
      const checkPassword = this.rules().passwordValidator()[0] === true && this.user.confirmPassword !== ''
      const data = {}

      try {
        if (this.user.firstName === '' || this.user.lastName === '' || this.user.phone === '' || !checkEmail || !checkPassword) {
          this.$set(this.errorHandling.compulsoryFields, 0, true)
        } else {
          data.email = this.user.confirmEmail
          data.password = this.user.confirmPassword
          await this.$axios.post('/auth/signup', this.user)
          await this.$auth.loginWith('local', { data: { email: this.user.email, password: data.password } })
          this.$router.push('/')
        }
      } catch (error) {
        return error
      }
    },

    rules () {
      const self = this
      return {
        emailValidator () {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(self.user.email)) {
            if (self.user.email === self.user.confirmEmail || self.user.confirmEmail === '') {
              return [true]
            } else {
              return ['Emails don\'t match']
            }
          }
          return ['Wrong email']
        },
        passwordValidator () {
          if (self.user.password > 0 && self.user.password === self.user.confirmPassword) {
            return [true]
          } else {
            return ["Passwords don't match"]
          }
        },
        compFirstName () {
          if (self.user.firstName.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        compLastName () {
          if (self.user.lastName.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        compPhone () {
          if (self.user.phone.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid grey
}
</style>
