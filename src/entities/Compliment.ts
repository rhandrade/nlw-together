import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Tag } from './Tag';
import { User } from './User';

@Entity('compliments')
class Compliment {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender_id: string;

    @Column()
    user_receiver_id: string;

    @Column()
    tag_id: string;    

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;


    /* Relations */

    @JoinColumn({ name: 'user_sender_id' })
    @ManyToOne(() => User)
    userSender: User;

    @JoinColumn({ name: 'user_receiver_id' })
    @ManyToOne(() => User)
    userReceiver: User;

    @JoinColumn({ name: 'tag_id' })
    @ManyToOne(() => Tag)
    tag: Tag;


    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { Compliment }