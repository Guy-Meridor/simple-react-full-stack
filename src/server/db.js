const pg = require('pg')

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'Song Analyzer',
  port: 5433
})

const publicApi = {}
publicApi.query = async sqlQuery => {
  return pool.query(sqlQuery);
}

publicApi.function = (funcName, params = [], writeFunction) => {
  if (params.length) {
    argText = Array.from({ length: params.length }, (v, i) => `$${i + 1}`).join(', ');
    const query = {
      text: `select ${writeFunction ?  '' : '* from'} public.${funcName}(${argText})`,
      values: params
    }

    return pool.query(query)
  }
  else {
    const query = `select * from public.${funcName}()`;
    return publicApi.query(query);
  }
}



module.exports = publicApi;