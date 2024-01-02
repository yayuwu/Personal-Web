const path = require("path");


const index = (req, res) => {
    res.render(path.resolve(__dirname, "../views/index"));
};

const mensaje = (req, res) => {
    res.render(path.resolve(__dirname, "../views/mensaje"));
};

module.exports = {
    index,
    mensaje,
};