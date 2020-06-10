export interface Asset {
  name: string;
  templateId: number;
  displayName: string;
  status: number;
  isMapped: boolean;
  activityScope?: number;
  isIntegrationEnabled?: boolean;
}
