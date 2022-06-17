import { Entity, Column, OneToOne, BaseEntity, JoinColumn, PrimaryColumn } from "typeorm";
import { Certification } from "./certification";


@Entity({ name: 'course' })
export class Course extends BaseEntity {

  @PrimaryColumn({unique:true})
  id: string;

  @Column()
  owner: string;

  @Column()
  price: string;

  @Column()
  isActive: boolean;

  @Column({ unique: true })
  title: string;

  @OneToOne(() => Certification, (certification: Certification) => certification.course, { onDelete: 'CASCADE' })
  @JoinColumn()
  certification: Certification ;

}