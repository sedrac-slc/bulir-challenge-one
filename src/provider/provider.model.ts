import { Job } from 'src/job/job.model';
import { User } from 'src/user/user.model';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TB_PROVIDER' })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Job, (job) => job.provider)
  jobs: Job[];

  constructor(user: User) {
    this.user = user;
  }
}
