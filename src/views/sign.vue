<template>
  <div>
    <v-row justify="center" align="center" style="height:100vh">
      <v-col cols="4">
        <v-card
          loader-height="10"
          :loading="connectionState"
          :disabled="connectionState"
        >
          <v-stepper v-model="steps" alt-labels non-linear>
            <v-stepper-header>
              <v-stepper-step complete step="1" :editable="steps == 1"
                >البيانات الشخصية</v-stepper-step
              >
              <v-stepper-step
                :complete="steps == 2"
                step="2"
                :editable="steps === 2"
                >بيانات الدخول</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-5" color=" lighten-1" height="320px">
                  <v-card-title>
                    <span>انشئ حسابك</span>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-form ref="LoginForm" lazy-validation>
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        label="اسمك الكامل"
                        outlined
                        hint="يرجى كتابة الاسم الثلاثي"
                        required
                      ></v-text-field>
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            prepend-inner-icon="mdi-calendar-month"
                            v-model="date"
                            label="تاريخ ميلادك"
                            outlined
                            hint="يوم - شهر - سنة"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>

                      <v-select
                        prepend-inner-icon="mdi-gender-female"
                        v-model="select"
                        :items="items"
                        label="الجنس"
                        outlined
                        required
                      ></v-select>
                    </v-form>
                  </v-card-text>
                </v-card>
                <v-btn color="primary" @click="steps = 2">Continue</v-btn>
              </v-stepper-content>

              <v-divider></v-divider>

              <v-stepper-content step="2">
                <v-card class="mb-5" color=" lighten-1" height="400px">
                  <v-card-title>
                    <span>انشئ حسابك</span>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-form ref="LoginForm" lazy-validation>
                      <v-text-field
                        prepend-inner-icon="mdi-account"
                        :label="UsernameLabel"
                        outlined
                        :hint="UsernameHint"
                        required
                        :rules="[v => !!v || UsernameError]"
                      ></v-text-field>

                      <v-text-field
                        prepend-inner-icon="mdi-lock"
                        label="كلمة المرور"
                        outlined
                        type="password"
                        hint="لا تقل عن ستة حروف وارقام"
                        required
                      ></v-text-field>
                      <v-text-field
                        class="bt:1px"
                        prepend-inner-icon="mdi-at"
                        label="الايميل"
                        outlined
                        type="email"
                        hint="yy@gmail.com"
                        required
                      ></v-text-field>
                      <v-text-field
                        prepend-inner-icon="mdi-phone"
                        label="رقم جوالك"
                        outlined
                        type="text"
                        hint="050XXXXXXX"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-btn color="primary" @click="register">register</v-btn>

                <v-btn text @click="steps = 1">Back</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Sign",
  data() {
    return {
      connectionState: false,
      steps: 1,
      editable: false,
      menu: false,
      select: null,
      items: ["ذكر", "انثى"]
    };
  },
  computed: {},
  methods: {
    onInput(val) {
      this.steps = parseInt(val);
    },

    register() {}
  }
};
</script>
