const express = require('express');
const orm = require('../config/orm');

const burger = {
  getAllBurgers: async () => {
    let data = await orm.selectAll('burgers');
    return data;
  },
  getAllEatenBurgers: async () => {
    let data = await orm.selectAll('burgers', 'devoured', '1');
    return data;
  },
  getAllUneatenBurgers: async () => {
    let data = await orm.selectAll('burgers', 'devoured', '0');
    return data;
  },
  addBurger: async (burgerName) => {
    let data = await orm.insertOne('burgers', 'burger_name', burgerName);
    return data;
  },
  updateBurger: async (burgerId, devoured) => {
    let data = await orm.updateOne('burgers', 'devoured', devoured, 'id', burgerId);
    return data;
  }
}

module.exports = burger;