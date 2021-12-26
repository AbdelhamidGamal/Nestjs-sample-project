import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });

    return this.repo.save(report);
  }

  async changeApprovalStatus(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }
}
