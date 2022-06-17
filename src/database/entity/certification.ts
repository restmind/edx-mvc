import { Entity, Column, OneToOne, BaseEntity, PrimaryColumn } from "typeorm";
import { Course } from "./course";


@Entity({ name: 'certification' })
export class Certification extends BaseEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  receiveDate: string;

  @Column()
  result: "excelent" | "good" | "satisfying" | "could be better" | "polino";

  @OneToOne(() => Course, (course: Course) => course.certification, { onDelete: 'CASCADE' })
  course: Course ;

}