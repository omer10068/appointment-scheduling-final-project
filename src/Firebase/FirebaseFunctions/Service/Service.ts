import * as yup from 'yup';

// Define the Yup schema for Service validation
export const serviceSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required("Service name is required"),
  durationTime: yup.number().min(30).required("Duration time is required"),
  workers: yup.array().of(yup.string()).required("Workers list is required")
});

// Service class
export class Service {
  id?: string;
  name: string;
  durationTime: number;
  workers: string[];

  constructor(
    name: string,
    durationTime: number,
    workers: string[],
    id?: string
  ) {
    this.name = name;
    this.durationTime = durationTime;
    this.workers = workers;
    this.id = id;
  }
}
