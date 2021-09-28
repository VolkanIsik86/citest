import {makeObservable, observable} from "mobx";

export default class GiraffeStore {
    giraffes = ["Marius","Melman","Volkan"];
    constructor(){
        makeObservable(this, {
            giraffes: observable,
        })
    }

}