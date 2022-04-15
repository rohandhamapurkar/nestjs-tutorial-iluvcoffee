import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  async findAll() {
    return await this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    if (!coffee) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const elem = new this.coffeeModel(createCoffeeDto);
    return elem.save();
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException('Not found coffee');
    }
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }
}
