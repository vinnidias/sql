var readline = require('readline-sync')
var carroRepositorio= require('./carro-repository')
const cTable = require('console.table');
var db = require('./db')

db.getDb().then(async database => {
    var choice = "";
    var repositorio = carroRepositorio(database);
    do{
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para inserir")
        console.log("Insira B para mostrar")
        console.log("Insira C para deletar")
        console.log("Insira D para mostrar o carro mais caro")
        console.log("Insira E para mostrar o carro mais barato")
        console.log("Insira F para ordenar os carros por preco")
        console.log("Insira G para contar os seus carros")
        console.log("Insira H para pesquisar os carros pela cor")
        console.log("Insira I para pesquisar os carros pelo ano")
        console.log("Insira J para pesquisar os carros acima do ano desejado")
        console.log("Insira K para pesquisar os carros abaixo do ano desejado")
        console.log("Insira S para sair do programa")
        choice = await readline.question("Escolha : ")
        if(choice.toUpperCase() === "A") {
            console.clear()
            console.log('--------------------------CADASTRO CARRO--------------------------')
            var carro = {
                nome : readline.question("Insira nome do carro : "),
                cor : readline.question("Insira a cor do carro  : "),
                ano : readline.questionInt("Insira o ano do carro : "),
                valor : readline.questionInt("digite o valor do carro : ")
            }
            await repositorio.insereCarro(carro).then(p => {
                console.clear()
                console.log("Carro inserido com sucesso")
            }).catch(p => {
                console.log("Não foi possível inserir o carro")
            })

        } else if(choice.toUpperCase() === "B"){
            console.clear()
            await repositorio.mostraCarro().then(p => {
                console.table(p)
            })
        } else if(choice.toUpperCase() === "C"){
            console.clear()

            var deleteCarro = readline.question("insira o nome do carro q vc quer remover: ")

            await repositorio.deletaCarro(deleteCarro).then(p => {
                
                console.table(p)
            })
        
        }else if(choice.toUpperCase() === "D"){
            console.clear()
            await repositorio.mostraMaiorValorCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "E"){
            console.clear()
            await repositorio.mostraMenorValorCarro().then(p => {
                console.table(p)
            })
        
        }else if(choice.toUpperCase() === "F"){
            console.clear()
            await repositorio.ordenarPorPrecoCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "G"){
            console.clear()
            await repositorio.contaCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "H"){
            console.clear()

            var corCarro = readline.question("insira a cor do carro q vc quer pesquisar: ")

            await repositorio.mostraPorCorCarro(corCarro).then(p => {
                
                console.table(p)
            })
        }else if(choice.toUpperCase() === "I"){
            console.clear()

            var ano = readline.question("insira o ano do carro q vc quer pesquisar: ")

            await repositorio.mostraPorAnoCarro(ano).then(p => {
                
                console.table(p)
            })
        }else if(choice.toUpperCase() === "J"){
            console.clear()

            var ano = readline.question("insira o ano do carro q vc quer pesquisar: ")

            await repositorio.mostraPorMaiorAnoCarro(ano).then(p => {
                
                console.table(p)
            })
        }else if(choice.toUpperCase() === "K"){
            console.clear()

            var ano = readline.question("insira o ano do carro q vc quer pesquisar: ")

            await repositorio.mostraPorMenorAnoCarro(ano).then(p => {
                
                console.table(p)
            })
        }else if(choice.toUpperCase() !== "S") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }
        


    } while(choice.toUpperCase() !== "S")
});