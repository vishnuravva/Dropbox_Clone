export type FileType = {
  id: string;
  filename: string; // Ensure that this property matches the actual property name in your data
  timestamp?: Date | undefined;
  fullName?: string | undefined;
  downloadUrl: string | undefined;
  type: string;
  size: number;
};
