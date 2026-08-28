const Database = require('better-sqlite3');
const fs = require('fs');

const db = new Database('rych.db');

let sql = '';

// Traemos el esquema (CREATE TABLE) de todas las tablas
const tablas = db.prepare("SELECT name, sql FROM sqlite_master WHERE type='table'").all();

for (const tabla of tablas) {
    sql += tabla.sql + ';\n\n';

    const filas = db.prepare(`SELECT * FROM ${tabla.name}`).all();

    for (const fila of filas) {
        const columnas = Object.keys(fila);
        const valores = columnas.map((col) => {
            const valor = fila[col];
            if (valor === null) return 'NULL';
            if (typeof valor === 'number') return valor;
            // Escapamos comillas simples para que no rompan el SQL
            return `'${String(valor).replace(/'/g, "''")}'`;
        });
        sql += `INSERT INTO ${tabla.name} (${columnas.join(', ')}) VALUES (${valores.join(', ')});\n`;
    }
    sql += '\n';
}

fs.writeFileSync('rych_backup.sql', sql);
console.log('Exportado correctamente a rych_backup.sql');
