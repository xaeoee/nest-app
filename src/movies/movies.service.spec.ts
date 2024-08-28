import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { after } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it("should return an array of movies", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  })

  describe('getOne', () => {
    it("should return a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['Test'],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual("Test Movie");
      expect(movie.genres).toEqual(['Test']);
    })

    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID: 999 not found.")
      }
    })
  });

  describe('deleteOne', () => {
    it("should delete a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['Test'],
        year: 2000
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
      });

    it("should throw 404 error", () => {
      try{
        service.deleteOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres: ['Test'],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('patch', () => {
    it("should update a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['Test'],
        year: 2000
      });
      const movie = service.getOne(1);
      const beforeUpdate = service.getAll().length;
      expect(movie).toBeDefined;
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual("Test Movie");
      expect(movie.genres).toEqual(['Test']);
      expect(movie.year).toEqual(2000);

      service.patch(1, {
        title:"Update Test",
        genres: ['Update'],
        year: 2024
      });
      const updateMovie = service.getOne(1);
      const afterUpdate = service.getAll().length;

      expect(updateMovie).toBeDefined;
      expect(beforeUpdate).toEqual(afterUpdate);
      expect(updateMovie.id).toEqual(1);
      expect(updateMovie.title).toEqual("Update Test");
      expect(updateMovie.genres).toEqual(['Update']);
      expect(updateMovie.year).toEqual(2024);
    });
    it("should throw 404 error", () => {
      try{
      service.patch(999, {title: "404"});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException); 
      }
    });
  });
});




