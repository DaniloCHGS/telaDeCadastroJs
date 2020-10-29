class ClientController {
    constructor(){
        //Recebe o formulário e a tabela de informações
        this.formEl = document.getElementById('registerClint');
        this.tableInfoEl = document.getElementById('tableClientInfo');
        this.createClient();
        this.clientGroup = new ClientGroupController();
    }
    //Metodo onde se cria um novo cliente
    createClient(){
        //Ao formulário executar um evento do tipo submit ele executa um bloco de código
        this.formEl.addEventListener('submit', event =>{
            event.preventDefault();//Cancela a submissão do formulário para tratativas
            let btnForm = this.formEl.querySelector('[type=submit]');//Recebo o botão do formulário
            btnForm.disabled = true;//Quando ocorre o evento o botão é desativado para nã haver duplicidade
            this.validador().then(//Metodo que recebe uma Promisse, algo parecido com com um callback
                ()=>{//Caso o formulário seja validado
                    let client = this.generatorDataClient();//Gera novo cliente
                    this.viewClientInfo(client);//Cria os dados na tela(tabela)
                    this.formEl.reset();//Reseta o formulário
                    this.clientGroup.addClient(client);
                    setTimeout(() => {//Após meio segundo o botão é ativado
                        btnForm.disabled = !btnForm.disabled;
                    }, 500);
                },
                (rejectValidador)=>{//Caso o formulário seja inválido (rejectValidador é um vetor vindo da função validador())
                    rejectValidador.forEach(errorCamp =>{//Percorre-se cada indice o vetor aplicando o css a baixo
                        errorCamp.style.border = '1px solid red';
                        errorCamp.placeholder = 'Preencha este campo*';
                        setTimeout(() => {//Após um segundo e meio o css volta ao padrão e o botão é ativado
                            errorCamp.style.border = '';
                            errorCamp.placeholder = '';
                            btnForm.disabled = false;
                        }, 1500);
                    });
                }
            );
        });
    }
    /*Esta função gera os dados do client em um JSON para que haja dinamicidade na coleta dos dados
    Após a coleta é retornado um novo objeto do tipo Client com os atributos do model*/
    generatorDataClient(){
        this.clientData = {};
        /*O operador spread(...) permite 'converter' uma coleção de objetos da DOM em um vetor para que assim
        possamos percorrelos criando os atributos e valores do JSON*/
        [...this.formEl.elements].forEach(element =>{
            if(element.type != 'submit'){
                if(element.value){
                    this.clientData[element.id] = element.value;//Cria atriuto com o id do elemento e seu valor
                }
            }
        });
        return new Client(
            this.clientData.nameClient,
            this.clientData.telClient,
            this.clientData.addressClient,
            this.clientData.emailClient,
            this.clientData.descriptionClient);
    }
    validador(){
        return new Promise((resolve, reject) => {
            //Este vetor contém em seus indices os campos a serem validados
            let campValidador = [
                this.formEl.querySelector('[id=nameClient]'),
                this.formEl.querySelector('[id=telClient]'),
                this.formEl.querySelector('[id=emailClient]')
            ];
            //Neste vetor é feito um filtro com os campos que obtem valor falso, não preenchidos '!item.value'
            let isNotValid = campValidador.filter(item =>{
                if(!item.value){
                    return item;
                }
            });
            /*Caso o vetor tenha uma quantidade de indices maior que 0, quer dizer que existem campos não preenchidos
            Isto faz que o formulário não seja validado chamando o reject no código acima(24)
            Caso seu tamanho seja menor ou igual a 0 não existe campos sem serem preenchidos
            Isto chama o resolve no código acima(16)*/
            if(isNotValid.length > 0){
                reject(isNotValid);
            } else {
                resolve();
            }
        });
    }
    /*Este metodo manipula a DOM criando elementos na tablea com os valores preenchidos no formulário*/
    viewClientInfo(data){//Este parametro é o próprio objeto Client
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <label>
                    ${data.getName}
                </label>
            </td>
            <td>
                <label>
                    ${data.getTelephone}
                </label>
            </td>
            <td>
                <label>
                    ${(data.getAddress) ? data.getAddress : 'Não especificado'}
                </label>
            </td>
            <td>
                <label>
                    ${data.getEmail}
                </label>
            </td>
        `;
        this.tableInfoEl.appendChild(tr);
    }
}