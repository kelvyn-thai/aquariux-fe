export class BaseService {
  apiDomainURL!: string;

  constructor() {
    this.apiDomainURL = process.env.API_DOMAIN_URL!;
  }
}
