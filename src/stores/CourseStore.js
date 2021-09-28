import {makeAutoObservable, makeObservable, observable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8080/" : ""; //Check if dev environment

export default class CourseStore {

    courses = [];

    constructor(props) {
        makeAutoObservable(this, {}, {autoBind: true});
        this.fetchCourses().then(r => console.log("fetched courses"));
    }

    async fetchCourses() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://raw.githubusercontent.com/VolkanIsik86/dummydata/main/courses.json", requestOptions)
            this.courses = await response.json();
            console.log(this.courses);
        } catch (err) {
            console.error(err);
        }
    }

}