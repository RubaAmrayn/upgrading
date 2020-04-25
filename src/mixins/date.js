let Formater = date => {
  let dt = new Date(date);
  return [
    dt.getFullYear(),
    ("0" + (dt.getMonth() + 1)).slice(-2),
    ("0" + dt.getDate()).slice(-2)
  ].join("-");
};
export const formatDate = {
  methods: {
    Formater
  }
};

export const formateDate = {
  methods: {
    formateDate(date) {
      return new Date(date).toLocaleDateString("en-sa");
    }
  }
};
