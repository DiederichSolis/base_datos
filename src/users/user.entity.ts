import { hash } from "bcrypt";
import { Rol } from "src/roles/role.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'users'})
export class User {
 
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({unique: true}) //se coloca esto ya que son campos unicos
    email: string;

    @Column({unique: true}) //los mismo para email
    phone: string;

    @Column({nullable: true})
    imagen: string;

    @Column()
    password: string;
    

    @Column({nullable: true})
    notification_token: string;


    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime',default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date;


    @JoinTable(
       {name: 'user_has_roles',
       joinColumn: {
        name: 'id_user'
       },
       inverseJoinColumn: {
        name: 'id_rol'
       }
    } 
    ) //indica la tabla principal de la relacion 
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];


    @BeforeInsert() //es para encriptar la contraseña y poder mandarla a la base de datos ya encriptada
    async hashPassword(){
        this.password = await hash(this.password,Number(process.env.HASH_SALT));
    }

}