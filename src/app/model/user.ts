export interface User {
  userId: string;
  username: string,
  email: string,
	phone?: string,
	weChat?: string,
  facebook?: string
  prefContact: string,
  hasAgreedContract: boolean,
  formSubmitted: number
}