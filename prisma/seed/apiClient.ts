import { api } from './api'

export async function fetchMakesXML(): Promise<string> {
  const response = await api.get('/getallmakes', {
    params: {
      format: 'xml',
    },
    responseType: 'text',
  })

  return response.data
}

export async function fetchVehicleTypesXML(makeId: number): Promise<string> {
  const response = await api.get(`/GetVehicleTypesForMakeId/${makeId}`, {
    params: {
      format: 'xml',
    },
    responseType: 'text',
  })

  return response.data
}
