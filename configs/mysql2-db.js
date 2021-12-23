const mysql2  = require('mysql2/promise');

// const db = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password:process.env.DB_PSWORD ,       
//   database:process.env.DB_DATABASE ,
//   dateStrings: "date",
//   queueLimit: 10000,
//   connectionLimit: 100,
//   multipleStatements: true,
//   enableKeepAlive: true,
// }


// const pool  = mysql2.createPool(db);
// const connection =  pool.getConnection(async conn=>conn);
// console.log("마이에스큐엘")

// module.exports = connection;

let db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PSWORD ,       
  database:process.env.DB_DATABASE ,
  dateStrings: "date",
  queueLimit: 10000,
  connectionLimit: 100,
  multipleStatements: true,
  enableKeepAlive: true,
}

let pool = mysql2.createPool(db);

module.exports = pool;

// module.exports = {
//   getPool: async function () {
//     try {
//       // 기존의 pool 에 connect 성공 시 기존 pool 을 반환
//       const connection = await pool.getConnection();
//       await connection.beginTransaction();
//       console.log('Connected to existing pool.');
//       connection.release();
//       return pool;
//     } catch (err) {
//       try {
//         // connect 에 실패 시 새로운 pool 을 만듦
//         console.log('Failed to begin transaction.', err);
//         await pool.end();
//         console.log('Destroyed existing pool');
//       } catch (err1) {
//         console.log('Failed to end existing pool', err1);
//       } finally {
//         console.log('Creating a new pool...');
//         let newPool = mysql.createPool(db);
//         // pool 을 갱신시키고 return
//         pool = newPool;
//         console.log('New pool created. Returing new pool.');
//         return pool;
//       }
//     }
//   },
// };