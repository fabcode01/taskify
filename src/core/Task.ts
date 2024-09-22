export default class Task {
    #id: string | number
    #type: string
    #description: string
    #date: number | string
    #completed: boolean

    constructor(id: string | number, type: string, description: string, date: string | number, completed: boolean = false){
        this.#id = id
        this.#type = type
        this.#description = description
        this.#date = date
        this.#completed = completed
    }

    get id(){
        return this.#id
    }

    get type(){
        return this.#type
    }

    get description(){
        return this.#description
    }

    get date(){
        return this.#date
    }

    get completed(){
        return this.#completed
    }


    toObject(){
        return {
            id: this.#id,
            type: this.#type,
            description: this.#description,
            date: this.#date,
            completed: this.#completed
        }
    }


}