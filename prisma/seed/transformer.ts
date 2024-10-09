import { parseStringPromise } from 'xml2js'
interface IMake {
  makeId: number
  makeName: string
}

interface IVehicleType {
  VehicleTypeId: number
  VehicleTypeName: string
}

export async function transformMakesToJSON(xml: string): Promise<IMake[]> {
  const result = await parseStringPromise(xml)
  return result.Response.Results[0].AllVehicleMakes.map((xmlMake) => ({
    makeId: +xmlMake.Make_ID[0],
    makeName: xmlMake.Make_Name[0],
  }))
}

export async function transformVehicleTypesToJSON(
  xml: string,
): Promise<IVehicleType[]> {
  const result = await parseStringPromise(xml)
  if (!result.Response.Results[0].VehicleTypesForMakeIds) {
    return []
  }
  return result.Response.Results[0].VehicleTypesForMakeIds.map(
    (xmlVehicleType) => ({
      VehicleTypeId: +xmlVehicleType.VehicleTypeId[0],
      VehicleTypeName: xmlVehicleType.VehicleTypeName[0],
    }),
  )
}
