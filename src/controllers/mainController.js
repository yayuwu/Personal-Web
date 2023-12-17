const path = require("path");

const index = (req, res) => {
    res.render(path.resolve(__dirname, "../views/index"));
};

module.exports = {
    index,
};