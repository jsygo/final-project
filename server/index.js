require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
// const ClientError = require('./client-error');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/save-project', (req, res, next) => {
  // remove this when logins work, this is just for testing
  const currentTestUserId = 1;
  const { projectName, html, css, javascript } = req.body;
  const sql = `
    insert into "projects" ("name", "html", "css", "javascript", "creatorId")
                    values ($1, $2, $3, $4, $5)
                 returning *
  `;
  const params = [projectName, html, css, javascript, currentTestUserId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
