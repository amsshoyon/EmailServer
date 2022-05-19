import { Project } from 'src/project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

@Entity()
export class Template extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    templateName!: string;

    @Column('longtext', { nullable: true })
    data!: string;

    @Column({ nullable: true })
    cc!: string;

    @Column({ nullable: true })
    bcc!: string;

    @Column('longtext', { nullable: true })
    attachment!: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Project, project => project.templates, { eager: false })
    project: Project;

    @Column()
    projectId: number;
}
