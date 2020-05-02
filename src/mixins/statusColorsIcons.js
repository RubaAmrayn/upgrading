export default {
  methods: {
    statusColors(status_id) {
      if (status_id == 1) {
        return "blue darken-3";
      } else if (status_id == 2) {
        return "blue-grey darken-4";
      } else if (status_id == 7) {
        return "error darken-3";
      }
    },
    statusIcons(status_id) {
      if (status_id == 1) {
        return "alert-decagram";
      } else if (status_id == 2) {
        return "pause-circle-outline";
      } else if (status_id == 7) {
        return "briefcase-remove-outline";
      }
    }
  }
};
