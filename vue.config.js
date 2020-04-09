let url = "http://localhost:3000";
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: url,
        ws: true,
        changeOrigin: true
      },
      "/public": {
        target: url,
        ws: true,
        changeOrigin: true
      }
    }
  }
};
