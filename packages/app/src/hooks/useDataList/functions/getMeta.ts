import searchDataByKey from './searchDataByKey'

export default (response: Record<string, string>) =>
  searchDataByKey('meta', response)
