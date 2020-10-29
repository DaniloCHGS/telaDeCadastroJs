class Client {
    constructor(name, telephone, address, email, description){
        this.name = name;
        this.telephone = telephone;
        this.address = address;
        this.email = email;
        this.description = description;
        this.client = JSON.stringify(this);
    }

    get getName(){
        return this.name;
    }
    set setName(value){
        this.name = value;
    }
    get getTelephone(){
        return this.telephone;
    }
    set setTelephone(value){
        this.telephone = value;
    }
    get getAddress(){
        return this.address;
    }
    set setAddress(value){
        this.address = value;
    }
    get getEmail(){
        return this.email;
    }
    set setEmail(value){
        this.email = value;
    }
    get getDescription(){
        return this.description;
    }
    set setDescription(value){
        this.description = value;
    }
    clientJSON(){
        return this.client;
    }
}