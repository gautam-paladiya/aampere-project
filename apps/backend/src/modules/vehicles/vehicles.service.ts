import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from './dto/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = this.vehiclesRepository.create(
      plainToInstance(Vehicle, createVehicleDto),
    );
    const createdVehicle = await this.vehiclesRepository.save(vehicle);
    return { data: createdVehicle };
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, search } = paginationDto;
    const skip = (page - 1) * limit;

    // Building the query
    const query = this.vehiclesRepository
      .createQueryBuilder('vehicles')
      .where({ isActive: true })
      .skip(skip)
      .take(limit)
      .orderBy('created_on', 'DESC');

    // Apply search filter (convert both DB field & input to lowercase)
    if (search) {
      query.andWhere(
        `(LOWER(vehicle.brand) LIKE LOWER(:search) OR 
          LOWER(vehicle.model) LIKE LOWER(:search) OR 
          LOWER(vehicle.color) LIKE LOWER(:search) OR 
          LOWER(vehicle.condition) LIKE LOWER(:search) OR 
          LOWER(vehicle.accidents_description) LIKE LOWER(:search) OR 
          LOWER(vehicle.location) LIKE LOWER(:search))`,
        { search: `%${search}%` },
      );
    }

    // Execute the query
    const [vehicles, total] = await query.getManyAndCount();

    return {
      data: plainToInstance(CreateVehicleDto, vehicles),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!isUUID(id)) {
      throw new NotFoundException('Invalid vehicle id format');
    }
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id, isActive: true },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return { data: plainToInstance(CreateVehicleDto, vehicle) };
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const updateResult = await this.vehiclesRepository.update(
      { id, isActive: true },
      updateVehicleDto,
    );
    if (updateResult.affected == 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found for update`);
    }
    const vehicle = await this.findOne(id);
    return vehicle;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vehiclesRepository.update(
      { id, isActive: true },
      { isActive: false },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
