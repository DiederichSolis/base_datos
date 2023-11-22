import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";


@Entity({name: 'roles'})
export class Rol{

    @PrimaryColumn()
    id: string;

    @Column({ unique: true})
    name:string;
    
    @Column()
    image:string;

    
    @Column()
    route:string;

    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date;

    @ManyToMany(() => User, (user) => user.roles) //entidad a relacionar
    users: User[];
}