const pool = require('../db');
const Joi = require('joi');
const { addToQueue } = require('../jobs/email.job');

const schema = Joi.object({
  client_name: Joi.string().required(),
  client_id: Joi.string().required(),
  amount: Joi.number().positive().required(),
  interest: Joi.number().positive().required(),
  term_months: Joi.number().integer().positive().required(),
  commercial_name: Joi.string().required()
});

exports.createCredit = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details);

    const result = await pool.query(
      `INSERT INTO credits 
       (client_name, client_id, amount, interest, term_months, commercial_name)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        req.body.client_name,
        req.body.client_id,
        req.body.amount,
        req.body.interest,
        req.body.term_months,
        req.body.commercial_name
      ]
    );

    addToQueue(result.rows[0]);

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error('ERROR REAL:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCredits = async (req, res) => {
  try {
    let query = 'SELECT * FROM credits WHERE 1=1';
    const values = [];
    let index = 1;

    if (req.query.client_name) {
      query += ` AND client_name ILIKE $${index++}`;
      values.push(`%${req.query.client_name}%`);
    }

    if (req.query.client_id) {
      query += ` AND client_id = $${index++}`;
      values.push(req.query.client_id);
    }

    if (req.query.commercial_name) {
      query += ` AND commercial_name ILIKE $${index++}`;
      values.push(`%${req.query.commercial_name}%`);
    }

    if (req.query.sort === 'amount') {
      query += ' ORDER BY amount DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    console.error('ERROR REAL GET:', err);
    res.status(500).json({ error: err.message });
  }
};
