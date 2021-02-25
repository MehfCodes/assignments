const multer = require("multer");
const Package = require("../models/mealPackageModel");
const fs = require("fs");
const { multipleMongooseToObj } = require("./../util/toObject");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `package-${Date.now()}.${ext}`);
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileType.test(path.extname(file.orginalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  else cb("Error: you can only upload images");
}

let upload = multer({ storage }).single("package-img");

async function createPackage(req, res) {
  if (req.file) {
    req.body.imgSrc = req.file.filename;
  }
  const package = await Package.create(req.body);
  res.redirect("/admin/all-packages");
}

async function getEditPackage(req, res) {
  const package = await Package.findById(req.params.id);
  if (package) {
    res.render("edite-package", package);
  } else {
    res.send("<h1>Not Found</h1>");
  }
}

async function editPackage(req, res) {
  if (req.file) {
    req.body.imgSrc = req.file.filename;
  }
  const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.redirect("/admin/all-packages");
}

async function deletePackage(req, res) {
  const package = await Package.findByIdAndDelete(req.params.id);
  fs.unlinkSync(`public/images/${package.imgSrc}`);
  res.redirect("/admin/all-packages");
}

function dataClerk(req, res) {
  res.render("dataClerk");
}

async function getAllPackages(req, res) {
  const packages = multipleMongooseToObj(await Package.find({}));

  res.render("allPackages", { packages });
}

module.exports = {
  createPackage,
  dataClerk,
  getAllPackages,
  editPackage,
  getEditPackage,
  deletePackage,
  upload,
};
