const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auto_service",
});

// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

app.post("/register", (req, res) => {
  const key = uuid.v4();
  const sql = `
  INSERT INTO users
  (name, email, pass, session)
  VALUES (?, ?, ?, ?)
`;
  con.query(sql, [req.body.user, req.body.email, md5(req.body.pass), key], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// ////////////REQUESTS TO DB///////////////
// READ & queries FRONT&BACK
app.get('/meistrai', (req, res) => {
  let sql;
  let requests;
  if (!req.query['ser-id'] && !req.query['s']) {
    sql = `
    SELECT
    m.id, m.name, m.surname, m.position, m.photo, SUM(m.rating) AS rating, m.service_id, s.title AS autoservice, s.city
    FROM masters AS m 

    LEFT JOIN service AS s
    ON m.service_id = s.id
    GROUP BY m.id
    `;
    requests = [];
  } else if (req.query['ser-id']) {
    sql = `
    SELECT
    m.id, m.name, m.surname, m.position, m.photo, m.rating, m.service_id, SUM(m.rating) AS rating, s.title, s.city
    FROM masters AS m 

    LEFT JOIN service AS s
    ON m.service_id = s.id
    WHERE m.service_id = ?
    GROUP BY m.id
    GROUP BY m.id
  `;
    requests = [req.query['ser-id']];
  } else {
    sql = `
    SELECT
    m.id, m.name, m.surname, m.position, m.photo, SUM(m.rating) AS rating, m.service_id, s.title, s.city
    FROM masters AS m 

    LEFT JOIN service AS s
    ON m.service_id = s.id
    WHERE m.surname LIKE ?
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Simple READ
app.get('/servisai', (req, res) => {
  const sql = `
  SELECT
  s.id, s.title, s.city
  FROM service AS s
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE BACK
app.post('/meistrai', (req, res) => {
  const sql = `
  INSERT INTO masters
  (name, surname, position, photo, service_id)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.position, req.body.photo, req.body.serv], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Naujas meistras sekmingai itrauktas', type: 'success' } });
  })
});
// CREATE SERVICE BACK
app.post('/servisai', (req, res) => {
  const sql = `
  INSERT INTO service
  (title, city)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.title, req.body.city], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Naujas servisas sekmingai itrauktas', type: 'success' } });
  })
});

// EDIT BACK
app.put('/meistrai/:id', (req, res) => {
  const sql = `
  UPDATE masters 
  SET name = ?, surname = ?, position = ?, photo = ?, service_id = ? 
  WHERE id = ?
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.position, req.body.photo, req.body.serv, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Informacija apie meistra sekmingai atnaujinta', type: 'info' } });
  });
});

// DELETE BACK
app.delete('/meistrai/:id', (req, res) => {
  const sql = `
  DELETE FROM masters
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Meistras istrintas is saraso', type: 'danger' } });
  })
});

// DELETE CAT BACK
app.delete('/servisai/:id', (req, res) => {
  const sql = `
  DELETE FROM service
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Servisas istrintas is saraso', type: 'danger' } });
  })
});

// EDIT reitings FRONT
app.put('/reitingai/:id', (req, res) => {
  const sql = `
  UPDATE masters 
  SET rating = rating + 1
      where id = ?
        `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu balsas sekmingai iskaitytas. Aciu uz ivertinima!', type: 'info' } });
  });
});


app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})