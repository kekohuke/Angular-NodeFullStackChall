
import createError from 'http-errors'
import express from 'express';
import router from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

var app = express();
app.use(bodyParser.json())
app.use(cors())
app.route('/').get((req,res) => res.send({success: true}));
app.route('/api/cats').get((req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }],
  })
})
//check-email
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
