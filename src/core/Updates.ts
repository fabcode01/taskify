import { StringDecoder } from "string_decoder";

export default class Updates {
   id: string | number
   title: string;
   text: string;

   constructor(id:string | number, title: string, text: string) {
    this.id = id
    this.title = title;
    this.text = text;
   }


}