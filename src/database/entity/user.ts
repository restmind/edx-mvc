import { Entity, Column, OneToMany, BaseEntity, PrimaryColumn } from "typeorm";
import { Payment } from './payment';

export type UserType = "admin" | "user";


@Entity({ name: 'user' })
export class User extends BaseEntity {

  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column(
//     {
//     type: "enum",
//     enum: ["admin", "user"],
//     default:  "user"
// }
)
  type: "admin" | "user"

  @Column()
  phoneNumber: string;

  @Column()
  location: string;

  @OneToMany(() => Payment, (payment: Payment) => payment.user, { onDelete: 'CASCADE' })
  payments: Payment[] ;

}