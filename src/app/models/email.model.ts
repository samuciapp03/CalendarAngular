export interface Email {
    id: number;
    subject: string;
    body: string;
    sent: boolean;
    emailTo: string;
  }