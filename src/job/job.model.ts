import { Provider } from 'src/provider/provider.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TB_JOB' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Provider, (provider) => provider.jobs)
  provider: Provider;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'decimal', unsigned: true })
  price: number;

  constructor(
    provider: Provider,
    title: string,
    description: string,
    price: number,
  ) {
    this.provider = provider;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
