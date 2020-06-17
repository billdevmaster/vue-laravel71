<template>
  <section class="content-wrapper" style="min-height: 960px;">
    <section class="content-header">
      <h1>Show Customer</h1>
    </section>

    <section class="content">
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Show</h3>
          </div>

          <div class="box-body">
            <back-buttton></back-buttton>
          </div>

          <bootstrap-alert />

          <div class="box-body">
            <div class="row">
            <div class="col-xs-6">
                <table class="table table-bordered table-striped">
                    <tbody>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.first_name }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.last_name }}</td>
                    </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.email }}</td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.phone }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.customer_code }}</td>
                    </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.company_name }}</td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.mobile }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.fax }}</td>
                    </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.birthday }}</td>
                        </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.eco_ben }}</td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.address }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.city }}</td>
                    </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.name_id }}</td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.id_type }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.place_issue }}</td>
                    </tr>
                    <tr>
                        <th>Current Balance</th>
                        <td>{{ item.place_birthday }}</td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td>{{ item.national }}</td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td>{{ item.expire_date }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xs-6">
                <table class="table table-bordered table-striped">
                    <tbody>
                    <tr>
                        <th>Current Balance</th>
                        <td><img :src="getId_img()" id="id-img-tag" style="width:100%;margin-top: 10px"/></td>
                        </tr>
                    <tr>
                        <th>Currency Name</th>
                        <td><img :src="getCompany_img()" id="company-img-tag" style="width:100%;margin-top: 10px"/></td>
                    </tr>
                    <tr>
                        <th>Opening Balance</th>
                        <td><img :src="getMix_img()" id="mix-img-tag" style="width:100%;margin-top: 10px"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
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
    watch: {
        "$route.params.id": function() {
            this.fetchData(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions('CustomersSingle', ['fetchData']),
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
        }
    }
}
</script>


<style scoped>

</style>
