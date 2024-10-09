/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api'
import { fetchMakesXML, fetchVehicleTypesXML } from './apiClient'
import { vi } from 'vitest'

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
  },
}))

describe('apiClient', () => {
  it('should fetch makes XML', async () => {
    const mockResponse = {
      data: '<makes><make><makeId>1</makeId><makeName>Honda</makeName></make></makes>',
    }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await fetchMakesXML()

    expect(api.get).toHaveBeenCalledWith('/getallmakes', {
      params: { format: 'xml' },
      responseType: 'text',
    })
    expect(result).toBe(mockResponse.data)
  })

  it('should fetch vehicle types XML for a given make ID', async () => {
    const makeId = 1
    const mockResponse = {
      data: '<vehicleTypes><vehicleType><VehicleTypeName>Civic</VehicleTypeName></vehicleType></vehicleTypes>',
    }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await fetchVehicleTypesXML(makeId)

    expect(api.get).toHaveBeenCalledWith(
      `/GetVehicleTypesForMakeId/${makeId}`,
      {
        params: { format: 'xml' },
        responseType: 'text',
      },
    )
    expect(result).toBe(mockResponse.data)
  })

  it('should handle errors when fetching makes XML', async () => {
    const errorMessage = 'Network Error'
    ;(api.get as any).mockRejectedValue(new Error(errorMessage))

    await expect(fetchMakesXML()).rejects.toThrowError(errorMessage)
  })

  it('should handle errors when fetching vehicle types XML', async () => {
    const makeId = 1
    const errorMessage = 'Network Error'
    ;(api.get as any).mockRejectedValue(new Error(errorMessage))

    await expect(fetchVehicleTypesXML(makeId)).rejects.toThrowError(
      errorMessage,
    )
  })
})
