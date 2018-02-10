const express = require('express');
const orm = require('../config/orm');

const burgers = {
  getAllBurgers: async () => {
    let data = await orm.selectAll('burgers');
    return data;
  }
}