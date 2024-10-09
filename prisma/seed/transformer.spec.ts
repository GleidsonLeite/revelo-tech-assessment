import { transformVehicleTypesToJSON } from './transformer'

describe('transformVehicleTypesToJSON', () => {
  it('should transform valid XML to JSON', async () => {
    const xml = `
      <Response>
        <Results>
          <VehicleTypesForMakeIds>
            <VehicleTypeId>1</VehicleTypeId>
            <VehicleTypeName>Car</VehicleTypeName>
          </VehicleTypesForMakeIds>
          <VehicleTypesForMakeIds>
            <VehicleTypeId>2</VehicleTypeId>
            <VehicleTypeName>Truck</VehicleTypeName>
          </VehicleTypesForMakeIds>
        </Results>
      </Response>
    `
    const expected = [
      { VehicleTypeId: 1, VehicleTypeName: 'Car' },
      { VehicleTypeId: 2, VehicleTypeName: 'Truck' },
    ]
    const result = await transformVehicleTypesToJSON(xml)
    expect(result).toEqual(expected)
  })

  it('should return an empty array when XML does not contain vehicle types', async () => {
    const xml = `
      <Response>
        <Results>
        </Results>
      </Response>
    `
    const result = await transformVehicleTypesToJSON(xml)
    expect(result).toEqual([])
  })

  it('should throw an error for malformed XML', async () => {
    const xml = `<Response><Results>`
    await expect(transformVehicleTypesToJSON(xml)).rejects.toThrow()
  })
})
