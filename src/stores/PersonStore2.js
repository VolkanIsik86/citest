import {makeAutoObservable, makeObservable, observable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev environment

export default class PersonStore2 {

    persons = [{name:"Loading persons",email:""}];
    constructor(props) {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchPersons();
    }
    fetchPersons (){
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:8080/persons", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.persons = result
            })
            .catch(error => console.log('error', error));
    }
}