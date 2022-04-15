import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Ship R',
      brand: 'Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((e) => e.id === +id);

    if (!coffee) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    const elem = this.coffees.push(createCoffeeDto);
    return elem;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => {
      return item.id === +id;
    });
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
