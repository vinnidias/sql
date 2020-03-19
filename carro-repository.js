var db = require('./db')

module.exports = function(database) {
    return {
        criaTabela : async function(){
            return new Promise(async (resolve, reject) => {
                await database.run('CREATE TABLE IF NOT EXISTS carros(nome text, cor text, ano integer, valor integer)');
                resolve()
            })
        },
        insereCarro : async function(carro) {
            return new Promise(async (resolve, reject) => {
                await database.run(`INSERT INTO carros(nome, cor, ano, valor) VALUES(?, ?, ?, ?)`, [carro.nome, carro.cor, carro.ano, carro.valor], function(err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Carro inserido com sucesso ${this.lastID}`);
                    resolve(this.lastID)
                });
            })

        },

        deletaCarro : async function(nome) {
            return new Promise(async (resolve, reject) => {
                await database.run(`DELETE FROM carros WHERE nome=?`, [nome], function(err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Carro deletado com sucesso ${this.lastID}`);
                    resolve(this.lastID)
                });
            })

        },
        ordenarPorPrecoCarro : async function(){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT valor, nome FROM carros ORDER BY valor`, function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
      

     
       contaCarro : async function(){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT COUNT (nome)  FROM carros`, function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraPorMaiorAnoCarro : async function(ano){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT *  FROM carros WHERE ano>?`, [ano], function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraPorMenorAnoCarro : async function(ano){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT *  FROM carros WHERE ano<?`, [ano], function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraPorAnoCarro : async function(ano){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT *  FROM carros WHERE ano=?`, [ano], function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraPorCorCarro : async function(cor){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT *  FROM carros WHERE cor=?`, [cor], function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraMaiorValorCarro : async function(){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT MAX (valor), nome, cor, ano FROM carros`, function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraMenorValorCarro : async function(){
            return new Promise(async(resolve, reject)=>{
                await database.all(`SELECT MIN (valor), nome, cor, ano FROM carros`, function(err, resultado){
                    if(err){
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraCarro :  async function(){
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT * FROM carros`;
                var carros = []
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome : row.nome,
                            cor : row.cor,
                            ano : row.ano,
                            valor : row.valor 
                        
              
                        
                           
                        })
                    });
                    resolve(carros)
                });
            })
            
    
        }

        
    }

}