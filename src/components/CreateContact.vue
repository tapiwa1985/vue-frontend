<template>
  <div class="page-wrapper bg-dark p-t-100 p-b-50">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <FlashMessage></FlashMessage>
    <div class="wrapper wrapper--w900">
      <div class="card card-6">
        <div class="card-heading">
          <h2 class="title">New Contact</h2>
        </div>
        <div class="card-body">
          <form>
            <div class="form-row">
              <div class="name">First name</div>
              <div class="value">
                <input
                  class="input--style-6"
                  type="text"
                  required="true"
                  v-model="contact.first_name"
                  name="first_name"
                />
                <div
                  v-if="submitted && !$v.contact.first_name.required"
                  style="color: red"
                >
                  First Name is required
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="name">Surname</div>
              <div class="value">
                <input
                  class="input--style-6"
                  type="text"
                  v-model="contact.last_name"
                  name="last_name"
                />
                <div
                  v-if="submitted && !$v.contact.last_name.required"
                  style="color: red"
                >
                  Last Name is required
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="name">Email address</div>
              <div class="value">
                <div class="input-group">
                  <input
                    class="input--style-6"
                    type="email"
                    v-model="contact.email"
                    name="email"
                    placeholder="example@email.com"
                  />
                  <div
                    v-if="submitted && !$v.contact.email.required"
                    style="color: red"
                  >
                    Email is required
                  </div>
                  <div
                    v-if="submitted && !$v.contact.email.email"
                    style="color: red"
                  >
                    Email is invalid
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="name">Mobile Number</div>
              <div class="value">
                <div class="input-group">
                  <input
                    class="input--style-6"
                    type="email"
                    v-model="contact.phone_number"
                    name="phone_number"
                  />
                  <div
                    v-if="submitted && !$v.contact.phone_number.required"
                    style="color: red"
                  >
                    Mobile Number is required
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="mt-2 col-md-12">
            <vue-recaptcha
              sitekey="6LeFU3gaAAAAAAnCC7HICPXcaluNYlpXrihhFS9p"
              @verify="onVerify"
            >
            </vue-recaptcha>
          </div>
          <div style="margin-top: 15px"></div>
          <button
            class="btn btn--radius-2 btn--blue-2"
            @click="saveContact"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Loading from 'vue-loading-overlay';
import VueRecaptcha from 'vue-recaptcha';
import 'vue-loading-overlay/dist/vue-loading.css';
import ContactService from '../services/ContactService';
import { required, email } from 'vuelidate/lib/validators'

export default{
    name:"add-contact",
    data() {
        return {
            isLoading: false,
            fullPage: true,
            robot:false,
            errors: [],
            contact: {
                id:null,
                first_name:"",
                last_name:"",
                email:"",
                phone_number:""
            },
             submitted: false
        }
    },validations: {
        contact: {
        first_name: { required },
        last_name: { required },
        email: { required, email },
        phone_number: { required },
        }
    },
      components: {
            Loading,
            VueRecaptcha
    },
    methods: {
        saveContact() {
             this.submitted = true;
            if(this.robot) {
           var data = {
               first_name:this.contact.first_name,
               last_name:this.contact.last_name,
               email:this.contact.email,
               phone_number:this.contact.phone_number
           };
             this.isLoading = true;
             this.$v.$touch();
                if (this.$v.$invalid) {
                     this.isLoading = false;
                    return;
                }
           ContactService.create(data)
             .then(response => {
                 this.flashMessage.show({
                     status:'success',
                     title:'Success',
                     message:'Contact created!'
                 });
          this.contact.id = response.id;
           this.isLoading = false;
          console.log(response);
        })
        .catch(e => {
            console.log(e);
             this.isLoading = false;
        });
            }
        },
        onVerify: function(response) {
            if(response) this.robot = true;
        },
        onCancel() {
              console.log('User cancelled the loader.')
        }
    }
}
</script>
