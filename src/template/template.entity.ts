import { Service } from 'src/service/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

@Entity()
export class Template extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    template!: string;

    @Column({ nullable: true })
    data!: string;

    @Column({ nullable: true })
    cc!: string;

    @Column({ nullable: true })
    bcc!: string;

    @Column({ nullable: true })
    attachment!: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => Service, service => service.templates, { eager: false })
    service: Service;

    @Column()
    serviceId: number;
}
