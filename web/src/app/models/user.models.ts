
export class Usuario {

  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role?: string,
    public uid?: string,
  ){}

}
