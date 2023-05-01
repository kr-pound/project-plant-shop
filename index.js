// Load environment variables from .env file
require('dotenv').config();

// Express Module
const express = require('express');
const app = express();

// Other Important Modules
const config = require('config');
const debug = require('debug')('app:startup');
const cors = require('cors');

// Router
const staffs = require('./routes/staff');
const machines = require('./routes/machine');
const slots = require('./routes/slot')
const plant_types = require('./routes/plant_type');
const plants = require('./routes/plant');

// 3rd-party Middleware
const morgan = require('morgan');

/* ==================================== */

// Using JSON & additional middleware
app.use(express.json());
app.use('/public', express.static('public'));

// CORS
app.use(cors());

debug(`=== ${config.get('name')} ===`)

// Using `3rd-party Middleware`
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));

    // Debugging
    debug('Morgan enabled...');
}

// Using Router
app.use('/api/staffs', staffs);
app.use('/api/machines', machines);
app.use('/api/slots', slots);
app.use('/api/plant_types', plant_types);
app.use('/api/plants', plants);

// PORT
// 'process.env.PORT' can be set using `set PORT=5000` in the cmd
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
