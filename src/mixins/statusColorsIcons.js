export default {
  methods: {
    statusColors(status_id) {
      if (status_id == 1) {
        return "blue darken-3";
      } else if (status_id == 2) {
        return "blue-grey darken-4";
      } else if (status_id == 3) {
        return "error darken-3";
      } else if (status_id == 4) {
        return "success darken-3";
      } else if (status_id == 7) {
        return "error darken-3";
      } else if (status_id == 8) {
        return "warning darken-3";
      } else if (status_id == 9) {
        return "success darken-3";
      } else if (status_id == 10 || status_id == 11) {
        return "indigo darken-3";
      }
    },
    statusIcons(status_id) {
      if (status_id == 1) {
        return "alert-decagram";
      } else if (status_id == 2) {
        return "pause-circle-outline";
      } else if (status_id == 3) {
        return "cancel";
      } else if (status_id == 4) {
        return "check";
      } else if (status_id == 7) {
        return "briefcase-remove-outline";
      } else if (status_id == 8) {
        return "briefcase-clock-outline";
      } else if (status_id == 9) {
        return "briefcase-check";
      } else if (status_id == 10 || status_id == 11) {
        return "briefcase-plus";
      }
    }
  }
};
