export default class Task {
    #id: string | number
    #type: string
    #description: string
    #date: number | string

    constructor(id: string | number, type: string, description: string, date: string | number){
        this.#id = id
        this.#type = type
        this.#description = description
        this.#date = date
    }

    get GET_ID(){
        return this.#id
    }

    get GET_TYPE(){
        return this.#type
    }

    get GET_DESCRIPTION(){
        return this.#description
    }

    get GET_DATE(){
        return this.#date
    }


    toObject(){
        return {
            id: this.#id,
            type: this.#type,
            description: this.#description,
            date: this.#date
        }
    }
}