import {makeObservable, observable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev environment

export default class PersonStore {

    persons = ["Loading persons"];
    constructor(){
        makeObservable(this, {
            persons: observable,
        })
    }
    fetchPersons (){
        fetch(baseUrl + "/person").then(
            (response)=> response.json().then(
                (json)=> runInAction(()=>this.giraffes=json)
            )
        )
    }
}