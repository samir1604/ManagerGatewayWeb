export interface Device {
  id? : number;
  gatewayUsn: string;
  vendor: string;
  created?: string;
  status: boolean
}
