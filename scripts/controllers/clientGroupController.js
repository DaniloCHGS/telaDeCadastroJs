class ClientGroupController {
   constructor(){
      this.formFinderEl = document.getElementById('finderClint');
      this.tableInfoEl = document.getElementById('tableClientInfo');
      this.infoAdm = document.getElementById('infoAdm');
      this.formChanger = document.getElementById('clientAdm');
      this.client;
      this.listClient = [];
      this.finderClient();
      this.changerClient();
      this.btnDelet;
   }
   finderClient(){
      this.formFinderEl.addEventListener('submit', event => {
         event.preventDefault();
         let finder = this.formFinderEl.querySelector('[id=finderNameClient]').value;
         this.listClient.forEach(clientObj => {
            if(clientObj.name == finder) {
               console.log(`Client finder: ${clientObj.name}`);
               this.viewClientInfo(clientObj);
               this.createAdmClient();
               this.client = clientObj;
               console.log(this.client);
            }
         });
      });
   }
   changerClient(){
      let changer = {};
      this.formChanger.addEventListener('submit', event =>{
         event.preventDefault();
         [...this.formChanger.elements].forEach(element => {
            if(element.type != 'submit' || element.name != 'form-check-input') {
               if(element.value){
                  changer[element.id] = element.value;
               }
            }
         });
         this.client.name = changer.nameClientChanger;
         this.client.telephone = changer.telClientChanger;
         this.client.address = changer.addressClientChanger;
         this.client.email = changer.emailClientChanger;
         this.viewClientInfo(this.client);
      });
   }
   addClient(client){
      this.listClient.push(client);
      console.log('list: ', this.listClient);
      this.finderClient('Danilo');
   }
   deletClient(){
      if(this.btnDelet != null) {
         this.btnDelet.addEventListener('click', event => {
            this.listClient.splice(this.listClient.indexOf(this.client), 1);
            console.log(this.listClient);
         });
      }
      
   }
   viewClientInfo(data){//Este parametro é o próprio objeto Client
      let tr = document.createElement('tr');
      this.tableInfoEl.innerHTML = `
      <tr style="border-top: 3px solid rgb(39, 39, 170);">
         <td>
            <label>
               Nome
            </label>
         </td>
         <td>
            <label>
               Telefone
            </label>
         </td>
         <td>
            <label>
               Endereço
            </label>
         </td>
         <td>
            <label>
               Email
            </label>
         </td>
      </tr>
      `;
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
  createAdmClient(){
     this.infoAdm.innerHTML = `
      <label class="lead">Administração do Cliente</label>


         <div class="form-group">
            <label>Nome*</label>
            <input type="text" name="nameClientChanger" id="nameClientChanger" class="form-control">
         </div>

      <div class="form-group">
         <label>Telefone*</label>
         <input type="text" name="telClientChanger" id="telClientChanger" class="form-control">
      </div>

      <div class="form-group">
         <label>Endereço</label>
         <input type="text" name="addressClientChanger" id="addressClientChanger" class="form-control">
      </div>

      <div class="form-group">
         <label>Email*</label>
         <input type="email" name="emailClientChanger" id="emailClientChanger" class="form-control">
      </div>

      <textarea class="form-control" rows="4" placeholder="Breve descrição" id="descriptionClient"></textarea> <br>
      <input type="submit" name="finderClientBtnChanger" id="finderClintBtnChanger" value="Alterar" class="btn btn-success btn-block">

      <br>

      <div>
         <input class="btn btn-warning" type="submit" id="deletClient" value="Excluir">
      </div>
      `;
      this.btnDelet = this.formChanger.querySelector('[id=deletClient]');
      this.deletClient();
  }
}