import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique:true, nullable:false})
  username:string;

  @Column({ unique:true, nullable:false })
  email:string;

  @Column({ nullable:false })
  password:string;

  constructor(pEmail:string, pPassword:string, pUserName?:string){
    this.email = pEmail;
    this.password = pPassword;
    this.username = pUserName;

  }

}
