const State = require("../models/state");
const District = require("../models/district");
const Child = require("../models/child");

module.exports = {
  // State
  async createState(req, res) {
    const stateCheck = await State.findOne({ state: req.body.state });
    if (stateCheck) {
      return res.status(403).json({ message: "State Already Created" });
    } else {
      if (!req.body.state) {
        return res
          .status(404)
          .json({ message: "State field not allowed empty" });
      }
      State({
        userId: req.user._id,
        state: req.body.state,
      })
        .save()
        .then((data) => {
          res.status(201).json({ message: "State Created Successfully", data });
        })
        .catch((err) => {
          return res.status(403).json({ message: "State not created", err });
        });
    }
  },
  // District
  async createDistrict(req, res) {
    const districtCheck = await District.findOne({ district: req.body.district });
    if (districtCheck) {
      return res.status(403).json({ message: "District Already Created" });
    } else {
      if (!req.body.district) {
        return res
          .status(404)
          .json({ message: "District field not allowed empty" });
      }
      District({
        userId: req.user._id,
        district: req.body.district,
      })
        .save()
        .then((data) => {
          res.status(201).json({ message: "District Created Successfully", data });
        })
        .catch((err) => {
          return res.status(403).json({ message: "District not created", err });
        });
    }
  },

  // createChild
  createChild(req, res){
    const {name, email, phone, address} = req.body;
      if (!name || !email || !phone || !address) {
        return res
          .status(404)
          .json({ message: "Please Fill All Fields" });
      }
      Child({
        userId: req.user._id, name, email,  phone, address
      })
        .save()
        .then((data) => {
          res.status(201).json({ message: "Child info Created Successfully", data });
        })
        .catch((err) => {
          return res.status(403).json({ message: "Error Occured", err });
        });
  },

  // All State
  getState(req,res) {
    State.find({}).then(data => {
      res.status(200).json({message: 'All States', data})
    }).catch(err => {
      res.status(403).json({message: 'Error in states'})
    })
  },
  // All Districts
  getDistrict(req,res) {
    District.find({}).then(data => {
      res.status(200).json({message: 'All Districts', data})
    }).catch(err => {
      res.status(403).json({message: 'Error in states'})
    })
  },
  // All Childs
  getChild(req,res) {
    Child.find({}).then(data => {
      res.status(200).json({message: 'All childes', data})
    }).catch(err => {
      res.status(403).json({message: 'Error in states'})
    })
  },
};
