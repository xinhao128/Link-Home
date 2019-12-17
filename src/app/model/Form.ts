export interface Form {
	basicQuestions: BasicQuestions,
	serviceQuestions: ServiceQuestions
}
interface BasicQuestions {
	destFrom: string,
	destTo: string,
	initTime: InitTime
}
interface InitTime {
  workDate: Date,
  timeFrom: string,
  timeTo: string
}
interface ServiceQuestions {
	floor: number,
  elevator: boolean
}