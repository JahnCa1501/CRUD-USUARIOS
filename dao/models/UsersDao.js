const { db } = require('../Conection');
const DaoObject = require('../DaoObject');

module.exports = class CategoryDao extends DaoObject{
  constructor(db = null){
    console.log('Users db: ', db);
    super(db);
  }
  setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, status TEXT, password TEXT, avatar TEXT);';
      this.conn.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from users;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from users where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({ name, email, status, password, avatar }) {
    const sqlstr = 'INSERT INTO users (name, email, status, password, avatar) values (?, ?, ?, ?, ?);';
    const sqlParamArr = [name, email, status, password, avatar];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({ codigo, name, email, status, password, avatar }){
    const sqlstr= 'UPDATE users set name = ?, email = ?, status = ?, password = ?, avatar = ? where id = ?;';
    const sqlParamArr = [codigo, name, email, status, password, avatar];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM users where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}