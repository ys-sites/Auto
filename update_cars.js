const fs = require('fs');

const path = 'C:/Users/Sharafath/Desktop/Website/Auto/Auto/src/data/cars.ts';
let code = fs.readFileSync(path, 'utf8');

const updates = [
  { id: '10', image: '/Bentley Continental GT.jpg' },
  { id: '11', image: '/BMW X7 M60i.jpg' },
  { id: '3', image: '/Mercedes-Benz G 63 AMG.jpg' },
  { id: '6', image: '/Tesla Model S Plaid.jpg' },
  { id: '14', image: '/Jaguar F-Type R.jpg' },
  { id: '15', image: '/Porsche Taycan Turbo.jpg' },
  { id: '16', image: '/Lexus LC 500.jpg' },
  { id: '17', image: '/Maserati MC20.jpg' },
  { id: '19', image: '/Land Rover Defender 110 X.jpg' },
  { id: '20', image: '/BMW i7 xDrive60.jpg' },
  { id: '21', image: '/Mercedes-Benz EQS 580.jpg' },
  { id: '22', image: '/Rolls-Royce Ghost.jpg' },
  { id: '24', image: '/Lucid Air Grand Touring.jpg' },
];

for (const update of updates) {
  const regex = new RegExp(`(id:\\s*'${update.id}',[\\s\\S]*?image:\\s*)'[^']*'`, 'g');
  code = code.replace(regex, `$1'${update.image}'`);
}

// Special case for Porsche 911 Carrera S -> GTS
code = code.replace(/id:\s*'1',([\s\S]*?)make:\s*'Porsche',([\s\S]*?)model:\s*'911 Carrera S',([\s\S]*?)image:\s*'[^']*',([\s\S]*?)description:\s*'The Porsche 911 Carrera S offers/g, 
`id: '1',$1make: 'Porsche',$2model: '911 Carrera GTS',$3image: '/Porsche 911 Carrera GTS.jpg',$4description: 'The Porsche 911 Carrera GTS offers`);

fs.writeFileSync(path, code);
console.log('Updated cars.ts');
