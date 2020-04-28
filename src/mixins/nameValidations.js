export default {
  data(vm) {
    let specialsRegex = /[^*|\\:.,،÷×+=-\\-_*~<>[\]{}`\\()'";@&$#%!]+$/;
    let numbersRegex = /^[^0-9]+$/;
    const ignore = v => {
      // debugger;
      let firstLetter = v.split("")[0];
      for (let i of vm.ignor) {
        if (firstLetter == i) {
          return undefined;
        }
      }
      return true;
    };
    return {
      nameSpecialRules: specialsRegex,
      nameNumberRules: numbersRegex,
      ignor: [
        "*",
        "|",
        ":",
        ".",
        "،",
        "÷",
        "×",
        "+",
        "=",
        "-",
        "-",
        "_",
        "*",
        "~",
        "<",
        ">",
        "[",
        "]",
        "{",
        "}",
        "(",
        ")",
        "'",
        ";",
        "@",
        "&",
        "$",
        "#",
        "%",
        "!"
      ],
      nameRules: [
        v => vm.nameSpecialRules.test(v) || vm.SpecialsNotAllowed,
        v => vm.nameNumberRules.test(v) || vm.NumbersNotAllowed
      ],
      specialRules: [v => vm.nameSpecialRules.test(v) || vm.SpecialsNotAllowed],
      startWithOutSpecials: [v => ignore(v) || vm.SpecialsNotAllowed]
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
