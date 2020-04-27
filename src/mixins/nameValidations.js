export default {
  data(vm) {
    let specialsRegex = /[^*|\\:.,،÷×+=-\\-_*~<>[\]{}`\\()'";@&$#%!]+$/;
    let numbersRegex = /^[^0-9]+$/;
    return {
      nameSpecialRules: specialsRegex,
      nameNumberRules: numbersRegex,
      nameRules: [
        v => vm.nameSpecialRules.test(v) || vm.SpecialsNotAllowed,
        v => vm.nameNumberRules.test(v) || vm.NumbersNotAllowed
      ],
      specialRules: [v => vm.nameSpecialRules.test(v) || vm.SpecialsNotAllowed]
    };
  },
  computed: {
    SpecialsNotAllowed() {
      return this.$vuetify.lang.t("$vuetify.Sign.specialsNotAllowed");
    },
    NumbersNotAllowed() {
      return this.$vuetify.lang.t("$vuetify.Sign.numbersNotAllowed");
    }
  }
};
