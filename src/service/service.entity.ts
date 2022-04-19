import { Template } from 'src/template/template.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Template, template => template.service, { eager: true })
    templates: Template[];
}
