module.exports = (connection, ORM)=> {
  const menuSchema = {
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
    pagenumber: {
      type: ORM.INTEGER,
      allowNull: false,
    },
    pageposition: {
      type: ORM.INTEGER,
      allowNull: false,
    },
  };

  const Menuitem = connection.define('menuitem', menuSchema, { freezeTableName: true });
  const Archivemenuitem = connection.define('archivemenuitem', menuSchema, { freezeTableName: true });

  const Comment = connection.define('comment', {
    id: {
      type: ORM.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: ORM.TEXT,
      allowNull: false,
    },
    email: {
      type: ORM.TEXT,
      allowNull: false,
    },
    content: {
      type: ORM.TEXT,
      allowNull: false,
    },
  }, { freezeTableName: true })

  return { Menuitem, Archivemenuitem, Comment };
};
