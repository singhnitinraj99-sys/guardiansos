export type WorkflowStatus =
  | "idle"
  | "loading"
  | "success"
  | "failed";

export interface WorkflowState {
  location: WorkflowStatus;
  call: WorkflowStatus;
  sms: WorkflowStatus;
  log: WorkflowStatus;
}