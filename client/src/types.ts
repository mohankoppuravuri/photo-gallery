export interface PhotoJSONType {
  type:
    | "bank-draft"
    | "bill-of-lading"
    | "invoice"
    | "bank-draft-2"
    | "bill-of-lading-2";
  title: string;
  position: number;
  src: string;
}

export interface SavedStateType {
  isLoading: boolean;
  lastSavedTimeStamp: string
}