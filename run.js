const fetch = require('node-fetch');
const Ajv = require('ajv');
const ajv = new Ajv();
const allowlist = [
  { method:'GET', url:'http://localhost:5000/api/health', expect:200 },
  { method:'GET', url:'http://localhost:5000/api/products', expect:200 },
  { method:'POST', url:'http://localhost:5000/api/login', expect:200, body:{email:"test@example.com",password:"hunter2"} }
];

(async ()=>{
  for (const t of allowlist) {
    const opts = { method:t.method, headers:{'Content-Type':'application/json'} };
    if (t.body) opts.body = JSON.stringify(t.body);
    const res = await fetch(t.url, opts);
    const ok = res.status === t.expect;
    console.log(`${t.method} ${t.url} → ${res.status} ${ok?'OK':'MISMATCH'}`);
    if (!ok) console.log('  Expected', t.expect);
  }
})();
