module.exports = (connection, ORM)=> {
  const Menuitem = connection.define('menuitem', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: ORM.TEXT,
      allowNull: false,
    },
    lang: {
      type: ORM.TEXT,
      allowNull: false,
    },
    currency: {
      type: ORM.TEXT,
      allowNull: false,
    },
    pagetitle: {
      type: ORM.TEXT,
      allowNull: false,
    },
    price: {
      type: ORM.DECIMAL,
      allowNull: false,
    },
  }, { freezeTableName: true });

  return { Menuitem };
};
