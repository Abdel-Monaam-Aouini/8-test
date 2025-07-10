import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  Unique,
} from 'typeorm';

@Entity('itunes_search_results')
@Unique(['trackId', 'artistId', 'collectionId'])
export class ItunesSearchResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  wrapperType: string;

  @Column({ nullable: true })
  @Index()
  trackId: number;

  @Column({ nullable: true })
  @Index()
  artistId: number;

  @Column({ nullable: true })
  @Index()
  collectionId: number;

  @Column({ nullable: true })
  artistName: string;

  @Column({ nullable: true })
  trackName: string;

  @Column({ nullable: true })
  collectionName: string;

  @Column({ nullable: true })
  kind: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  trackPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  collectionPrice: number;

  @Column({ nullable: true })
  artworkUrl100: string;

  @Column({ nullable: true })
  previewUrl: string;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ nullable: true })
  primaryGenreName: string;

  @Column({ nullable: true })
  artistViewUrl: string;

  @Column({ nullable: true })
  collectionViewUrl: string;

  @Column({ nullable: true })
  trackViewUrl: string;

  @Column({ nullable: true })
  trackTimeMillis: number;

  @Column({ nullable: true })
  trackNumber: number;

  @Column({ nullable: true })
  discNumber: number;

  @Column({ nullable: true })
  trackCount: number;

  @Column({ nullable: true })
  discCount: number;

  @Column({ nullable: true })
  isStreamable: boolean;

  @Index()
  @Column()
  searchTerm: string;

  @CreateDateColumn()
  createdAt: Date;
}
