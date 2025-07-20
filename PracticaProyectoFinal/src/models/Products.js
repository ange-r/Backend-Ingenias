const { DataTypes } = require('sequelize');  // Importo para "traducir" lenguaje SQL a JS
const { seqDB } = require('../sequelize');  // Importo mi conexión de sequelice


const Products = seqDB.define('Products', {
  ProductID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  ProductName: {type: DataTypes.STRING(40), allowNull: false},
  SupplierID: {type: DataTypes.INTEGER, defaultValue: null},
  CategoryID: {type: DataTypes.INTEGER(11), defaultValue: null},
  QuantityPerUnit: {type: DataTypes.STRING(20), defaultValue: null},
  UnitPrice: {type: DataTypes.DOUBLE, defaultValue: 0},
  UnitsInStock: {type: DataTypes.SMALLINT, defaultValue: 0},
  UnitsOnOrder: {type: DataTypes.SMALLINT, defaultValue: 0},
  ReorderLevel: {type: DataTypes.SMALLINT, defaultValue: 0},
  Discontinued: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
},
{
    tableName: 'Products',
    timestamps:  false,
});

module.exports = Products