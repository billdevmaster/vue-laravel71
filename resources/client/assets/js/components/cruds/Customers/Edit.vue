<template>
  <section class="content-wrapper" style="min-height: 960px;">
    <section class="content-header">
      <h1>Edit Customer</h1>
    </section>

    <section class="content">
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Edit</h3>
          </div>

          <div class="box-body">
            <back-buttton></back-buttton>
          </div>

          <bootstrap-alert />

          <div class="box-body">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="first_name">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="first_name"
                    placeholder="Enter First name"
                    :value="item.first_name"
                    @input="updateFirst_name"
                  />
                </div>
                <div class="form-group">
                  <label for="last_name">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="last_name"
                    placeholder="Enter Last name"
                    :value="item.last_name"
                    @input="updateLast_name"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="Enter Email"
                    :value="item.email"
                    @input="updateEmail"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    placeholder="Enter Phone"
                    :value="item.phone"
                    @input="updatePhone"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Customer Code</label>
                  <input
                    type="text"
                    class="form-control"
                    name="customer_code"
                    placeholder="Enter Customer Code"
                    :value="item.customer_code"
                    @input="updateCustomerCode"
                  />
                </div>
                <div class="form-group">
                  <label for="">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="company_name"
                    placeholder="Enter Company Name"
                    :value="item.company_name"
                    @input="updateCompanyName"
                  />
                </div>
                <div class="form-group">
                  <label for="">Mobile</label>
                  <input
                    type="text"
                    class="form-control"
                    name="mobile"
                    placeholder="Enter Mobile"
                    :value="item.mobile"
                    @input="updateMobile"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="">Fax</label>
                  <input
                    type="text"
                    class="form-control"
                    name="fax"
                    placeholder="Enter fax"
                    :value="item.fax"
                    @input="updateFax"
                  />
                </div>
                <div class="form-group">
                  <label for="">Birthday</label>
                  <v-date-picker
                    name="birthday"
                    label="Birthday"
                    @input="updateBirthday"
                    :value="item.birthday"
                    :config="{format: 'YYYY-MM-DD'}"
                    />
                </div>
                <div class="form-group">
                  <label for="">Economic Beneficiary</label>
                  <input
                    type="text"
                    class="form-control"
                    name="eco_ben"
                    placeholder="Enter Economic Beneficiary"
                    :value="item.eco_ben"
                    @input="updateEco_ben"
                  />
                </div>
                <div class="form-group">
                  <label for="">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    placeholder="Enter Address"
                    :value="item.address"
                    @input="updateAddress"
                  />
                </div>
                <div class="form-group">
                  <label for="">City</label>
                  <input
                    type="text"
                    class="form-control"
                    name="city"
                    placeholder="Enter city"
                    :value="item.city"
                    @input="updateCity"
                  />
                </div>
                <div class="form-group">
                  <label for="">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    name="country"
                    placeholder="Enter Country"
                    :value="item.country"
                    @input="updateCountry"
                  />
                </div>
                <div class="form-group">
                  <label for="">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    name="password"
                    placeholder="Enter password"
                    :value="item.password"
                    @input="updatePassword"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="">Name ID</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name_id"
                    placeholder="Enter Name ID"
                    :value="item.name_id"
                    @input="updateName_id"
                  />
                </div>
                <div class="form-group">
                  <label for="">ID Type</label>
                  <input
                    type="text"
                    class="form-control"
                    name="id_type"
                    placeholder="Enter ID Type"
                    :value="item.id_type"
                    @input="updateID_type"
                  />
                </div>
                <div class="form-group">
                  <label for="">Place Issue</label>
                  <input
                    type="text"
                    class="form-control"
                    name="place_issue"
                    placeholder="Enter Place Issue"
                    :value="item.place_issue"
                    @input="updatePlace_issue"
                  />
                </div>
                <div class="form-group">
                  <label for="">Place Birthday</label>
                  <input
                    type="text"
                    class="form-control"
                    name="place_birthday"
                    placeholder="Enter Place Birthday"
                    :value="item.place_birthday"
                    @input="updatePlace_birthday"
                  />
                </div>
                <div class="form-group">
                  <label for="">National</label>
                  <input
                    type="text"
                    class="form-control"
                    name="national"
                    placeholder="Enter National"
                    :value="item.national"
                    @input="updateNational"
                  />
                </div>
                <div class="form-group">
                  <label for="">Expire Date</label>
                  <v-date-picker
                    name="expire_date"
                    label="expire_date"
                    @change="updateExpire_date"
                    :value="item.expire_date"
                    :config="{format: 'YYYY-MM-DD'}"
                    />
                </div>
              </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                     <input name="id_img" type="file" class="form-control" v-on:change="updateId_img">
                     <img :src="getId_img()" id="id-img-tag" style="width:100%;margin-top: 10px"/>
                </div>
                <div class="col-md-4">
                     <input id="company_img" type="file" class="form-control" v-on:change="updateCompany_img">
                     <img :src="getCompany_img()" id="company-img-tag" style="width:100%;margin-top: 10px"/>
                </div>
                <div class="col-md-4">
                     <input id="mix_img" type="file" class="form-control" v-on:change="updateMix_img">
                     <img :src="getMix_img()" id="mix-img-tag" style="width:100%;margin-top: 10px"/>
                </div>
            </div>
          </div>

          <div class="box-footer">
            <vue-button-spinner
              class="btn btn-primary btn-sm"
              :isLoading="loading"
              :disabled="loading"
            >
              Save
            </vue-button-spinner>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            id_image_show: false,
            company_imgae_show: false,
            mix_image_show: false
        }
    },
    computed: {
        ...mapGetters('CustomersSingle', ['item', 'loading']),
    },
    created() {
        this.fetchData(this.$route.params.id)
       
    },
    destroyed() {
        this.resetState()
    },
    watch: {
        "$route.params.id": function() {
            this.resetState()
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('CustomersSingle', ['fetchData', 
        'updateData', 
        'resetState', 
        "setFirst_name",
        "setLast_name",
        "setEmail",
        "setPhone",
        "setCustomerCode",
        "setCompanyName",
        "setMobile",
        "setFax",
        "setBirthday",
        "setEco_ben",
        "setAddress",
        "setCity",
        "setCountry",
        "setPassword",
        "setName_id",
        "setID_type",
        "setID_number",
        "setPlace_issue",
        "setPlace_birthday",
        "setNational",
        "setExpire_date",
        "setId_img",
        "setComapny_img",
        "setMix_img"
        ]),
        getId_img() {
            let photo = (this.id_image_show.length > 100) ? this.id_image_show : "/images/users/"+ this.item.id_img;
                return photo;
        },
        getCompany_img() {
            let photo = (this.company_imgae_show.length > 100) ? this.company_imgae_show : "/images/users/"+ this.item.company_img;
                return photo;
        },
        getMix_img() {
            let photo = (this.mix_image_show.length > 100) ? this.mix_image_show : "/images/users/"+ this.item.mix_img;
                return photo;
        },
        updateId_img(e) {
            this.setId_img(e.target.files[0]);

            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.id_image_show = e.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        updateCompany_img(e) {
            this.setComapny_img(e.target.files[0]);
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.company_imgae_show = e.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        updateMix_img(e) {
            this.setMix_img(e.target.files[0]);
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.mix_image_show = e.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        updateExpire_date(value) {
            this.setExpire_date(value);
        },
        updateNational(e) {
            this.setNational(e.target.value);
        },
        updatePlace_birthday(e) {
            this.setPlace_birthday(e.target.value);
        },
        updatePlace_issue(e) {
            this.setPlace_issue(e.target.value);
        },
        updateID_number(e) {
            this.setID_number(e.target.value);
        },
        updateID_type(e) {
            this.setID_type(e.target.value);
        },
        updateFirst_name(e) {
        this.setFirst_name(e.target.value);
        },
        updateLast_name(e) {
        this.setLast_name(e.target.value);
        },
        updateEmail(e) {
        this.setEmail(e.target.value);
        },
        updatePhone(e) {
        this.setPhone(e.target.value);
        },
        updateCustomerCode(e) {
        this.setCustomerCode(e.target.value);
        },
        updateCompanyName(e) {
            this.setCompanyName(e.target.value);
        },
        updateMobile(e) {
            this.setMobile(e.target.value);
        },
        updateFax(e) {
            this.setFax(e.target.value);
        },
        updateBirthday(value) {
            this.setBirthday(value);
        },
        updateEco_ben(e) {
            this.setEco_ben(e.target.value);
        },
        updateAddress(e) {
            this.setAddress(e.target.value);
        },
        updateCity(e) {
            this.setCity(e.target.value);
        },
        updateCountry(e) {
            this.setCountry(e.target.value);
        },
        updatePassword(e) {
            this.setPassword(e.target.value);
        },
        updateName_id(e) {
            this.setName_id(e.target.value);
        },
        submitForm() {
            this.updateData()
                .then(() => {
                    this.$router.push({ name: 'customers.index' })
                    this.$eventHub.$emit('update-success')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>


<style scoped>

</style>
