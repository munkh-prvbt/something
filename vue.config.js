module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/" + process.env.PROJECT_NAME + "/"
      : "/",
};
